// import { makeExecutableSchema } from "apollo-server";
import { ObjectID } from "bson";
import { GraphQLScalarType, Kind } from "graphql";
ObjectID.cacheHexString = true;
export const GraphQLScalarID = new GraphQLScalarType({
  name: "ID",
  description: "ObjectId for mongodb",
  parseValue: ObjectID.createFromHexString,
  serialize(v: ObjectID | string) {
    if (typeof v === "string") { return v; }
    return v.toHexString();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      if (/^[0-9a-f]{24}$/.test(ast.value)) {
        return ast.value;
      } else {
        throw new Error("ObjectId must be a single String of 24 hex characters");
      }
    }
    return null;
  },
});

export const GraphQLScalarDate = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  parseValue(value: number) { return new Date(value); },
  serialize(value: Date) {
    return value.getTime();
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});
