// tslint:disable:no-implicit-dependencies
import { configureStore, history, registerReducer, render } from "@rt/react-app";
// tslint:disable:no-implicit-dependencies
import ChildComponent from "@rt/react-ui/example/Main";
import { dashboardReducer } from "../index";
registerReducer({ dashboard: dashboardReducer });
const store = configureStore();
render({ history, store, ChildComponent });
if (__DEV__ && module.hot) {
  module.hot.accept(["./Main"], () => setImmediate(() => {
    render({ history, store, ChildComponent: require("./Main").default });
  }));
}
