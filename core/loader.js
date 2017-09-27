import path from 'path';
import process from 'process';
import { emulateLocal } from './args';
import { moduleResolve, error } from './utils';
import config from './config';

function local (module_name, opts) {
	let relative = path.join (process.cwd(), 'node_modules', module_name);
	let local = path.join (process.cwd(), '..', module_name);

	return opts != true ?
		relative : emulateLocal() ?
			moduleResolve (local) ?
				local : relative : relative;
}

export default function () {
	let use = config();

	if ( use.length ) {
		use.forEach((item) => {
			let load = local (item.package, true);
			let show = path.relative (process.cwd(), load);
			console.log ('\x1b[7m', show, ' \x1b[0m');

			try {
				require (load).init (item.config);
				console.log ('\x1b[32m', 'OK', ' \x1b[0m');
			}
			catch (e) {
				console.log ('\x1b[31m', 'Failed', ' \x1b[0m:', e.code ? e.code.red : e);
			}

		});

		// console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~'.rainbow);
	} else {
		error ('No Bundles found.');
	}

	return Promise.resolve();
}


export { local as local };
