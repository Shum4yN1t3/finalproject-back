const gamesRouter = require("express").Router();
const { checkAuth } = require("../middlewares/auth.js");
const {
  checkIsVoteRequest,
  findAllGames,
  createGame,
  findGameById,
  updateGame,
  deleteGame,
  checkEmptyFields,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkIsGameExists,
} = require("../middlewares/games");
const {
  sendAllGames,
  sendGameCreated,
  sendGameById,
  sendGameUpdated,
  sendGameDeleted,
} = require("../controllers/games");

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.post(
  "/games",
  checkAuth,
  checkEmptyFields,
  findAllGames,
  checkIsGameExists,
  createGame,
  sendGameCreated
);
gamesRouter.put(
  "/games/:id",
  checkAuth,
  checkIsVoteRequest,
  checkEmptyFields,
  findAllGames,
  checkIsGameExists,
  findGameById,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  updateGame,
  sendGameUpdated
);
gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted);

module.exports = gamesRouter;
