import { generate } from 'worker/mapgen';

onmessage = ev => {
  console.log('message', ev.data);
  switch (ev.data.action) {
    case 'generate': {
      const { width, height, seed, library } = ev.data;
      const map = generate(width, height, seed, library, (message, progress) => {
        postMessage({ action: 'progress', message, progress });
      });
      postMessage({ action: 'completed', map });
    } break;

    default:
      console.error('unknown message', ev.data);
  }
};