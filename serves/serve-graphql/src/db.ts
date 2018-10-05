import { dbName, options, url } from "@pk/etc/src/mongo";
import { IExampleBson, IUserBson } from "@pk/models/src/bson";
import { Collection, Db, MongoClient } from "mongodb";
import { getFileLogger } from "./logger";
export let db: Db;
export let userCol: Collection<IUserBson>;
export let exampleCol: Collection<IExampleBson>;
const callback: Array<() => void> = [];
const logger = getFileLogger(__filename);
let connecting = false;
const co = () => {
  if (connecting) { return; }
  connecting = true;
  MongoClient.connect(url, options).then((client) => {
    logger.info("db connect to %s success", url);
    // 服务器启动日志
    db = client.db(dbName);
    userCol = db.collection("users");
    exampleCol = db.collection("examples");
    callback.forEach((x) => x());
    callback.length = 0;
    connecting = false;
  }).catch((error) => {
    logger.error(error);
    process.exit(2);
  });
};
export const connect = async (): Promise<void> => {
  if (db) { return; }
  co();
  return new Promise<void>((resolve) => callback.push(resolve));
};
