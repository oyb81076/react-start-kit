import { MuiThemeProvider, Theme } from "@material-ui/core/styles";
import { History } from "history";
import * as React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { Store } from "redux";
export interface IAppProps {
  store: Store;
  history: History;
  theme?: Theme;
  component: React.ComponentType<{}>;
}
export default class App extends React.Component<IAppProps> {
  public shouldComponentUpdate() {
    return false;
  }
  public render() {
    const { theme, store, history, component: Component } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {theme ?
            <MuiThemeProvider theme={theme}>
              <Component />
            </MuiThemeProvider>
            : <Component />
          }
        </ConnectedRouter>
      </Provider>
    );
  }
}
