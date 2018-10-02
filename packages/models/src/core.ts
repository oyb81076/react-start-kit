export enum UserRole {
  ROOT, ADMIN, CONSUMER,
}
export interface IUserCore<ID, DATE> {
  _id: ID;
  name: string;
  age: number;
  timestamp: DATE;
}
