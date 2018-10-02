// copy packages
// copy
// tslint:disable:no-implicit-dependencies
import * as del from "del";
import * as gulp from "gulp";
import * as jeditor from "gulp-json-editor";
import * as ts from "gulp-typescript";

const tsProject = ts.createProject("tsconfig.prod.json");
// task for typescript
gulp.task("ts", () => {
  return tsProject.src()
    .pipe(tsProject())
    .js.pipe(gulp.dest("build"));
});
const editPackageJson = jeditor((pkg: any) => {
  delete pkg.devDependencies;
  delete pkg.scripts;
  return pkg;
});
gulp.task("package.json", () => {
  return gulp
    .src([
      "{packages,reacts,serves}/*/package.json",
      "package.json",
    ])
    .pipe(editPackageJson)
    .pipe(gulp.dest("./build"));
});

gulp.task("clean", () => del("build"));
const build = gulp.series(
  "clean",
  gulp.parallel("package.json", "ts"),
);
gulp.task("default", build);
