import { GetExampleList } from "@pk/gql";
import gql from "graphql-tag";
import React from "react";
import { DataProps, graphql } from "react-apollo";
import { compose } from "recompose";
import { renderForError, renderWhileLoading } from "./gqlHoc";

const enhancer = compose<DataProps<GetExampleList>, {}>(
  graphql(gql`query select { findExamples {_id, title, created} }`, {
    // options: () => ({}), // query options
  }),
  renderWhileLoading(),
  renderForError(),
);
const List: React.ComponentType<DataProps<GetExampleList>> = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>_id</th>
        <th>title</th>
        <th>created</th>
      </tr>
    </thead>
    <tbody>
      {data.findExamples!.map((u) => (
        <tr key={u._id}>
          <td>{u._id}</td>
          <td>{u.title}</td>
          <td>{u.created}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default enhancer(List);
