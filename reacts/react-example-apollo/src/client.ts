import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
const cache = new InMemoryCache({
  dataIdFromObject: (object: any) => object._id,
});
export const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql" }),
  cache,
  connectToDevTools: true,
});
