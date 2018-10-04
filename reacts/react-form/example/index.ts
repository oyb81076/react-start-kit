// tslint:disable:no-implicit-dependencies
import { registerReducer, renderRoute } from "@rt/react-app";
import { dashboardReducer } from "@rt/react-ui";
import { reducer as formReducer } from "redux-form";
import Main from "./Main";
registerReducer({
  dashboard: dashboardReducer,
  form: formReducer,
});
renderRoute("/form-example", Main);
declare var module: any;
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept(["./Main"], () => setImmediate(() => {
    renderRoute("/form-example", require("./Main").default);
  }));
}
