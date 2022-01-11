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

var _IndexModels = _interopRequireWildcard(require("./models/IndexModels"));

var _IndexRoute = _interopRequireDefault(require("./routes/IndexRoute"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1. pastikan selalu import dotenv di line pertama
//for access models to db
// import authJWT from "./helpers/authJWT";
// declare port
const port = process.env.PORT || 1337;
const app = (0, _express.default)(); // parse body params and attache them to req.body

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: true
}));
app.use((0, _cookieParser.default)()); // use helmet spy bisa dikenali SEO

app.use((0, _helmet.default)()); // secure apps by setting various HTTP headers

app.use((0, _compression.default)()); // enable CORS - Cross Origin Resource Sharing

app.use((0, _cors.default)()); // load models dan simpan di req.context

app.use(async (req, res, next) => {
  req.context = {
    models: _IndexModels.default
  };
  next();
});
/*  app.use(process.env.URL_DOMAIN,(req,res)=>{
    res.send("Hello Eshopay");
});  */
//auth.setMiddleware(app);
// call routes
// app.post(process.env.URL_DOMAIN+"/login",authJWT.authenticate,authJWT.login)
// app.get(process.env.URL_DOMAIN+"/me",authJWT.ensureAdmin,(req,res)=>{
//     res.json("coo");
// })

app.use(process.env.URL_API + "/type", _IndexRoute.default.MenuTypeRoute);
app.use(process.env.URL_API + "/category", _IndexRoute.default.RestoCategoryRoute);
app.use(process.env.URL_API + "/user", _IndexRoute.default.UsersRoute);
app.use(process.env.URL_API + "/shop", _IndexRoute.default.RestoShopRoute);
app.use(process.env.URL_API + "/menu", _IndexRoute.default.RestoMenuRoute);
app.use(process.env.URL_API + "/addres", _IndexRoute.default.AddressRoute);
app.use(process.env.URL_API + "/cart", _IndexRoute.default.AddToCart);
app.use(process.env.URL_DOMAIN + "/auth", _IndexRoute.default.AuthJwtRoute);
app.use(process.env.URL_API + "/clit", _IndexRoute.default.ClitRoute);
app.use(process.env.URL_API + "/order", _IndexRoute.default.OrderRoute); //use middleware to handle error from others modules
// set to false agar tidak di drop tables yang ada didatabase

const dropDatabaseSync = false;

_IndexModels.sequelize.sync({
  force: dropDatabaseSync
}).then(async () => {
  if (dropDatabaseSync) {
    console.log("Database do not drop");
  }

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
});

var _default = app;
exports.default = _default;
//# sourceMappingURL=Index.js.map