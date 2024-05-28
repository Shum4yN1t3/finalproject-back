const authRouter = require("./auth");
const categoriesRouter = require("./categories");
const gamesRouter = require("./game");
const usersRouter = require("./users");

const apiRouter = require("express").Router();

apiRouter.use("/api", usersRouter);
apiRouter.use("/api", gamesRouter);
apiRouter.use("/api", categoriesRouter);
apiRouter.use("/api", authRouter);

module.exports = apiRouter;
