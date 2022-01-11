"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _IndexModels = require("../models/IndexModels");

const findAllRows = async (req, res) => {
  const result = await req.context.models.carts.findAll();
  return res.send(result);
};

const findRowById = async (req, res) => {
  const result = await req.context.models.carts.findOne({
    include: [{
      all: true
    }],
    where: {
      cart_user_id: req.params.id,
      cart_status: 'open'
    }
  });
  return res.send(result);
};

const updateRow = async (req, res) => {
  const {
    cart_createdon,
    cart_status,
    cart_reto_id,
    cart_user_id
  } = req.body;
  const result = await req.context.models.carts.update({
    cart_createdon: cart_createdon,
    cart_status: cart_status,
    cart_reto_id: cart_reto_id,
    cart_user_id: cart_user_id
  }, {
    returning: true,
    where: {
      mety_name: req.params.id
    }
  });
  return res.send(result);
};

const deleteRow = async (req, res) => {
  const id = req.params.id;
  await req.context.models.carts.destroy({
    where: {
      mety_name: id
    }
  }).then(result => {
    return res.send("delete " + result + " rows.");
  }).catch(error => {
    return res.sendStatus(404).send("Data not found.");
  });
};

const cekcart = async (req, res, next) => {
  const user = req.cekUser || req.cart; //const user = req.cart

  try {
    const cart = await req.context.models.carts.findOne({
      include: [{
        all: true
      }],
      where: {
        cart_user_id: user.user_id,
        cart_status: 'open'
      }
    });
    req.cekcart = cart;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Input Error" + error
    });
  }
};

const create = async (req, res, next) => {
  const cekcr = req.cekcart;
  const user = req.cekUser || req.cart;

  try {
    if (!cekcr) {
      const result = await req.context.models.carts.create({
        cart_createdon: new Date(),
        cart_status: "open",
        cart_user_id: user.user_id
      });
      req.cart = result;
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Input Error" + error
    });
  }
};

const findqty = async (req, res, next) => {
  const query = req.cekcart;

  try {
    const sum = await _IndexModels.sequelize.query('select count (clit_reme_id) as qty from cart_line_items where (clit_cart_id = :liteid)', {
      replacements: {
        liteid: parseInt(query.cart_id)
      },
      type: _IndexModels.sequelize.QueryTypes.SELECT
    });
    req.all = sum[0];
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Find error " + error
    });
  }
};

const closecart = async (req, res, next) => {
  const orderd = req.orders || req.cekord;

  try {
    await req.context.models.carts.update({
      cart_status: 'close'
    }, {
      returning: true,
      where: {
        cart_user_id: orderd.order_user_id
      }
    });
    next();
  } catch (error) {
    return res.send(error);
  }
};

const cekcartclose = async (req, res, next) => {
  const user = req.cekord || req.cart; //const user = req.cart

  try {
    const cart = await req.context.models.carts.findOne({
      include: [{
        all: true
      }],
      where: {
        cart_user_id: user.order_user_id,
        cart_status: "close"
      }
    });
    req.cekcart = cart;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Input Error" + error
    });
  }
};

var _default = {
  updateRow,
  deleteRow,
  findAllRows,
  findRowById,
  create,
  cekcart,
  findqty,
  closecart,
  cekcartclose
};
exports.default = _default;
//# sourceMappingURL=CartCtrl.js.map