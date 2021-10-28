const { src, dest, series, watch } = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;
const del = require("del");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass")(require("sass"));
const svgSprite = require("gulp-svg-sprite");
const fileInclude = require("gulp-file-include");
const sourcemaps = require("gulp-sourcemaps");
const htmlmin = require("gulp-htmlmin");
const gulpif = require("gulp-if");
const notify = require("gulp-notify");
const image = require("gulp-image");
const concat = require("gulp-concat");
const imagewepb = require("gulp-webp");

let isProd = false; // dev by default

const clean = () => {
  return del(["app/*"]);
};

// SVG sprite conversion
const svgSprites = () => {
  return src("./src/img/svg/**.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg", // sprite file name
          },
        },
      })
    )
    .pipe(dest("./app/img"));
};

// STYLES
const styles = () => {
  return src("./src/scss/**/*.scss")
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(sass().on("error", notify.onError()))
    .pipe(autoprefixer("last 5 versions"))
    .pipe(gulpif(isProd, cleanCSS({ level: 2 })))
    .pipe(dest("./app/css/"))
    .pipe(browserSync.stream());
};

// SCRIPTS
const scripts = () => {
  src("./src/js/vendor/**.js")
    .pipe(concat("vendor.js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(dest("./app/js/"));
  return src([
    "./src/js/global.js",
    "./src/js/components/**.js",
    "./src/js/main.js",
  ])
    .pipe(gulpif(!isProd, sourcemaps.init()))
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("main.js"))
    .pipe(gulpif(isProd, uglify().on("error", notify.onError())))
    .pipe(gulpif(!isProd, sourcemaps.write(".")))
    .pipe(dest("./app/js"))
    .pipe(browserSync.stream());
};

// Other resources
const resources = () => {
  return src("./src/resources/**").pipe(dest("./app"));
};

// Image Optimization
const images = () => {
  return src([
    "./src/img/**.jpg",
    "./src/img/**.png",
    "./src/img/**.jpeg",
    "./src/img/*.svg",
    "./src/img/**/*.jpg",
    "./src/img/**/*.png",
    "./src/img/**/*.jpeg",
  ])
    .pipe(gulpif(isProd, image()))
    .pipe(dest("./app/img"));
};

// Convert Images
const webpImage = () => {
  return src("src/img/**/*.{jpg,jpeg,png}")
    .pipe(imagewepb())
    .pipe(dest("app/img/webp"));
};

const htmlInclude = () => {
  return src(["./src/*.html"])
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(dest("./app"))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app",
    },
  });

  watch("./src/scss/**/*.scss", styles);
  watch("./src/js/**/*.js", scripts);
  watch("./src/partials/*.html", htmlInclude);
  watch("./src/*.html", htmlInclude);
  watch("./src/resources/**", resources);
  watch("./src/img/*.{jpg,jpeg,png,svg}", images);
  watch("./src/img/**/*.{jpg,jpeg,png}", images);
  watch("./src/img/svg/**.svg", svgSprites);
};

const htmlMinify = () => {
  return src("app/**/*.html")
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("app"));
};

const toProd = (done) => {
  isProd = true;
  done();
};

exports.default = series(
  clean,
  htmlInclude,
  scripts,
  styles,
  resources,
  images,
  webpImage,
  svgSprites,
  watchFiles
);

exports.build = series(
  toProd,
  clean,
  htmlInclude,
  scripts,
  styles,
  resources,
  images,
  webpImage,
  svgSprites,
  htmlMinify
);
