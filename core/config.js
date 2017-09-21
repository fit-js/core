import * as fs from 'fs';
import * as path from 'path';
import { args, utils } from './';

export default class Config {
	constructor () {
		this.use = [];
	}

	confirmDeps () {
		let bundles = this.pkg.bundles;

		bundles.forEach ( (item) => {
			let tool = this.pkg.dependencies[item.package] !== undefined;


			if (tool) {
				this.use.push(item);
			}
		});

		return;
	};

	confirmDevDeps () {
		let bundles = this.pkg.bundles;

		if (this.pkg.devDependencies) {
			bundles.forEach ( (item) => {
				let tool = this.pkg.devDependencies[item.package] !== undefined;

				if (tool) {
					this.use.push(item);
				}
			});

			return;
		}
	};

	bundles () {
		return this.use;
	}
}

let config = new Config();

export function init () {

	config.pkg = utils.json (path.join (process.cwd(), 'package.json'));

	if (config.pkg) {
		if ( args.env() === 'develop' ) {
			config.confirmDevDeps();
		}
		config.confirmDeps();
	} else {
		utils.exit('Exiting..');
	}

	return Promise.resolve();
}

export function use () {
	return config.bundles();
}
