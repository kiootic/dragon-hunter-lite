import { Easing, Tween } from '@tweenjs/tween.js';
import { DisplayObject } from 'pixi.js';
import { bindCallback } from 'rxjs/observable/bindCallback';

export function fadeOut(obj: DisplayObject) {
  return bindCallback(callback => new Tween(obj)
    .to({ alpha: 0 }, 250)
    .easing(Easing.Quadratic.Out)
    .onComplete(callback)
    .start()
  )();
}

export function fadeIn(obj: DisplayObject) {
  return bindCallback(callback => new Tween(obj)
    .to({ alpha: 1 }, 250)
    .easing(Easing.Quadratic.In)
    .onComplete(callback)
    .start()
  )();
}
