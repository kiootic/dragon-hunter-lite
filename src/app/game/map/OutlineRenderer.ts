import {
  ObjectRenderer, TextureUvs, Sprite, utils, Shader, Quad,
  CanvasRenderer, WebGLRenderer, CanvasSpriteRenderer, Rectangle
} from 'pixi.js';
import { UIScaleFactor } from 'app';

const OutlineWidth = 2;

export class OutlineRenderer extends ObjectRenderer {
  public static readonly Name = 'outline';

  private readonly _tint = new Float32Array(4);
  private readonly _thickness = new Float32Array(2);
  private readonly _center = new Float32Array(2);
  private readonly _clamp = new Float32Array(4);
  private readonly _bounds = new Rectangle();
  private _shader!: OutlineShader;

  onContextChange() {
    const gl = this.renderer.gl;
    this._shader = new OutlineShader(gl);
  }

  render(sprite: Sprite) {
    if (!sprite.texture.valid) return;
    const renderer = this.renderer;
    const shader = this._shader;
    renderer.bindShader(shader);
    renderer.state && renderer.state.setBlendMode(sprite.blendMode);

    const quad = shader._quad;
    renderer.bindVao(quad.vao);
    const uvs: TextureUvs = (sprite.texture as any)._uvs;

    const vertices = quad.vertices;
    const vd = sprite.vertexData;
    for (let i = 0; i < 8; i++) {
      quad.vertices[i] = vd[i];
    }

    quad.uvs[0] = uvs.x0;
    quad.uvs[1] = uvs.y0;
    quad.uvs[2] = uvs.x1;
    quad.uvs[3] = uvs.y1;
    quad.uvs[4] = uvs.x2;
    quad.uvs[5] = uvs.y2;
    quad.uvs[6] = uvs.x3;
    quad.uvs[7] = uvs.y3;
    quad.upload();

    var frame = sprite.texture.frame;
    var base = sprite.texture.baseTexture;
    this._clamp[0] = frame.x / base.width;
    this._clamp[1] = frame.y / base.height;
    this._clamp[2] = (frame.x + frame.width) / base.width;
    this._clamp[3] = (frame.y + frame.height) / base.height;

    utils.hex2rgb(sprite.tint, this._tint as any);
    const alpha = sprite.worldAlpha;
    this._tint[0] *= alpha;
    this._tint[1] *= alpha;
    this._tint[2] *= alpha;
    this._tint[3] = alpha;

    this._thickness[0] = OutlineWidth / sprite.scale.x / base.realWidth;
    this._thickness[1] = OutlineWidth / sprite.scale.y / base.realHeight;

    sprite.getBounds(true, this._bounds);
    this._center[0] = this._bounds.x + this._bounds.width / 2;
    this._center[1] = this._bounds.y + this._bounds.height / 2;

    shader.setUniforms(this._tint, this._thickness, this._clamp, this._center);

    renderer.bindTexture(sprite.texture.baseTexture, 0, true);
    quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0);
  }
}

class OutlineShader extends Shader {
  public _quad: Quad;

  constructor(gl: WebGLRenderingContext) {
    super(gl, `
attribute vec2 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec4 aColor;

uniform mat3 projectionMatrix;

varying vec2 vTextureCoord;

void main(void)
{
    vec4 v = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    gl_Position = v;
    vTextureCoord = aTextureCoord;
}`, `
varying vec2 vTextureCoord;
varying vec4 vColor;

uniform sampler2D uSampler;
uniform vec4 uColor;
uniform vec2 uThickness;
uniform vec4 uClamp;

float sampleAlpha(float x, float y) {
  return texture2D(uSampler, clamp(vTextureCoord + vec2(x, y), uClamp.xy, uClamp.zw)).a;
}

void main(void)
{
    vec4 sample = texture2D(uSampler, vTextureCoord);
    float a = sample.a;
    a = max(a, sampleAlpha(-uThickness.x, 0.0));
    a = max(a, sampleAlpha(uThickness.x, 0.0));
    a = max(a, sampleAlpha(0.0, -uThickness.y));
    a = max(a, sampleAlpha(0.0, uThickness.y));
    a = max(a, sampleAlpha(-uThickness.x, -uThickness.y));
    a = max(a, sampleAlpha(uThickness.x, -uThickness.y));
    a = max(a, sampleAlpha(-uThickness.x, uThickness.y));
    a = max(a, sampleAlpha(uThickness.x, uThickness.y));
    if (sample.a == 0.0) a *= 0.5;
    gl_FragColor = vec4(sample.rgb * a, a) * uColor;
}
`);
    this._quad = new PIXI.Quad(gl);
    this._quad.initVao(this);
  }

  public setUniforms(tint: Float32Array, thickness: Float32Array, clamp: Float32Array, center: Float32Array) {
    this.uniforms.uColor = tint;
    this.uniforms.uThickness = thickness;
    this.uniforms.uClamp = clamp;
  }
}

WebGLRenderer.registerPlugin(OutlineRenderer.Name, OutlineRenderer);
CanvasRenderer.registerPlugin(OutlineRenderer.Name, CanvasSpriteRenderer as any);