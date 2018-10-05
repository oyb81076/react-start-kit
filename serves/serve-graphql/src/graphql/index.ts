import { mergeSchemas } from "apollo-server";
import example from "./example";
import {
  GraphQLScalarDate,
  GraphQLScalarID,
} from "./scalar";
import user from "./user";
export const schema = mergeSchemas({
  schemas: [
    user,
    example,
  ],
  resolvers: [{
    ID: GraphQLScalarID,
    Date: GraphQLScalarDate,
  }],
});
