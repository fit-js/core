import path from 'path';
import { env } from './args';
import { json, exit } from './utils';

let pkg = json (path.join (process.cwd(), 'package.json'));
let use = [];

function confirmDeps () {
	let bundles = pkg.bundles;

	bundles.forEach ( (item) => {
		let tool = pkg.dependencies[item.package] !== undefined;

		if (tool) {
			use.push(item);
		}
	});

	return;
}

function confirmDevDeps () {
	let bundles = pkg.bundles;

	if (pkg.devDependencies) {
		bundles.forEach ( (item) => {
			let tool = pkg.devDependencies[item.package] !== undefined;

			if (tool) {
				use.push(item);
			}
		});

		return;
	}
}

export function init () {
	if (pkg && pkg.bundles) {
		if (env() === 'develop') confirmDevDeps();
		confirmDeps();
		return Promise.resolve();
	} else {
		return Promise.reject('Configure maybe..?');
	}
}

export default function () {
	return use;
}
