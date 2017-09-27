// Exporting global FrontEndImplementerTools API
import * as utils from './core/utils';
import * as args from './core/args.js';
import * as config from './core/config.js';
import * as globals from './core/globals.js';
import install from './core/install.js';
import {
	default as loader,
	local as local
} from './core/loader.js';

export { utils as utils,
	args as args,
	config as config,
	globals as globals,
	loader as loader,
	local as local,
	install as install
};
