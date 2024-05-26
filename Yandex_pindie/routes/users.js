const usersRouter = require("express").Router();
const { checkAuth } = require("../middlewares/auth.js");
const { findAllGames } = require("../middlewares/games");
const {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  checkEmptyNameAndEmail,
  checkEmptyNameAndEmailAndPassword,
  checkIsUserExists,
  hashPassword,
  findAuthorizedUser,
  getUserVotedGames,
  checkIsUsernameAndEmailUnique,
} = require("../middlewares/users");
const {
  sendAllUsers,
  sendUserCreated,
  sendUserById,
  sendUserUpdated,
  sendUserDeleted,
  sendMe,
} = require("../controllers/users");

usersRouter.get(
  "/me",
  checkAuth,
  findAuthorizedUser,
  findAllGames,
  getUserVotedGames,
  sendMe
);
usersRouter.get("/users", findAllUsers, sendAllUsers);
usersRouter.get("/users/:id", findUserById, sendUserById);
usersRouter.post(
  "/users",
  checkEmptyNameAndEmailAndPassword,
  findAllUsers,
  checkIsUserExists,
  checkIsUsernameAndEmailUnique,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  findAllUsers,
  findUserById,
  checkIsUsernameAndEmailUnique,
  checkAuth,
  updateUser,
  sendUserUpdated
);
usersRouter.delete("/users/:id", checkAuth, deleteUser, sendUserDeleted);

module.exports = usersRouter;
