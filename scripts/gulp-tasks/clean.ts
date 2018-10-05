import del from "del";
export function cleanBuild() { return del("build"); }
export function cleanAllBuild() {
  return del([
    "*.log",
    "**/{lib,build,dist,__generated__}",
  ]);
}
export function cleanNodeModules() {
  return del(["node_modules"]);
}
