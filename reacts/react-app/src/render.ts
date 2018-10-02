import * as React from "react";
import * as ReactDOM from "react-dom";
import App, { IAppProps } from "./App";
export const render = (props: IAppProps) => {
  const MOUNT_NODE = document.getElementById("root") as HTMLElement;
  ReactDOM.render(React.createElement(App, props), MOUNT_NODE);
};
