if (!process.env['ELECTRON_RUN_AS_NODE']) {
  const { app, remote, BrowserWindow } = require('electron');
  let win;
  app.on('ready', () => {
    win = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false } });
    win.setMenu(null);
    win.loadURL('http://localhost:8080/');
    win.webContents.on('did-finish-load', () => {
      win.webContents.executeJavaScript(`(function() {
const gl = document.createElement('canvas').getContext('webgl');
const ext = gl.getExtension('WEBGL_debug_renderer_info');
console.log('RENDERER: ' + gl.getParameter(ext.UNMASKED_RENDERER_WEBGL));
})()`);
    });
  });
  app.on('window-all-closed', () => app.quit());

  const ps = require('child_process').fork(module.filename);
  ps.on('message', msg => {
    if (msg === 'ok' && win) {
      win.reload();
      win.webContents.once('did-finish-load', () => {
        win.webContents.openDevTools();
        win.setMenu(null);
        win.maximize();
      });
    }
  });
  app.on('quit', () => ps.kill());
} else {
  const serve = require('webpack-serve');
  const config = require('./webpack.config.js');
  serve({ config }).then(server => server.on('listening', () => process.send('ok')));
}