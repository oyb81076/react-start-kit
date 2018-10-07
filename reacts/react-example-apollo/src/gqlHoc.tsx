import React from "react";
import { DataProps, DataValue } from "react-apollo";
import { branch, renderComponent, withProps } from "recompose";
const ErrorComponent = (props: DataProps<{}>) => (
  <div>
    <pre>{props.data.error!.stack}</pre>
    <p>Something went wrong, you can try to</p>
    <div>{typeof props.data.refetch}</div>
    {/* <div>
      <button onClick={props.data.refetch}>重试</button>
    </div> */}
  </div>
);
const LoadingComponent = () =>
  <div className="Spinner">
    <div className="loader">Loading...</div>
  </div>;

export const renderWhileLoading = (
  propName = "data",
  component: React.ComponentType = LoadingComponent,
) => branch(
  (props: any) => props[propName] && (props[propName] as DataValue<any>).loading,
  renderComponent(component),
);

export const renderForError = (
  propName = "data",
  component: React.ComponentType<any> = ErrorComponent,
) => branch(
  (props: any) => props[propName] && props[propName].error,
  propName === "data"
    ? renderComponent(component)
    : renderComponent(
      withProps(
        (props: any) => ({ data: props[propName] }),
      )(component),
    ),
);
