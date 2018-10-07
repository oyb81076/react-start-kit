import { ObjectID } from "bson";
import { GraphQLScalarType, Kind } from "graphql";
import { Moment } from "moment";
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
  serialize(value: Date | Moment | string | number) {
    const type = typeof value;
    if (type === "object") {
      return (value as Date | Moment).toISOString();
    } else if (value === "string") {
      return value;
    } else if (value === "number") {
      return new Date(value).toISOString();
    }
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    } else if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  },
});
