const addOrder = async (req, res) => {
  const result = await req.context.models.order_menu.findAll({
    include: [
      {
        all: true,
      },
    ],
    where: { order_user_id: req.params.id, order_status: 'open' },
  });
  return res.send(result);
};


const createRow = async (req, res) => {
  const {
    order_name,
    order_created,
    order_subtotal,
    order_qty,
    order_tax,
    order_delivery,
    order_discount,
    order_promo,
    order_total_price,
    order_status,
    order_payment_type,
    order_payment_trx,
    order_user_id,
  } = req.body;
  try {
    const result = await req.context.models.order_menu.create({
      order_name: order_name,
      order_created: order_created,
      order_subtotal: order_subtotal,
      order_qty: order_qty,
      order_tax: order_tax,
      order_delivery: order_delivery,
      order_discount: order_discount,
      order_promo: order_promo,
      order_total_price: order_total_price,
      order_status: order_status,
      order_payment_type: order_payment_type,
      order_payment_trx: order_payment_trx,
      order_user_id: order_user_id,
    });
    return res.send(result);
  } catch (error) {
    return res.status(404).json({
      status: 'Failed',
      message: '',
      error: error,
    });
  }
};

const updateRow = async (req, res) => {
  const {
    order_name,
    order_created,
    order_subtotal,
    order_qty,
    order_tax,
    order_delivery,
    order_discount,
    order_promo,
    order_total_price,
    order_status,
    order_payment_type,
    order_payment_trx,
    order_user_id,
  } = req.body;
  const result = await req.context.models.order_menu.update(
    {
      order_name: order_name,
      order_created: order_created,
      order_subtotal: order_subtotal,
      order_qty: order_qty,
      order_tax: order_tax,
      order_delivery: order_delivery,
      order_discount: order_discount,
      order_promo: order_promo,
      order_total_price: order_total_price,
      order_status: order_status,
      order_payment_type: order_payment_type,
      order_payment_trx: order_payment_trx,
      order_user_id: order_user_id,
    },
    {
      returning: true,
      where: { mety_name: req.params.id },
    }
  );
  return res.send(result);
};

const deleteRow = async (req, res) => {
  const id = req.params.id;

  await req.context.models.order_menu
    .destroy({
      where: { order_name: id },
    })
    .then((result) => {
      return res.send('delete ' + result + ' rows.');
    })
    .catch((error) => {
      return res.sendStatus(404).send('Data not found.');
    });
};
/////////////////////////////////

const payment = async (req, res, next) => {
  const prices = req.cekcart;
  const payment = {};
  let price = 0;
  let discount = 0;
  let tax = 0;
  let due = 0;
  let qty = 0;
  let promo = 0;
  for (const data of prices.cart_line_items) {
    try {
      price += parseInt(data.clit_price);
      qty += parseInt(data.clit_qty);
      if (req.all.qty > 1) {
        discount = 0.05 * price;
      }
      tax = (price - discount) * 0.1;
      due = price - discount + tax;
      promo = discount;
      payment['price'] = price;
      payment['discount'] = discount;
      payment['tax'] = tax;
      payment['promo'] = promo;
      payment['due'] = due;
      payment['qty'] = qty;
    } catch (error) {
      return res.status(500).json({ message: 'Order Error' + error });
    }
  }
  req.payment = payment;
  next();
};

const cekord = async (req, res, next) => {
  const user = req.cekUser;

  try {
    const order = await req.context.models.order_menu.findOne({
      include: [
        {
          all: true,
        },
      ],
      where: {
        order_user_id: user.user_id,
        order_status: 'open',
      },
    });
    req.cekord = order;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Input Error' + error });
  }
};

const update = async (req, res, next) => {
  try {
    const user = req.cekUser;
    const cekorder = req.cekord;
    if (cekorder) {
      const order = await req.context.models.order_menu.update(
        {
          order_payment_trx: req.body.order_payment_trx,
          order_status: 'open',
        },
        {
          where: {
            order_user_id: user.user_id,
            order_name: cekorder.order_name,
          },
        }
      );
      req.order_menu = order;
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Order Error' + error });
  }
};

const cancel = async (req, res) => {
  try {
    const user = req.cekUser;
    const cekorder = req.cekord;
    if (cekorder) {
      const order = await req.context.models.order_menu.update(
        {
          order_status: 'cancelled',
        },
        {
          where: {
            order_user_id: user.user_id,
            order_name: cekorder.order_name,
          },
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: 'Order Error' + error });
  }
  return res.send('Order Cancelled');
};

const create = async (req, res, next) => {
  try {
    const user = req.cekUser;
    const cekorder = req.cekord;
    if (cekorder)
      return res.status(400).send({ message: 'Please Finish your order' });
    const order = await req.context.models.order_menu.create({
      order_created: new Date(),
      order_subtotal: req.payment.price,
      order_qty: req.payment.qty,
      order_tax: req.payment.tax,
      order_delivery: 5000,
      order_discount: req.payment.discount,
      order_promo: req.payment.promo,
      order_total_price: parseInt(req.payment.due + 5000),
      order_status: 'open',
      order_user_id: user.user_id,
    });
    req.orders = order;
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Order Error' + error });
  }
};


export default {
  addOrder,
  createRow,
  updateRow,
  deleteRow,
  payment,
  cekord,
  update,
  cancel,
  create,
};
