export default class GraphicService {
	
	getColor(color1, color2, ratio) {
		let r1 = parseInt (color1.substring (1, 3), 16);
		let g1 = parseInt (color1.substring (3, 5), 16);
		let b1 = parseInt (color1.substring (5, 7), 16);
		let r2 = parseInt (color2.substring (1, 3), 16);
		let g2 = parseInt (color2.substring (3, 5), 16);
		let b2 = parseInt (color2.substring (5, 7), 16);

		let r = String( Math.round(r1 * ratio + r2 * (1 - ratio)).toString(16) ).padStart(2, '0');
		let g = String( Math.round(g1 * ratio + g2 * (1 - ratio)).toString(16) ).padStart(2, '0');
		let b = String( Math.round(b1 * ratio + b2 * (1 - ratio)).toString(16) ).padStart(2, '0');

		return `#${r}${g}${b}`;
	}	
}