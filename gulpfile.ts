// copy packages
// copy
// tslint:disable:no-implicit-dependencies
import * as del from "del";
import * as gulp from "gulp";
import * as jeditor from "gulp-json-editor";
import * as sourcemaps from "gulp-sourcemaps";
import * as ts from "gulp-typescript";

const tsProject = ts.createProject("tsconfig.prod.json");
// task for typescript
gulp.task("ts", () => {
  return tsProject.src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"));
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

gulp.task("clean:build", () => del("build"));
gulp.task("clean", () => del([
  "node_modules",
  "build",
  "**/node_modules",
  "*.log",
  "**/{lib,build,dist}",
]));
const build = gulp.series(
  "clean:build",
  gulp.parallel("package.json", "ts"),
);
gulp.task("default", build);
