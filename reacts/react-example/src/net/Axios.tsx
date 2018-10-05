import axios from "axios";
import * as React from "react";
interface IState {
  data: null | any[];
  loading: boolean;
  error: Error | string;
}
export default class Axios extends React.Component<{}, IState> {
  public state: IState = { data: null, loading: false, error: "" };
  private source = axios.CancelToken.source();
  public componentDidMount() {
    this.loadData();
  }
  public componentWillUnmount() {
    this.source.cancel();
  }
  public render() {
    const { loading, error, data } = this.state;
    if (loading) {
      return <div>Loading</div>;
    } else if (error) {
      return <pre>{typeof error === "string" ? error : error.stack}</pre>;
    } else if (data) {
      return (
        <div>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      );
    } else {
      return null;
    }
  }
  private loadData() {
    this.setState({ loading: true, error: "" });
    axios.get("/api/example", {
      cancelToken: this.source.token,
      withCredentials: true,
      headers: { accept: "application/json" },
    }).then(({ data }) => {
      this.setState({ data, loading: false, error: "" });
    }, (error) => {
      this.setState({ loading: false, error });
    });
  }
}
