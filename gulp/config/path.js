import * as nodePath from "path";
const rootDir = nodePath.basename(nodePath.resolve());

const buildDir = "./dist";
const srcDir = "./src";

export const path = {
  build: {
    files: `${buildDir}/files/`,
    html: `${buildDir}/`,
    css: `${buildDir}/css/`,
    js: `${buildDir}/js/`,
    images: `${buildDir}/img/`,
    fonts: `${buildDir}/fonts/`,
  },
  src: {
    files: `${srcDir}/files/**/*.*`,
    html: `${srcDir}/*.html`,
    scss: `${srcDir}/styles/style.scss`,
    js: `${srcDir}/js/app.js`,
    images: `${srcDir}/img/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcDir}/img/**/*.svg`,
    svgicons: `${srcDir}/svgicons/*.svg`,
  },
  watch: {
    files: `${srcDir}/files/**/*.*`,
    html: `${srcDir}/**/*.html`,
    scss: `${srcDir}/styles/**/*.scss`,
    js: `${srcDir}/js/**/*.js`,
    images: `${srcDir}/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}`,
  },
  clean: buildDir,
  buildDir: buildDir,
  srcDir: srcDir,
  rootDir: rootDir,
  ftp: ``,
};
