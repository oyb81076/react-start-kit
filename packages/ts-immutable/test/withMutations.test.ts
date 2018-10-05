import { fromObject } from "..";
test.only("update", () => {
  const map = fromObject({ _id: "map" });
  const next = map.withMutations((v) => {
    v.update("_id", () => "nextId");
  });
  expect(next.get("_id")).toEqual("nextId");
});
