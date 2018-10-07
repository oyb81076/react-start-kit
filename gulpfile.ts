// tslint:disable:no-implicit-dependencies
import gulp from "gulp";
import path from "path";
import {
  cleanAllBuild,
  cleanBuild,
  cleanNodeModules,
  describe,
  packageJson,
  tsc,
} from "./scripts/gulp-tasks";
gulp.task("clean", describe(gulp.parallel(
  cleanAllBuild,
  cleanNodeModules,
), "清除所有文件"));
gulp.task("clean:build", describe(cleanAllBuild, "清除构建期间生成的各种代码"));
gulp.task("default", describe(
  gulp.series(
    cleanBuild,
    gulp.parallel(packageJson, tsc),
  ),
  "构建",
));
