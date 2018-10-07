import moment from "moment";
import React from "react";
import { create } from "react-test-renderer";
import DateFormat from "../src/DateFormat";
import DateTimeFormat from "../src/DateTimeFormat";
const date = new Date("2018-10-07T11:39:10.674Z");
test("null", () => {
  const component = create(<DateFormat date={date} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test("default", () => {
  const component = create(<DateFormat date={date} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("toNow", () => {
  const m = moment().add(-1, "h");
  const component = create(<DateFormat toNow date={m} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("datetime", () => {
  const component = create(<DateTimeFormat date={date} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
