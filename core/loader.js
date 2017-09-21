import * as path from 'path';
import * as process from 'process';
import { args, utils, config } from './';

function local (module_name, opts) {
	let relative = path.join (process.cwd(), 'node_modules', module_name);
	let local = path.join (process.cwd(), '..', module_name);

	return opts != true ?
		relative : args.emulateLocal() ?
			utils.moduleResolve (local) ?
				local : relative : relative;
};

export default function () {
	let use = config.use();

	if ( use.length ) {
		use.forEach((item) => {
			let load = local (item.package, true);
			console.log ((' '+ path.relative (process.cwd(), load) +' ').gray.bold.inverse);

			try {
				require (load).init (item.config);
				console.log (' Loaded '.green.bold.inverse);
			}
			catch (e) {
				console.log (' Failed: '.red.bold.inverse +':', e.code ? e.code.red : e);
			}

		});

		console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~'.rainbow);
	} else {
		utils.error ('No Bundles found.');
	}

	return Promise.resolve();
};


export { local as local };
