import { Omit } from "@pk/types";
import { IUserCore } from "./core";

type ID = string;
type DATE = string;
export type IUser = IUserCore<ID, DATE>;
export type IUserCreator = Omit<IUser, "_id" | "created">;
export type IUserUpdater = Omit<IUser, "_id" | "created">;
