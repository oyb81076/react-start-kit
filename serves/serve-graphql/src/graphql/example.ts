import { IExampleBson } from "@pk/models/src/bson";
import { makeExecutableSchema } from "apollo-server";
import { ObjectId } from "bson";
import { exampleCol } from "../db";
import { createTypeDef, sleep } from "../tools";

const findExamples = async () => {
  await sleep();
  return exampleCol.find().toArray();
};

const findExample = async (_: any, { _id }: { _id: ObjectId }) => {
  await sleep();
  return exampleCol.findOne({ _id });
};

const insertExample = async (_: any, { title }: { title: string }) => {
  await sleep();
  const entry: IExampleBson = {
    _id: new ObjectId(),
    title,
    created: new Date(),
  };
  await exampleCol.insertOne(entry);
  return entry;
};

const updateExample = async (_: any, { _id, title }: { _id: ObjectId, title: string }) => {
  await sleep();
  const { value } = await exampleCol.findOneAndUpdate(
    { _id },
    { $set: { title } },
    { returnOriginal: false },
  );
  return value;
};

const deleteExample = async (_: any, { _id }: { _id: ObjectId }) => {
  await sleep();
  const { deletedCount } = await exampleCol.deleteOne({ _id });
  return deletedCount;
};

export default makeExecutableSchema({
  typeDefs: createTypeDef(__dirname, "./example.gql"),
  resolvers: {
    Query: {
      findExamples: findExamples as any,
      findExample: findExample as any,
    },
    Mutation: {
      insertExample: insertExample as any,
      updateExample: updateExample as any,
      deleteExample: deleteExample as any,
    },
  },
});
