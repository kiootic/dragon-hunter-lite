const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const glob = require('glob');
const spritesheet = require('spritesheet-js');
const Watchpack = require("watchpack");

function compileSpritesheet() {
  const inPath = path.resolve(process.cwd(), 'sprites');
  const assetPath = path.resolve(process.cwd(), 'assets');
  const outPath = path.resolve(process.cwd(), 'assets', 'sprites');
  return Promise.all(
    fs.readdirSync(inPath)
      .filter(entry => fs.statSync(path.resolve(inPath, entry)).isDirectory())
      .map(name => {
        const jsonPath = path.resolve(outPath, `${name}.json`);
        const pattern = path.resolve(inPath, name, '*.png');
        const hash = glob.sync(pattern).reduce(
          (hash, file) => hash.update(file).update(fs.readFileSync(file)),
          crypto.createHash('sha1')
        ).digest().toString('hex');

        if (fs.existsSync(jsonPath) && JSON.parse(fs.readFileSync(jsonPath)).meta.hash === hash) {
          return Promise.resolve();
        }

        console.log(`building spritesheet: ${name}`);
        return new Promise(resolve => spritesheet(pattern, {
          format: 'pixi.js',
          path: outPath,
          name,
          trim: false,
          padding: 2,
        }, () => {
          const json = JSON.parse(fs.readFileSync(jsonPath));
          json.frames = Object.assign({}, ...Object.keys(json.frames)
            .map(key => ({ [`sprites/${name}/${key.slice(0, -4)}`]: json.frames[key] })));
          json.meta.hash = hash;
          fs.writeFileSync(jsonPath, JSON.stringify(json));
          console.log('done');
          resolve();
        }));
      })
  );
}

module.exports = function () {
  let wp;
  this.hooks.watchRun.tap('spritesheet', () => {
    if (!wp) {
      wp = new Watchpack({ aggregateTimeout: 1000 });
      wp.on('aggregated', () => compileSpritesheet());
      wp.watch([], [path.resolve(process.cwd(), 'sprites')], Date.now() - 10000);
    }
  });
  this.hooks.beforeCompile.tapPromise('spritesheet', () => compileSpritesheet());
};
