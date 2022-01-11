"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _authJWT = _interopRequireDefault(require("../helper/authJWT"));

var _IndexCtrl = _interopRequireDefault(require("../controller/IndexCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.post("/signin", _authJWT.default.authenticate, _authJWT.default.login);
router.post("/signup", _IndexCtrl.default.UserCtrl.signup);
var _default = router;
exports.default = _default;
//# sourceMappingURL=AuthJwtRoute.js.map