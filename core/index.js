// Exporting global FrontEndImplementerTools API
import * as colors from 'colors';
import * as utils from './utils';
import * as args from './args.js';
import * as config from './config.js';
import * as globals from './globals.js';

export { default as loader, local as local } from './loader.js';

export { utils as utils };
export { args as args };
export { config as config };
export { globals as globals };

// export * from './globals.js';
export { default as install } from './install.js';
