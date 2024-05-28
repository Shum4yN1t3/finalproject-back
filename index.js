const express = require("express");
const path = require("path");
const app = express();
const port = 3001;
const bodyParser = require("body-parser");
const cors = require("./middlewares/cors");
const connectToDatabase = require("./database/connect");
const apiRouter = require("./routes/apiRouter");
const cookieParser = require("cookie-parser");
const pagesRouter = require("./routes/pages");
connectToDatabase();

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  pagesRouter,
  apiRouter,
  express.static(path.join(__dirname, "public"))
);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
