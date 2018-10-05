import del from "del";
export function cleanBuild() { return del("build"); }
export function cleanAll() {
  return del([
    "*.log",
    "**/{lib,build,dist,__generated__}",
    "*/node_modules",
    "*/*/node_modules",
  ]);
}
