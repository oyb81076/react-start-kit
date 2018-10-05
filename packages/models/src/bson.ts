import { ObjectId } from "bson";
import { IExampleCore, IUserCore, UserRole } from "./core";

export type IUserBson = IUserCore<ObjectId, Date>;
export type IExampleBson = IExampleCore<ObjectId, Date>;
export interface ISessionBson {
  _id?: ObjectId;
  role: UserRole;
}
