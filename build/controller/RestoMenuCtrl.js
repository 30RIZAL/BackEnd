"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _formidable = _interopRequireDefault(require("formidable"));

var _UpDonwloadHelper = _interopRequireDefault(require("../helper/UpDonwloadHelper"));

var _response = require("express/lib/response");

var _process = require("process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const findAllRows = async (req, res) => {
  const result = await req.context.models.resto_menu.findAll();
  return res.send(result);
};

const findRowById = async (req, res) => {
  const result = await req.context.models.resto_menu.findByPk(req.params.id);
  return res.send(result);
};

const findOne = async (req, res) => {
  const result = await req.context.models.resto_menu.findByPk(req.body.clit_reme_id);
  return res.send(result);
};

const createRow = async (req, res) => {
  //process.cwd return value working directory
  // __dir return value module directory
  const uploadDir = process.cwd() + '/storages/'; //const uploadFolder = path.join(__dirname,'public','files');
  //config option for formidale

  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024 // 5MB

  };
  const form = (0, _formidable.default)(options); // onpart untuk override stream sebelum di write ke folder

  form.onPart = function (part) {
    if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
      this.handlePart(part);
    } else {
      form._error(new Error('File type is not supported'));
    }
  }; // parsing form yang dikirim dari client


  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message,
        error: error.stack
      });
    }

    if (files.uploadFile.length > 1) {
      return res.status(400).json({
        status: 'error',
        message: 'only one file allowed',
        error: ''
      });
    }

    const uploadFile = files.uploadFile.path;
    const seq = _path.default.sep;
    const urlImage = uploadFile.substr(uploadFile.lastIndexOf(seq), uploadFile.length).replace(seq, ''); //const fieldAttr = fields;

    try {
      const result = await req.context.models.resto_menu.create({
        reme_name: fields.reme_name,
        reme_desc: fields.reme_desc,
        reme_price: parseInt(fields.reme_price),
        reme_url_image: urlImage,
        reme_mety_name: fields.reme_mety_name,
        reme_reto_id: fields.reme_reto_id
      });
      return res.send(result);
    } catch (error) {
      return res.status(404).json({
        status: 'Failed',
        message: '',
        error: error
      });
    }
  });
};

const updateRow = async (req, res) => {
  try {
    const singlePart = await _UpDonwloadHelper.default.uploadSingleFile(req);
    const {
      attrb: {
        file,
        fields,
        filename
      },
      status: {
        status
      }
    } = singlePart;

    if (status === 'succeed') {
      try {
        const result = await req.context.models.resto_menu.update({
          reme_name: fields.reme_name,
          reme_desc: fields.reme_desc,
          reme_price: fields.reme_price,
          reme_url_image: filename,
          reme_mety_name: fields.reme_mety_name,
          reme_reto_id: parseInt(fields.reme_reto_id)
        }, {
          returning: true,
          where: {
            reme_id: req.params.id
          }
        });
        return res.send(result);
      } catch (error) {
        return res.send(404).send(error);
      }
    }

    return res.send(status);
  } catch (error) {
    return res.send(error);
  }
};

const updateProduct = async (req, res) => {
  const {
    reme_name,
    reme_desc,
    reme_price
  } = req.body;

  try {
    const result = await req.context.models.resto_menu.update({
      reme_name: reme_name,
      reme_desc: reme_desc,
      reme_price: reme_price
    }, {
      returning: true,
      where: {
        reme_id: req.params.id
      }
    });
    return res.send(result);
  } catch (error) {
    return res.send(404).send(error);
  }
};

const deleteRow = async (req, res) => {
  const id = req.params.id;
  await req.context.models.resto_menu.destroy({
    where: {
      reme_id: id
    }
  }).then(result => {
    return res.send(`Delete ${result} row`);
  }).catc(error => {
    return res.send(error);
  });
};

const findout = async (req, res, next) => {
  try {
    const menu = await req.context.models.resto_menu.findOne({
      where: {
        reme_id: req.body.reme_id
      }
    });
    req.menu = menu;
    next();
  } catch (error) {
    return res.status(500).send({
      message: `find menu ${error}`
    });
  }
};

var _default = {
  findAllRows,
  findRowById,
  createRow,
  updateRow,
  deleteRow,
  findout,
  findOne,
  updateProduct
};
exports.default = _default;
//# sourceMappingURL=RestoMenuCtrl.js.map