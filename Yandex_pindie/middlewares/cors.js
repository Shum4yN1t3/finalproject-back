const allowedCors = [
  "https://practicum.yandex.ru",
  "https://students-projects.ru",
  "localhost:3000",
  "http://localhost:3000",
  "localhost:3001",
  "http://localhost:3001",
  "localhost:27017",
  "https://api.yandex-pindie.nomoredomainswork.ru",
  "https://yandex-pindie.nomoredomainswork.ru",
];

function corsMiddleware(req, res, next) {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization"
  );

  next();
}

module.exports = {
  corsMiddleware,
};
