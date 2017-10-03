import process from 'process';
let local, environment;

function isArg (arg) {
	return process.argv.find ((item) => item === arg);
}

local = isArg ('-l');
environment = isArg ('-b') || isArg ('--deploy') ? 'production' : 'develop';

export function emulateLocal () {
	return local;
}

export function env () {
	return environment;
}

export function print () {
	console.log((' ENV: '+ environment +' ').toUpperCase().cyan.inverse);
}
