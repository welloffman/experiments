export default class MathService {
	getRandomString() {
		const prefix = `f${(+new Date).toString(16)}`;
		return prefix + (Math.random() + 1).toString(36).substring(2);
	}	
}