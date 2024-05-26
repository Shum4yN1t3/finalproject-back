// app.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { corsMiddleware } = require("./middlewares/cors");
const connectToDatabase = require("./database/connect");
const apiRouter = require("./routes/apiRouter");
const pagesRouter = require("./routes/pages");

const PORT = 3001;
const app = express();

connectToDatabase();

app.use(
  corsMiddleware,
  cookieParser(),
  bodyParser.json(),
  pagesRouter,
  apiRouter,
  express.static(path.join(__dirname, "public"))
);

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
