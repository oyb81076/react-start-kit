export enum UserRole {
  ROOT, ADMIN, CONSUMER,
}
export interface IUserCore<ID, DATE> {
  _id: ID;
  name: string;
  age: number;
  created: DATE;
}
export interface IExampleCore<ID, DATE> {
  _id: ID;
  title: string;
  created: DATE;
}
