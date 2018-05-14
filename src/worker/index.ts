import { generate } from 'worker/generation';

export default function () {
  onmessage = ev => {
    switch (ev.data.action) {
      case 'generate': {
        const { width, height, seed, enemies } = ev.data;
        const gameSave = generate(width, height, seed, enemies, (message, progress) => {
          postMessage({ action: 'progress', message, progress });
        });
        postMessage({ action: 'completed', save: gameSave.save() });
      } break;

      default:
        console.error('unknown message', ev.data);
    }
  };
}