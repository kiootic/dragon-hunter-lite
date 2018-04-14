import { bootstrap } from './bootstrap';
import { App } from 'app/app';

const app = bootstrap(App);
Object.assign(window, { app });
