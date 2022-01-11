"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _IndexCtrl = _interopRequireDefault(require("../controller/IndexCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/:id", _IndexCtrl.default.OrderCtrl.addOrder);
var _default = router;
exports.default = _default;
//# sourceMappingURL=OrderRoute.js.map