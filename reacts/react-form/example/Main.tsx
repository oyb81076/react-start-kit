import Android from "@material-ui/icons/Android";
import { Dashboard, MenuLink } from "@rt/react-ui";
import * as React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import FormExample from "./FormExample";
const Main: React.ComponentType<{ path: string }> = ({ path }) => (
  <Switch>
    <Route path={`${path}/form`} component={FormExample} />
    <Redirect to={`${path}/form`} />
  </Switch>
);
const Menu: React.ComponentType<{ path: string }> = ({ path }) => (
  <>
    <MenuLink href={`${path}/form`} Icon={Android} text="Form" />
  </>
);
const Root = (props: RouteComponentProps) => (
  <Dashboard
    brand="Form"
    MainComponent={Main}
    MenuComponent={Menu}
    {...props} />
);
export default Root;
