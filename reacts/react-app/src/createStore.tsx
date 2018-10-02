import { createBrowserHistory } from "history";
import { routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, combineReducers, compose, createStore, ReducersMapObject, Store } from "redux";
import { reducer as formReducer } from "redux-form";
export const history = createBrowserHistory();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(routerMiddleware(history)),
);
const reducers: ReducersMapObject = {
  form: formReducer,
  router: routerReducer,
};

let store: Store | null = null;
/**
 * 为了hot reload写的函数, 采用注入的方式, 这样方hot reload的时候替换
 * @param obj
 */
export const registerReducer = (obj: any) => {
  Object.assign(reducers, obj);
  if (store) {
    store.replaceReducer(combineReducers(reducers));
  }
};

export const configureStore = () => {
  return store = createStore(combineReducers(reducers), enhancer);
};
