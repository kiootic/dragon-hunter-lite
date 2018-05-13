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

function dir(dy: number, dx: number, left: number, right: number) {
  const angle = Math.atan2(dy, dx);
  if (Math.abs(angle) > Math.PI * left)
    return 'left';
  else if (Math.abs(angle) < Math.PI * right)
    return 'right';
  else if (angle < 0)
    return 'up';
  else
    return 'down';
}

export function direction(dy: number, dx: number, type: 'movement' | 'attack' | 'horizontal') {
  switch (type) {
    case 'movement': return dir(dy, dx, 3 / 5, 2 / 5);
    case 'attack': return dir(dy, dx, 3 / 4, 1 / 4);
    case 'horizontal': return dir(dy, dx, 1 / 2, 1 / 2);
  }
}