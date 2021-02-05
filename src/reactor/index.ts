import { scan } from './router';
import bootstrap from './bootstrap';
export { default as cache } from './cache';
export { default as config } from './config';
export { default as Globals } from './globals';

export default function Mongez() {
    bootstrap();
    // start router scanner
    scan();
}