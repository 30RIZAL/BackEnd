"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _IndexCtrl = _interopRequireDefault(require("../controller/IndexCtrl"));

var _UpDonwloadHelper = _interopRequireDefault(require("../helper/UpDonwloadHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/", _IndexCtrl.default.RestoMenuCtrl.findAllRows);
router.get("/:id", _IndexCtrl.default.RestoMenuCtrl.findRowById);
router.get("/beda/ada/", _IndexCtrl.default.RestoMenuCtrl.findOne);
router.post("/", _IndexCtrl.default.RestoMenuCtrl.createRow); // router.put("/:id",IndexCtrl.RestoMenuCtrl.updateRow);

router.put("/:id", _IndexCtrl.default.RestoMenuCtrl.updateProduct);
router.delete("/:id", _IndexCtrl.default.RestoMenuCtrl.deleteRow);
router.get("/images/:filename", _UpDonwloadHelper.default.showProductImage);
var _default = router;
exports.default = _default;
//# sourceMappingURL=RestoMenuRoute.js.map