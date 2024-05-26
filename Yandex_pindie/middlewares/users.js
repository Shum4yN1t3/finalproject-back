const game = require("../models/game");
const users = require("../models/user");
const bcrypt = require("bcryptjs");

const hashPassword = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
    next();
  } catch (error) {
    res.status(400).send({ message: "Ошибка хеширования пароля" });
  }
};

const findAllUsers = async (req, res, next) => {
  req.usersArray = await users.find({}, { password: 0 });
  next();
};

const createUser = async (req, res, next) => {
  console.log("POST /users");
  try {
    console.log(req.body);
    req.user = await users.create(req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка создания пользователя" }));
  }
};

const findUserById = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
    req.user = await users.findById(req.params.id, { password: 0 });
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};

const updateUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка обновления пользователя" }));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    req.user = await users.findByIdAndDelete(req.params.id);
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res
      .status(400)
      .send(JSON.stringify({ message: "Ошибка удаления пользователя" }));
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Заполни все поля" }));
  } else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Пользователь с таким email уже существует",
      })
    );
  } else {
    next();
  }
};

const checkIsUsernameAndEmailUnique = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    let username_unique = req.body.username === user.username;
    let email_unique = req.body.email === user.email;

    if (req.user.username === user.username) {
      username_unique = false;
    }
    if (req.user.email === user.email) {
      email_unique = false;
    }

    return username_unique || email_unique;
  });

  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: "Имя или почта пользователя не уникальны.",
      })
    );
  } else {
    next();
  }
};

const findAuthorizedUser = async (req, res, next) => {
  console.log("GET /users/:id");
  try {
    req.user = await users.findById(req.user, { password: 0 });
    next();
  } catch (error) {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: "Пользователь не найден" }));
  }
};

const getUserVotedGames = async (req, res, next) => {
  let votedGames = 0;

  for (let game_index = 0; game_index < req.gamesArray.length; game_index++) {
    for (
      let user_index = 0;
      user_index < req.gamesArray[game_index].users.length;
      user_index++
    ) {
      if (
        req.gamesArray[game_index].users[user_index].email ===
        req.user._doc.email
      ) {
        votedGames++;
      }
    }
  }
  req.user = {
    ...req.user._doc,
    games: votedGames,
  };
  next();
};

module.exports = {
  findAllUsers,
  createUser,
  findUserById,
  updateUser,
  deleteUser,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkIsUserExists,
  hashPassword,
  findAuthorizedUser,
  getUserVotedGames,
  checkIsUsernameAndEmailUnique,
};
