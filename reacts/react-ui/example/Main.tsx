import * as React from "react";
import { Route } from "react-router";
import { Dashboard } from "../index";
const Main: React.ComponentType = () => (
  <Route component={Dashboard} />
);
export default Main;
