import { MapGenerator } from 'worker/mapgen/MapGenerator';

onmessage = ev => {
  console.log('message', ev.data);
  switch (ev.data.action) {
    case 'generate': {
      const { width, height, seed } = ev.data;
      const generator = new MapGenerator(width, height, seed);
      const { map, library } = generator.generate((message, progress) => {
        postMessage({ action: 'progress', message, progress });
      });
      postMessage({ action: 'completed', map: map.serialize(), library });
    } break;

    default:
      console.error('unknown message', ev.data);
  }
};