"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _IndexCtrl = _interopRequireDefault(require("../controller/IndexCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/", _IndexCtrl.default.RestoShopCtrl.findAllRows);
router.get("/:id", _IndexCtrl.default.RestoShopCtrl.findRowById);
router.post("/", _IndexCtrl.default.RestoShopCtrl.createRow);
router.put("/:id", _IndexCtrl.default.RestoShopCtrl.updateRow);
router.delete("/:id", _IndexCtrl.default.RestoShopCtrl.deleteRow);
var _default = router;
exports.default = _default;
//# sourceMappingURL=RestoShopRoute.js.map