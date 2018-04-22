import {
  ObjectRenderer, TextureUvs, Sprite, utils, Shader, Quad,
  CanvasRenderer, WebGLRenderer, CanvasSpriteRenderer, Rectangle, glCore, BaseTexture
} from 'pixi.js';
import { UIScaleFactor } from 'app';

export interface MapSprite extends Sprite {
  outline: boolean;
}

const OutlineWidth = 2;
const BatchSize = 2000;
const VAOBufferSize = 0x80000;

const indices = new Uint16Array(BatchSize * 6);
for (let i = 0; i < BatchSize; i++) {
  indices[i * 6 + 0] = i * 4 + 0;
  indices[i * 6 + 1] = i * 4 + 1;
  indices[i * 6 + 2] = i * 4 + 2;
  indices[i * 6 + 3] = i * 4 + 0;
  indices[i * 6 + 4] = i * 4 + 2;
  indices[i * 6 + 5] = i * 4 + 3;
}

export class MapSpriteRenderer extends ObjectRenderer {
  public static readonly Name = 'map-sprite';

  private readonly _tint = new Float32Array(4);
  private readonly _thickness = new Float32Array(2);
  private readonly _center = new Float32Array(2);
  private readonly _clamp = new Float32Array(4);
  private readonly _bounds = new Rectangle();
  private _shader!: Shader;

  private currentTex: BaseTexture | null = null;
  private currentBlendMode: number = -1;
  private batchSize = 0;
  private batch: MapSprite[] = [];
  private vao!: glCore.VertexArrayObject;
  private vb!: glCore.GLBuffer;
  private ib!: glCore.GLBuffer;
  private vaoBuf = new ArrayBuffer(VAOBufferSize);
  private f32 = new Float32Array(this.vaoBuf);
  private u32 = new Uint32Array(this.vaoBuf);

  onContextChange() {
    const gl = this.renderer.gl;
    this._shader = new SpriteShader(gl);

    this.vb = glCore.GLBuffer.createVertexBuffer(gl, null, gl.STREAM_DRAW);
    this.ib = glCore.GLBuffer.createIndexBuffer(gl, indices, gl.STATIC_DRAW);

    const vaoSize = 10 * 4;
    this.vao = this.renderer.createVao()
      .addIndex(this.ib)
      .addAttribute(this.vb, this._shader.attributes.aVertexPosition, gl.FLOAT, false, vaoSize, 0)
      .addAttribute(this.vb, this._shader.attributes.aTextureCoord, gl.UNSIGNED_SHORT, true, vaoSize, 2 * 4)
      .addAttribute(this.vb, this._shader.attributes.aColor, gl.UNSIGNED_BYTE, true, vaoSize, 3 * 4)
      .addAttribute(this.vb, this._shader.attributes.aClamp, gl.FLOAT, true, vaoSize, 4 * 4)
      .addAttribute(this.vb, this._shader.attributes.aThickness, gl.FLOAT, true, vaoSize, 8 * 4);
  }

  render(sprite: MapSprite) {
    if (!sprite.texture.valid) return;

    if (this.batchSize >= BatchSize ||
      sprite.texture.baseTexture !== this.currentTex ||
      sprite.blendMode !== this.currentBlendMode
    )
      this.flush();

    this.batch[this.batchSize++] = sprite;
    this.currentTex = sprite.texture.baseTexture;
    this.currentBlendMode = sprite.blendMode;
  }

  start() {
    this.renderer.bindShader(this._shader);
    this.renderer.bindVao(this.vao);
    this.vb.bind();
  }

  stop() {
    this.flush();
  }

