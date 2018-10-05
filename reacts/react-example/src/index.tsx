// tslint:disable:no-implicit-dependencies
import { registerReducer, renderPure } from "@rt/react-app";
import { dashboardReducer } from "@rt/react-ui";
import { reducer as formReducer } from "redux-form";
import Root from "./Root";
registerReducer({
  dashboard: dashboardReducer,
  form: formReducer,
});
renderPure(Root);
declare var module: any;
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept(["./Root"], () => setImmediate(() => {
    renderPure(require("./Root").default);
  }));
}
