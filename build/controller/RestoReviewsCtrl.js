"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const findAllRows = async (req, res) => {
  const result = await req.context.models.resto_reviews.findAll();
  return res.send(result);
};

const findRowById = async (req, res) => {
  const result = await req.context.models.resto_reviews.findByPk(req.params.id);
  return res.send(result);
};

const createRow = async (req, res) => {
  const {
    rere_comments,
    rere_rating,
    rere_user_id,
    rere_reto_id
  } = req.body;

  try {
    const result = await req.context.models.resto_reviews.create({
      rere_comments: rere_comments,
      rere_rating: rere_rating,
      rere_user_id: rere_user_id,
      rere_reto_id: rere_reto_id
    });
    return res.send(result);
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: "",
      error: error
    });
  }
};

const updateRow = async (req, res) => {
  const {
    rere_comments,
    rere_rating,
    rere_user_id,
    rere_reto_id
  } = req.body;

  try {
    const result = await req.context.models.resto_reviews.update({
      rere_comments: rere_comments,
      rere_rating: rere_rating,
      rere_user_id: rere_user_id,
      rere_reto_id: rere_reto_id
    }, {
      returning: true,
      where: {
        rere_id: req.params.id
      }
    });
    return res.send(result);
  } catch (error) {
    return res.status(404).json({
      status: "Failed",
      message: "",
      error: error
    });
  }
};

const deleteRow = async (req, res) => {
  const id = req.params.id;
  await req.context.models.resto_reviews.destroy({
    where: {
      rere_id: id
    }
  }).then(result => {
    return res.send("delete " + result + " rows.");
  }).catch(error => {
    return res.sendStatus(404).send("Data not found.");
  });
};

var _default = {
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow
};
exports.default = _default;
//# sourceMappingURL=RestoReviewsCtrl.js.map