import chalk from "chalk";
import { exec } from "child_process";
import gulp from "gulp";
import sourcemaps from "gulp-sourcemaps";
import ts from "gulp-typescript";
const tsProject = ts.createProject("tsconfig.prod.json");
export function gulpTsc() {
  return tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("build"));
}
export function tsc(cb: (err: any) => void) {
  exec(`npx tsc -p tsconfig.prod.json`, (err, stdout, stderr) => {
    if (stdout && err) {
      console.log(chalk.red(stdout));
    }
    if (stderr) {
      console.error(chalk.red(stdout));
    }
    cb(err);
  });
}
export function copyTs() {
  return tsProject.src()
    .pipe(gulp.dest("build"));
}
