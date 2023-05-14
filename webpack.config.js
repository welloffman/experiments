const path = require('path');
const modules_path = path.resolve(__dirname, 'web');

const all = {
	entry: './web/js/index.js',
	output: {
		path: path.resolve(__dirname, 'web/js'),
		filename: './all.min.js',
		clean: false
	},
	resolve: {
		roots: [__dirname, modules_path],
	},
	mode: 'production'
};

module.exports = [all];