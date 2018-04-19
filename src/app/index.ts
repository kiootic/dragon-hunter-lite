import { bootstrap } from './bootstrap';
import { App, UIScaleFactor } from 'app/App';
import { StatePreload } from 'app/states';

const app = bootstrap(App.instance);
app.pushState(new StatePreload());
Object.assign(window, { app });

export { App, UIScaleFactor };