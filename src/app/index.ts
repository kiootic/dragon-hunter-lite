import { bootstrap } from 'app/bootstrap';
import { StatePreload } from 'app/states';
import { App } from 'app/App';
export * from 'app/App';
export * from 'app/settings';

const app = bootstrap(App.instance);
app.pushState(new StatePreload(app));
Object.assign(window, { app });