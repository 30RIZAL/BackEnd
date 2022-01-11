"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _IndexCtrl = _interopRequireDefault(require("../controller/IndexCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/", _IndexCtrl.default.MenuTypeCtrl.findAllRows);
router.get("/:id", _IndexCtrl.default.MenuTypeCtrl.findRowById);
router.post("/", _IndexCtrl.default.MenuTypeCtrl.createRow);
router.put("/:id", _IndexCtrl.default.MenuTypeCtrl.updateRow);
router.delete("/:id", _IndexCtrl.default.MenuTypeCtrl.deleteRow);
var _default = router;
exports.default = _default;
//# sourceMappingURL=MenuTypeRote.js.map