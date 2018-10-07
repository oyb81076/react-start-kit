import { configureStore, history, registerReducer } from "@rt/react-app";
import { dashboardReducer } from "@rt/react-ui";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactDOM from "react-dom";
import { Provider as ReduxProvider } from "react-redux";
import { ConnectedRouter as RouterProvider } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import { client } from "./client";
import Routes from "./Routes";
registerReducer({ dashboard: dashboardReducer, form: formReducer });
const App: React.ComponentType<{ Component: React.ComponentType }> = ({ Component }) => (
  <ReduxProvider store={configureStore()}>
    <ApolloProvider client={client}>
      <RouterProvider history={history}>
        <Component />
      </RouterProvider>
    </ApolloProvider>
  </ReduxProvider>
);
declare var module: any;
const MOUNT_NODE = document.getElementById("root") as HTMLElement;
ReactDOM.render(<App Component={Routes} />, MOUNT_NODE);
if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept(["./Routes"], () => setImmediate(() => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    ReactDOM.render(<App Component={require("./Routes").default} />, MOUNT_NODE);
  }));
}
