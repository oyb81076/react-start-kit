import { gql } from "apollo-server";
import fs from "fs";
import path from "path";
export const createTypeDef = (dir: string, filename: string) => {
  const str = fs.readFileSync(path.join(dir, filename), { encoding: "utf8" });
  return gql(str);
};
