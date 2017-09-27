import fs from 'fs';
import path from 'path';
import process from 'process';

export function json (file) {
	let output;

	if (!exists (file)) return false;

	try {
		output = JSON.parse (fs.readFileSync (file));
	}
	catch (e) {
		console.log('\x1b[31m', '!', e, '\x1b[0m');
		return false;
	}

	return output;
}

// Plugin display error
export function error (type, original) {
	console.log('\x1b[31m !\x1b[0m\x1b[2m', type+':', original, '\x1b[0m');
}

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
			error ('missing', short_filename);
			return false;
		}
	}
}

// hard exit
export function exit (msg) {
	if (msg) console.log(msg);
	process.exit(0);
}

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
}

export function moduleResolve (where) {
	try {
		require.resolve (where);
	}
	catch (e) {
		return false;
	}

	return true;
}
