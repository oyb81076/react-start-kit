import { fromJS, Map, Seq } from "immutable";
import { fromObject, IMapRecord } from "..";
interface IUser {
  _id: string;
  nickname?: string;
  age: number;
  timestamp: Date;
  children: IUser[];
  parent?: IUser;
  styles: Map<string, string>;
}
test("immutable", () => {
  const obj: IUser = {
    _id: "id",
    nickname: "nickname",
    age: 30,
    timestamp: new Date(),
    children: [{
      _id: "id",
      nickname: "nickname",
      age: 30,
      timestamp: new Date(),
      children: [],
      styles: Map({ display: "block" }),
    }],
    styles: Map({ display: "block" }),
    parent: {
      _id: "id.parent",
      age: 3,
      timestamp: new Date(),
      children: [],
      styles: Map({}),
    },
  };
  const user: IMapRecord<IUser> = fromJS(obj);
  expect(user.get("children").get(0).get("age"))
    .toEqual(obj.children[0].age);
  expect(user.getIn(["children", 0, "age"]))
    .toEqual(obj.children[0].age);
  const parent = user.get("parent");
  expect(parent).not.toBeUndefined();
  expect(parent!.get("_id")).toEqual(obj.parent!._id);
  expect(user.getIn(Seq(["not exists name"]))).toBeUndefined();
  expect(user.get("styles").get("block"))
    .toEqual(obj.styles.get("block"));
});
test("typeof", () => {
  const user = { _id: "name" };
  const map = fromObject(user);
  expect(map.get("_id")).toEqual(user._id);
});
