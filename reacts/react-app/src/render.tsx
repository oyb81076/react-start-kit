import * as React from "react";
import * as ReactDOM from "react-dom";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import App from "./App";
import { configureStore, history } from "./createStore";
export const renderRoute = (path: string, component: React.ComponentType<RouteComponentProps>) => {
  const MOUNT_NODE = document.getElementById("root") as HTMLElement;
  ReactDOM.unmountComponentAtNode(MOUNT_NODE);
  const store = configureStore();
  const Component = () => (
    <Switch>
      <Route path={path} component={component} />
      <Redirect to={path} />
    </Switch>
  );
  ReactDOM.render(
    <App history={history} store={store} component={Component} />,
    MOUNT_NODE,
  );
};

export const renderPure = (component: React.ComponentType<{}>) => {
  const MOUNT_NODE = document.getElementById("root") as HTMLElement;
  ReactDOM.unmountComponentAtNode(MOUNT_NODE);
  const store = configureStore();
  ReactDOM.render(
    <App history={history} store={store} component={component} />,
    MOUNT_NODE,
  );
};
