import { schema } from "@serve/serve-graphql/src/graphql";
import { runQuery } from "apollo-server-core";
import chalk from "chalk";
import { exec } from "child_process";
import gulp from "gulp";
import path from "path";

// tslint:disable-next-line:no-var-requires
const file = require("gulp-file");
// tslint:disable-next-line:max-line-length
const queryString = "query IntrospectionQuery {\n  __schema {\n    queryType {\n      name\n    }\n    mutationType {\n      name\n    }\n    subscriptionType {\n      name\n    }\n    types {\n      ...FullType\n    }\n    directives {\n      name\n      description\n      locations\n      args {\n        ...InputValue\n      }\n    }\n  }\n}\n\nfragment FullType on __Type {\n  kind\n  name\n  description\n  fields(includeDeprecated: true) {\n    name\n    description\n    args {\n      ...InputValue\n    }\n    type {\n      ...TypeRef\n    }\n    isDeprecated\n    deprecationReason\n  }\n  inputFields {\n    ...InputValue\n  }\n  interfaces {\n    ...TypeRef\n  }\n  enumValues(includeDeprecated: true) {\n    name\n    description\n    isDeprecated\n    deprecationReason\n  }\n  possibleTypes {\n    ...TypeRef\n  }\n}\n\nfragment InputValue on __InputValue {\n  name\n  description\n  type {\n    ...TypeRef\n  }\n  defaultValue\n}\n\nfragment TypeRef on __Type {\n  kind\n  name\n  ofType {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n";
const getSchemaString = (): Promise<any> => {
  return runQuery({
    schema,
    queryString,
    request: {} as any,
  }).then(({ data }) => data);
};
export function graphqlSchema() {
  return getSchemaString().then((data: any) => {
    return file("schema.json", JSON.stringify(data, null, 2), { src: true })
      .pipe(gulp.dest("build"));
  });
}
export function makeGraphqlCodeGen(cwd: string) {
  return function graphqlCodeGen(cb: (err: any) => void) {
    const command = [
      "npx",
      "apollo",
      "codegen:generate",
      `--schema=${path.join(__dirname, "../../build/schema.json")}`,
      "--target=typescript",
      "--queries=**/*.gql",
      "--addTypename",
    ].join(" ");
    console.log(command);
    exec(command, { cwd }, (err, stdout, stderr) => {
      if (stdout) {
        console.log(err ? chalk.red(stdout) : stdout);
      }
      if (stderr) {
        console.error(chalk.red(stdout));
      }
      cb(err);
    });
  };
}
