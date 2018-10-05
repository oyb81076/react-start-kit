import gulp from "gulp";
import jsonEditor from "gulp-json-editor";
const editPackageJson = jsonEditor((pkg: any) => {
  delete pkg.devDependencies;
  delete pkg.scripts;
  return pkg;
});
export function packageJson() {
  return gulp
    .src([
      "{packages,reacts,serves}/*/package.json",
      "package.json",
    ])
    .pipe(editPackageJson)
    .pipe(gulp.dest("build"));
}