  flush() {
    if (this.batchSize === 0) return;
    const renderer = this.renderer;
    renderer.bindTexture(this.currentTex!, 0, true);

    renderer.state && renderer.state.setBlendMode(this.currentBlendMode!);

    const f32 = this.f32, u32 = this.u32;
    let p = 0;
    for (let i = 0; i < this.batchSize; i++) {
      const sprite = this.batch[i];
      const uvs = ((sprite.texture as any)._uvs as TextureUvs).uvsUint32;
      const vd = sprite.vertexData;

      const alpha = Math.min(sprite.worldAlpha, 1.0);
      const tint = (sprite.tint >> 16) + (sprite.tint & 0xff00) + ((sprite.tint & 0xff) << 16);
      const argb = alpha < 1.0 && this.currentTex!.premultipliedAlpha
        ? utils.premultiplyTint(tint, alpha) : tint + (alpha * 255 << 24);

      var frame = sprite.texture.frame;
      const clampX = frame.x / this.currentTex!.width;
      const clampY = frame.y / this.currentTex!.height;
      const clampZ = (frame.x + frame.width) / this.currentTex!.width;
      const clampW = (frame.y + frame.height) / this.currentTex!.height;
      const thicknessX = sprite.outline ? OutlineWidth / sprite.scale.x / this.currentTex!.realWidth : 0;
      const thicknessY = sprite.outline ? OutlineWidth / sprite.scale.y / this.currentTex!.realHeight : 0;

      f32[p++] = vd[0]; f32[p++] = vd[1];
      u32[p++] = uvs[0];
      u32[p++] = argb;
      f32[p++] = clampX; f32[p++] = clampY; f32[p++] = clampZ; f32[p++] = clampW;
      f32[p++] = thicknessX; f32[p++] = thicknessY;

      f32[p++] = vd[2]; f32[p++] = vd[3];
      u32[p++] = uvs[1];
      u32[p++] = argb;
      f32[p++] = clampX; f32[p++] = clampY; f32[p++] = clampZ; f32[p++] = clampW;
      f32[p++] = thicknessX; f32[p++] = thicknessY;

      f32[p++] = vd[4]; f32[p++] = vd[5];
      u32[p++] = uvs[2];
      u32[p++] = argb;
      f32[p++] = clampX; f32[p++] = clampY; f32[p++] = clampZ; f32[p++] = clampW;
      f32[p++] = thicknessX; f32[p++] = thicknessY;

      f32[p++] = vd[6]; f32[p++] = vd[7];
      u32[p++] = uvs[3];
      u32[p++] = argb;
      f32[p++] = clampX; f32[p++] = clampY; f32[p++] = clampZ; f32[p++] = clampW;
      f32[p++] = thicknessX; f32[p++] = thicknessY;
    }
    this.vb.upload(this.vaoBuf, 0, true);
    const gl = this.renderer.gl;
    gl.drawElements(gl.TRIANGLES, this.batchSize * 6, gl.UNSIGNED_SHORT, 0);

    this.batchSize = 0;
    this.currentTex = null;
    this.currentBlendMode = -1;
  }
}

class SpriteShader extends Shader {
  constructor(gl: WebGLRenderingContext) {
    super(gl, `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;
attribute vec4 aClamp;
attribute vec4 aThickness;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vClamp;
varying vec4 vThickness;

void main(void)
{
    vec4 v = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    gl_Position = v;
    vTextureCoord = aTextureCoord;
    vColor = aColor;
    vClamp = aClamp;
    vThickness = aThickness;
}`, `
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vClamp;
varying vec4 vThickness;

uniform sampler2D uSampler;

float sampleAlpha(float x, float y) {
  return texture2D(uSampler, clamp(vTextureCoord + vec2(x, y), vClamp.xy, vClamp.zw)).a;
}

void main(void)
{
    vec4 sample = texture2D(uSampler, vTextureCoord);
    float a = sample.a;
    a = max(a, sampleAlpha(-vThickness.x, 0.0));
    a = max(a, sampleAlpha(vThickness.x, 0.0));
    a = max(a, sampleAlpha(0.0, -vThickness.y));
    a = max(a, sampleAlpha(0.0, vThickness.y));
    a = max(a, sampleAlpha(-vThickness.x, -vThickness.y));
    a = max(a, sampleAlpha(vThickness.x, -vThickness.y));
    a = max(a, sampleAlpha(-vThickness.x, vThickness.y));
    a = max(a, sampleAlpha(vThickness.x, vThickness.y));
    gl_FragColor = vec4(sample.rgb * a, a) * vColor;
}
`);
  }
}

WebGLRenderer.registerPlugin(MapSpriteRenderer.Name, MapSpriteRenderer);
CanvasRenderer.registerPlugin(MapSpriteRenderer.Name, CanvasSpriteRenderer as any);