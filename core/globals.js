let globals = {};

export function is (name) {
	return globals.hasOwnProperty(name);
}
export function get (name) {
	return globals[name];
}
export function set (name, content) {
	globals[name] = content;
}
