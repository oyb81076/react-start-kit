import { IUserBson } from "@pk/models/src/bson";
import { makeExecutableSchema } from "apollo-server";
import { ObjectId } from "bson";
import { userCol } from "../db";
import { createTypeDef } from "../tools";
const findUsers = (_: any, { name }: { name?: string }) =>
  userCol
    .find({
      ...(name && { name }),
    })
    .toArray();

const findUser: any = (_: any, { _id }: { _id: ObjectId }) =>
  userCol.findOne({ _id });

const insertUser = async (_: any, { name, age }: { name: string, age: number }) => {
  const user: IUserBson = {
    _id: new ObjectId(),
    name,
    age,
    created: new Date(),
  };
  await userCol.insertOne(user);
  return user;
};

const updateUser = async (_: any, { _id, name, age }: { _id: ObjectId, name: string, age: number }) => {
  const { value } = await userCol
    .findOneAndUpdate(
      { _id },
      { $set: { name, age } },
      { returnOriginal: false },
    );
  return value;
};

export default makeExecutableSchema({
  typeDefs: createTypeDef(__dirname, "./user.gql"),
  resolvers: {
    Query: {
      findUsers: findUsers as any,
      findUser: findUser as any,
    },
    Mutation: {
      insertUser: insertUser as any,
      updateUser: updateUser as any,
    },
  },
});
