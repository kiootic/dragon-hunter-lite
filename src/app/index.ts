import { bootstrap } from './bootstrap';
import { App } from 'app/App';
import { StatePreload } from 'app/states/StatePreload';

const app = bootstrap(App.instance);
app.pushState(new StatePreload());
Object.assign(window, { app });
