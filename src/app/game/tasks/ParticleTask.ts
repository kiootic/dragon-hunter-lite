import { Game } from 'app/game';
import { ShowParticles } from 'app/game/messages';
import { Task } from 'app/game/tasks';
import { vec2 } from 'gl-matrix';
import { clamp } from 'lodash';
import { particles, Sprite, Texture } from 'pixi.js';

const ParticleLife = 1000;
const ParticleSize = 16;
const ParticleGravity = -10;
const ParticleRestitution = 0.5;

class Particle extends Sprite {
  readonly coords: vec2;
  readonly velocity: vec2;
  readonly z: vec2;
  readonly gravity: boolean;
  life = ParticleLife * (Math.random() * 0.5 + 0.75);

  constructor(type: ShowParticles.Type, coords: vec2, z: number, color: number) {
    super(Texture.fromFrame('sprites/ui/particle'));

    let size;
    if (type === ShowParticles.Type.Splash) {
      this.coords = vec2.random(vec2.create(), 0.25);
      this.velocity = vec2.random(vec2.create(), 0.5);
      this.z = vec2.fromValues(z + 0.25 + Math.random() * 0.5, Math.random());
      this.gravity = true;
      size = clamp(ParticleSize * (Math.random() + 0.5), 10, 22);
    } else {
      this.coords = vec2.fromValues(Math.random() - 0.5, 0);
      this.velocity = vec2.fromValues(0, 0);
      this.z = vec2.fromValues(z + 0.25 + Math.random(), Math.random() * 0.5 + 0.25);
      this.gravity = false;
      size = clamp(ParticleSize * Math.random(), 10, 16);
      this.alpha = 0.7;
    }

    vec2.add(this.coords, this.coords, coords);

    // even size to reduce scale artifacts
    size = (size + 1) & ~1;
    this.scale.set(size / ParticleSize, size / ParticleSize);

    const colorJitter = Math.floor((Math.random() * 2 - 1) * 32);
    let r = (color >> 16) & 0xff, g = (color >> 8) & 0xff, b = color & 0xff;
    r = clamp(r + colorJitter, 0, 255);
    g = clamp(g + colorJitter, 0, 255);
    b = clamp(b + colorJitter, 0, 255);
    this.tint = (r << 16) + (g << 8) + b;
  }
}

export class ParticleTask extends Task {
  private readonly particles: Particle[] = [];
  private readonly overlay = Object.assign(new particles.ParticleContainer(), { layout: () => { } });

  constructor(game: Game) {
    super(game);
    game.view.add(this.overlay);
    game.messages$.ofType(ShowParticles).subscribe(this.showParticles);
  }

  private showParticles = ({ particleType, coords, numParticles, color, z }: ShowParticles) => {
    for (let i = 0; i < numParticles; i++) {
      const particle = new Particle(particleType, coords, z, color);

      this.overlay.addChild(particle);
      this.particles.push(particle);
    }
  }

  public update(dt: number) {
    const t = dt / 1000;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i];
      particle.life -= dt;
      if (particle.life <= 0) {
        this.overlay.removeChild(particle);
        this.particles.splice(i, 1);
        continue;
      }

      vec2.scaleAndAdd(particle.coords, particle.coords, particle.velocity, t);

      const gravity = particle.gravity ? ParticleGravity : 0;
      particle.z[0] += particle.z[1] * t + 0.5 * gravity * t * t;
      particle.z[1] += gravity * t;
      if (particle.z[0] <= 0) {
        particle.z[0] = 0;
        particle.z[1] = -particle.z[1] * ParticleRestitution;
        vec2.scale(particle.velocity, particle.velocity, ParticleRestitution);
      }

      this.game.view.camera.toCameraPoint(particle.coords, particle.position, particle.z[0]);
    }
  }
}