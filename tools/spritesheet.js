const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const glob = require('glob');
const spritesheet = require('spritesheet-js');

module.exports = function () {
  this.plugin('before-compile', (compiler, callback) => {
    const inPath = path.resolve(process.cwd(), 'sprites');
    const outPath = path.resolve(process.cwd(), 'assets', 'sprites');
    Promise.all(fs.readdirSync(inPath)
      .filter(entry => fs.statSync(path.resolve(inPath, entry)).isDirectory())
      .map(name => {
        const jsonPath = path.resolve(outPath, `${name}.json`);
        const pattern = path.resolve(inPath, name, '*.png');
        const hash = glob.sync(pattern).reduce(
          (hash, file) => hash.update(fs.readFileSync(file)),
          crypto.createHash('sha1')
        ).digest().toString('hex');

        if (fs.existsSync(jsonPath) && require(jsonPath).meta.hash === hash) {
          return Promise.resolve();
        }

        console.log(`building spritesheet: ${name}`);
        return new Promise(resolve => spritesheet(pattern, {
          format: 'pixi.js',
          path: outPath,
          name
        }, () => {
          const json = JSON.parse(fs.readFileSync(jsonPath));
          json.frames = Object.assign({}, ...Object.keys(json.frames)
            .map(key => ({ [`sprites/${name}/${key.slice(0, -4)}`]: json.frames[key] })));
          json.meta.hash = hash;
          fs.writeFileSync(jsonPath, JSON.stringify(json));
          resolve();
        }));
      })).then(() => callback());
  });
};
