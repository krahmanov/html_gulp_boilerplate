import del from "del";
import zipPlugin from "gulp-zip";

export const zip = () => {
  del(`./${app.path.rootDir}.zip`);
  return app.gulp
    .src(`${app.path.buildDir}/**/*.*`, {})
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "ZIP",
          message: "Error: <%= error.message %>",
        })
      )
    )
    .pipe(zipPlugin(`${app.path.rootDir}.zip`))
    .pipe(app.gulp.dest(`./`));
};
