"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _compression = _interopRequireDefault(require("compression"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _helmet = _interopRequireDefault(require("helmet"));

var _IndexModel = _interopRequireWildcard(require("./models/IndexModel"));

var _IndexRoute = _interopRequireDefault(require("./routes/IndexRoute"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1. pastikan selalu import dotenv di line pertama
const passport = require('passport');

const Strategy = require('passport-local').Strategy;

const expressSession = require('express-session');

const middleware = require('./helpers/middleware'); //for access models to db


// declare port
const port = process.env.PORT || 1337;
const sessionSecret = process.env.SESSION_SECRET || 'admin';
const adminPassword = process.env.ADMIN_PASSWORD || 'rahasia';
passport.use(new Strategy(function (username, password, cb) {
  const isAdmin = username === 'admin' && password === adminPassword;
  if (isAdmin) cb(null, {
    username: 'admin'
  });
  cb(null, false);
}));
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
const app = (0, _express.default)(); // parse body params and attache them to req.body

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cookieParser.default)()); // use helmet spy bisa dikenali SEO

app.use((0, _helmet.default)()); // secure apps by setting various HTTP headers

app.use((0, _compression.default)()); // enable CORS - Cross Origin Resource Sharing

app.use((0, _cors.default)());
app.use(expressSession({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.post('/login', passport.authenticate('local'), (req, res) => res.json({
  success: true
})); // load models dan simpan di req.context

app.use(async (req, res, next) => {
  req.context = {
    models: _IndexModel.default
  };
  next();
});
/* app.use(process.env.URL_DOMAIN,(req,res)=>{
    res.send("Hello Eshopay");
}); */
// call routes

app.use(process.env.URL_DOMAIN, _IndexRoute.default.authRoute);
app.use(process.env.URL_API + "/category", _IndexRoute.default.categoryRoute);
app.use(process.env.URL_API + "/product", _IndexRoute.default.productRoute);
app.use(process.env.URL_API + "/users", _IndexRoute.default.userRoute);
app.use(middleware.handleError);
app.use(middleware.notFound);
app.use(middleware.cors); // set to false agar tidak di drop tables yang ada didatabase

const dropDatabaseSync = false;

_IndexModel.sequelize.sync({
  force: dropDatabaseSync
}).then(async () => {
  if (dropDatabaseSync) {
    console.log("Database do not drop");
  }

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

function ensureAdmin(req, res, next) {
  const isAdmin = req.user && req.user.username === 'admin';
  if (isAdmin) return next();
  res.status(401).json({
    error: 'Unauthorized'
  });
}

var _default = app;
exports.default = _default;
//# sourceMappingURL=Indexx.js.map