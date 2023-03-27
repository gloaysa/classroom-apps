export const verifyUsernameUtil = (username: string): boolean => {
	const usernameValidator = new RegExp(/^(?=[a-zA-Z])(?!.*[- ]{2,})(?!.*[^a-zA-Z0-9- ])(?!.*\s$)[a-zA-Z0-9- ]{3,15}[a-zA-Z0-9]?$/);
	return !!username.match(usernameValidator);
};
