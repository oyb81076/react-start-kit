import { ObjectId } from "bson";
import { IUserCore, UserRole } from "./core";

export interface IUserBson extends IUserCore<ObjectId, Date> { }
export interface ISessionBson {
  _id?: ObjectId;
  role: UserRole;
}
