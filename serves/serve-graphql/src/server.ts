import { ApolloServer } from "apollo-server-express";
import express from "express";
import { connect } from "./db";
import { schema } from "./graphql";
import { getFileLogger } from "./logger";
const logger = getFileLogger(__filename);
const app = express();
export const apolloServer = new ApolloServer({ schema });
apolloServer.applyMiddleware({ app });
const port = 4000;
connect().then(() => {
  app.listen({ port }, () => {
    logger.info(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  });
});
