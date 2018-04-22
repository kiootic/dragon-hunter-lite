import { bootstrap } from './bootstrap';
import { App, UIScaleFactor } from 'app/App';
import { StatePreload } from 'app/states';
export * from 'app/App';

const app = bootstrap(App.instance);
app.pushState(new StatePreload());
Object.assign(window, { app });