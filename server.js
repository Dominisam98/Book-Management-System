const express = require("express");
const apolloServer = require("./apolloServer");

const app = express();

apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app });

  app.get("/", (req, res) => {
    res.send("Express server along with apollo graphql");
  });

  app.listen(3001, () => {
    console.log("Server is listening on port 3001");
  });
});
