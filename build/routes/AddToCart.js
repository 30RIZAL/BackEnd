"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _IndexCtrl = _interopRequireDefault(require("../controller/IndexCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get("/", _IndexCtrl.default.CartCtrl.findAllRows);
router.get("/:id", _IndexCtrl.default.CartCtrl.findRowById);
router.post('/item/:id', _IndexCtrl.default.UserCtrl.cekUser, _IndexCtrl.default.RestoShopCtrl.findout, _IndexCtrl.default.CartCtrl.cekcart, _IndexCtrl.default.CartCtrl.create, _IndexCtrl.default.RestoMenuCtrl.findout, _IndexCtrl.default.ClitCtrl.cekclit, _IndexCtrl.default.ClitCtrl.createclit);
router.post('/order/:id', _IndexCtrl.default.UserCtrl.cekUser, _IndexCtrl.default.CartCtrl.cekcart, _IndexCtrl.default.CartCtrl.findqty, _IndexCtrl.default.OrderCtrl.payment, _IndexCtrl.default.OrderCtrl.cekord, _IndexCtrl.default.OrderCtrl.create, _IndexCtrl.default.CartCtrl.closecart, _IndexCtrl.default.ClitCtrl.checkline);
router.put('/ordered/:id', _IndexCtrl.default.UserCtrl.cekUser, _IndexCtrl.default.OrderCtrl.cekord, _IndexCtrl.default.CartCtrl.cekcartclose, _IndexCtrl.default.CartCtrl.findqty, _IndexCtrl.default.OrderCtrl.cekord, _IndexCtrl.default.OrderCtrl.update, _IndexCtrl.default.ClitCtrl.checkpay);
router.put('/cancel/:id', _IndexCtrl.default.UserCtrl.cekUser, _IndexCtrl.default.OrderCtrl.cekord, _IndexCtrl.default.OrderCtrl.cancel);
router.put('/update/:id', _IndexCtrl.default.UserCtrl.cekUser, _IndexCtrl.default.RestoShopCtrl.findout, _IndexCtrl.default.CartCtrl.cekcart, _IndexCtrl.default.RestoMenuCtrl.findout, _IndexCtrl.default.ClitCtrl.cekclit, _IndexCtrl.default.ClitCtrl.updatelite);
var _default = router;
exports.default = _default;
//# sourceMappingURL=AddToCart.js.map