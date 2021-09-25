// DEPENDENCIES
const { src, dest, watch, series } = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const imagewepb = require("gulp-webp");

// JavaScript
function minifyJS() {
	return src("src/js/**/*.js")
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ["@babel/preset-env"] }))
		.pipe(concat("main.min.js"))
		.pipe(terser()) // { toplevel: true } - Optimizes variables
		.pipe(sourcemaps.write("./"))
		.pipe(dest("dist/assets/js"));
}

// Styles
function compileStyles() {
	return src(["src/scss/**/*.scss"])
		.pipe(sass())
		.pipe(prefix("last 3 versions"))
		.pipe(minify())
		.pipe(dest("dist/assets/css"));
}

// Images
function optimizeImage() {
	return src("src/images/**/*.{jpg,png,svg}")
		.pipe(
			imagemin([
				imagemin.mozjpeg({ quality: 80, progressive: true }),
				imagemin.optipng({ optimizationLevel: 2 }),
				imagemin.svgo({
					plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest("dist/assets/images"));
}

// Convert Images
function webpImage() {
	return src("dist/assets/images/**/*.{jpg,png}")
		.pipe(imagewepb())
		.pipe(dest("dist/assets/images"));
}

// HTML
function copyHTML() {
	return src("src/*.html").pipe(dest("dist"));
}

// Watcher
function watchTask() {
	watch("src/scss/**/*.scss", compileStyles);
	watch("src/js/**/*.js", minifyJS);
	watch("src/images/**/*.{jpg,png,svg}", optimizeImage);
	watch("dist/assets/images/**/*.{jpg,png}", webpImage);
	watch("src/*.html", copyHTML);
}

// Default Gulp
exports.default = series(
	compileStyles,
	minifyJS,
	optimizeImage,
	webpImage,
	copyHTML,
	watchTask
);
