"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _MenuTypeRote = _interopRequireDefault(require("./MenuTypeRote"));

var _RestoCategoryRoute = _interopRequireDefault(require("./RestoCategoryRoute"));

var _UsersRoute = _interopRequireDefault(require("./UsersRoute"));

var _RestoMenuRoute = _interopRequireDefault(require("./RestoMenuRoute"));

var _RestoShopRoute = _interopRequireDefault(require("./RestoShopRoute"));

var _AddressRoute = _interopRequireDefault(require("./AddressRoute"));

var _RestoReviewsRoute = _interopRequireDefault(require("./RestoReviewsRoute"));

var _AddToCart = _interopRequireDefault(require("./AddToCart"));

var _AuthJwtRoute = _interopRequireDefault(require("./AuthJwtRoute"));

var _ClitRoute = _interopRequireDefault(require("./ClitRoute"));

var _OrderRoute = _interopRequireDefault(require("./OrderRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  AddToCart: _AddToCart.default,
  MenuTypeRoute: _MenuTypeRote.default,
  RestoCategoryRoute: _RestoCategoryRoute.default,
  UsersRoute: _UsersRoute.default,
  RestoMenuRoute: _RestoMenuRoute.default,
  RestoShopRoute: _RestoShopRoute.default,
  AddressRoute: _AddressRoute.default,
  RestoReviewsRoute: _RestoReviewsRoute.default,
  AuthJwtRoute: _AuthJwtRoute.default,
  ClitRoute: _ClitRoute.default,
  OrderRoute: _OrderRoute.default
};
exports.default = _default;
//# sourceMappingURL=IndexRoute.js.map