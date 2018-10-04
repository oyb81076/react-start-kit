// tslint:disable:no-implicit-dependencies
import { renderPure } from "@rt/react-app";
import SignIn from "../src/SignIn";
renderPure(SignIn);
declare var module: any;
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept(["../src/SignIn"], () => {
    setImmediate(() => {
      renderPure(require("../src/SignIn").default);
    });
  });
}
