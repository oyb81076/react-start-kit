// tslint:disable:no-implicit-dependencies
import gulp from "gulp";
import path from "path";
import {
  cleanAll,
  cleanBuild,
  describe,
  graphqlSchema,
  makeGraphqlCodeGen,
  packageJson,
  tsc,
} from "./scripts/gulp-tasks";
const codegen = makeGraphqlCodeGen(path.join(__dirname, "./reacts/react-example/src"));
const build = gulp.series(
  cleanBuild,
  gulp.parallel(packageJson, tsc),
);
gulp.task("clean", describe(cleanAll, "清除所有文件"));
gulp.task("schema", describe(graphqlSchema, "生成schema.json"));
gulp.task("codegen", describe(codegen, "根据reacts/**/*.gql自动生成ts文件"));
gulp.task("default", describe(build, "构建"));
