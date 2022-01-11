"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _IndexCtrl = _interopRequireDefault(require("../controller/IndexCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)(); // method post

router.post("/signup", _IndexCtrl.default.UserCtrl.signup);
router.get("/", _IndexCtrl.default.UserCtrl.findAllRows);
router.post("/signin", _IndexCtrl.default.UserCtrl.signin);
router.delete("/:id", _IndexCtrl.default.UserCtrl.deleteRow);
router.put("/:id", _IndexCtrl.default.UserCtrl.updateUser);
var _default = router;
exports.default = _default;
//# sourceMappingURL=UsersRoute.js.map