import { App } from 'app/App';
import { StatePreload } from 'app/states';
import { bootstrap } from './bootstrap';
export * from 'app/App';

const app = bootstrap(App.instance);
app.pushState(new StatePreload());
Object.assign(window, { app });