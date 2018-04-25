import { DisplayTileSize } from 'app';
import { Camera, Entity } from 'app/game';
import { Task } from 'app/game/Task';
import { Spatial } from 'app/game/traits';
import { vec2 } from 'gl-matrix';

//const EntitySize = 64;
const MarginSize = 5;

export class EntityDisplayTask extends Task {
  private readonly visible = new Set<Entity>();

  public update(dt: number) {
    this.updateVisibility();
    this.updateSprites(dt);
    this.updateTransforms();
  }

  private halfSize = vec2.create();
  private tr = vec2.create();
  private updateVisibility() {
    const { offset, viewWidth: w, viewHeight: h } = this.game.view.camera;
    const margin = MarginSize * DisplayTileSize;
    vec2.scaleAndAdd(this.halfSize, [margin, margin], [w, h], 2);
    const isVisible = (position: vec2) => {
      vec2.scaleAndAdd(this.tr, this.halfSize, position, -DisplayTileSize);
      vec2.add(this.tr, this.tr, offset);
      return this.tr[0] > 0 && this.tr[1] > 0;
    };

    for (const entity of this.visible) {
      const { position, sprite } = entity.traits.get(Spatial);
      if (!entity.game || !isVisible(position)) {
        this.visible.delete(entity);
        this.game.view.camera.removeChild(sprite);
      }
    }

    for (const entity of this.game.entities.findTrait(Spatial)) {
      const { position, sprite } = entity.traits.get(Spatial);
      if (isVisible(position) && !this.visible.has(entity)) {
        this.visible.add(entity);
        this.game.view.camera.add(Object.assign(sprite, { layer: Camera.Layer.Objects }));
      }
    }
  }

  private elapsed = 0;
  private updateSprites(dt: number) {
    this.elapsed += dt;
    for (const entity of this.visible)
      entity.traits.get(Spatial).sprite.update(this.elapsed);
  }

  private updateTransforms() {
    const { offset: [dx, dy], viewWidth: w, viewHeight: h } = this.game.view.camera;

    for (const entity of this.visible) {
      const { position, sprite, scale } = entity.traits.get(Spatial);
      sprite.anchor.set(0.5, 1);
      sprite.scale.set(scale[0], scale[1]);

      const terrain = this.game.library.terrains[this.game.map.getTerrain(position[0], position[1])];
      const liquid = terrain && terrain.liquid;
      sprite.clip = liquid ? [0, 1 / 6] : [0, 0];

      const tx = Math.floor(position[0] * DisplayTileSize);
      const ty = Math.floor(position[1] * DisplayTileSize);
      sprite.position.set(tx - dx + Math.floor(w / 2), ty - dy + Math.floor(h / 2));
    }
  }
}