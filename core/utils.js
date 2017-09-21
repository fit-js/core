import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';

export function json (file) {
	let output;

	if (!exists (file)) return false;

	try {
		output = JSON.parse (fs.readFileSync (file));
	}
	catch (e) {
		console.log (file.gray + ' ' + (' '+ e +' ').error.inverse);
		return false;
	}

	return output;
};

// Plugin display error
export function error (type, original) {
	console.log('!'.yellow.inverse +' '+ (type +': '+ original).yellow.bold);
};

// Plugin does file exist
export function exists (filename) {
	let short_filename = path.relative(process.cwd(), filename);

	if (filename.includes('*')) {
		return true;
	} else {
		if (fs.existsSync (filename)) {
			return true;
		}
		else {
			console.log ('', ' missing '.red.inverse, short_filename.gray);
			return false;
		}
	}
};

// hard exit
export function exit (msg) {
	if (msg) console.log(msg);
	process.exit(0);
};

export function filterNonExistingFiles (source, cwd = process.cwd()) {
	cwd = cwd || process.cwd();

	if (typeof source == 'string' && source.length > 0) {
		return exists (path.join (cwd, source)) ? [ source ] : undefined;
	}

	if (source instanceof Array && source.length > 0) {
		let filtered = source.filter ((item) => {
			return exists (path.join (cwd, item));
		});
		return filtered.length > 0 ? filtered : undefined;
	}

	return undefined;
};

export function moduleResolve (where) {
	try {
		require.resolve (where);
	}
	catch (e) {
		return false;
	}

	return true;
};
