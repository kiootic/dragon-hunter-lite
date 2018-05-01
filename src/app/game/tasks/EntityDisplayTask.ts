import { DisplayTileSize } from 'app';
import { Entity } from 'app/game/entities';
import { Task } from 'app/game/tasks';
import { Float, Spatial } from 'app/game/traits';
import { Camera } from 'app/game/Camera';
import { vec2 } from 'gl-matrix';

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

    for (const entity of this.game.entities.withTrait(Spatial)) {
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
    for (const entity of this.visible) {
      const { position, sprite, scale } = entity.traits.get(Spatial);
      const float = entity.traits.get(Float);
      sprite.anchor.set(0.5, 1);
      sprite.scale.set(scale[0], scale[1]);

      const terrain = this.game.library.terrains[this.game.map.getTerrain(position[0], position[1])];
      const liquid = terrain && terrain.liquid;
      sprite.clip = liquid ? [0, 1 / 6] : undefined;

      const z = float ? float.z[0] : 0;
      this.game.view.camera.toCameraPoint(position, sprite.position, z);
      vec2.set(sprite.sortOffset, 0, z);
    }
  }
}