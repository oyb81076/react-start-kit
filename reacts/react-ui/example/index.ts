// tslint:disable:no-implicit-dependencies
import { registerReducer, renderPure } from "@rt/react-app";
import { dashboardReducer } from "../index";
import Main from "./Main";
registerReducer({ dashboard: dashboardReducer });
renderPure(Main);
declare var module: any;
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept(["./Main"], () => setImmediate(() => {
    renderPure(require("./Main").default);
  }));
}
