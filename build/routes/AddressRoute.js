"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _IndexCtrl = _interopRequireDefault(require("../controller/IndexCtrl"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.get('/', _IndexCtrl.default.AddresCtrl.findAllRows);
router.get('/:id', _IndexCtrl.default.AddresCtrl.findOne);
router.post('/', _IndexCtrl.default.AddresCtrl.createRow);
router.put('/:id', _IndexCtrl.default.AddresCtrl.updateRow);
router.delete('/:id', _IndexCtrl.default.AddresCtrl.deleteRow);
var _default = router;
exports.default = _default;
//# sourceMappingURL=AddressRoute.js.map