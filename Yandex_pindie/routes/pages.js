const pagesRouter = require("express").Router();
const { sendIndex, sendDashboard } = require("../controllers/auth.js");
const { findAuthorizedUser } = require("../middlewares/users.js");

const {
  checkAuth,
  checkCookiesJWT,
  checkUserRole,
} = require("../middlewares/auth");

pagesRouter.get("/", sendIndex);
pagesRouter.get(
  "/admin/**",
  checkCookiesJWT,
  checkAuth,
  findAuthorizedUser,
  checkUserRole,
  sendDashboard
);

module.exports = pagesRouter;
