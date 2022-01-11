"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _formidable = _interopRequireDefault(require("formidable"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uploadDir = process.cwd() + '/storages/';

const uploadSingleFile = async req => {
  const options = {
    multiples: false,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024 // 5MB

  };
  const form = (0, _formidable.default)(options);
  const result = new Promise((resolve, reject) => {
    //config option for formidale
    // onpart untuk override stream sebelum di write ke folder
    form.onPart = function (part) {
      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      } else {
        form._error(new Error('File type is not supported'));
      }
    };

    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`
        });
      }

      if (files.uploadFile.length > 1) {
        return reject({
          status: "error",
          message: "only one file allowed"
        });
      }

      const uploadFile = files.uploadFile.path;
      const seq = _path.default.sep;
      const fileName = uploadFile.substr(uploadFile.lastIndexOf(seq), uploadFile.length).replace(seq, "");
      return resolve({
        attrb: {
          file: files.uploadFile,
          fields: fields,
          filename: fileName
        },
        status: {
          status: "succeed",
          message: ""
        }
      });
    });
  });
  return result;
};

const uploadMultipleFile = async req => {
  const options = {
    multiples: true,
    keepExtensions: true,
    uploadDir: uploadDir,
    maxFileSize: 50 * 1024 * 1024 // 5MB

  };
  const form = (0, _formidable.default)(options);
  const result = new Promise((resolve, reject) => {
    //config option for formidale
    // onpart untuk override stream sebelum di write ke folder
    form.onPart = function (part) {
      if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
        this.handlePart(part);
      } else {
        form._error(new Error('File type is not supported'));
      }
    };

    form.parse(req, (error, fields, files) => {
      if (error) {
        return reject({
          status: "error",
          message: `${error}`
        });
      }

      let listOfFiles = [];

      if (files) {
        let fileAttr = {
          prim_id: 0,
          prim_filename: "",
          prim_filesize: 0,
          prim_filetype: "",
          prim_url: "",
          prim_primary: false
        };
        const seq = _path.default.sep;
        let uploadFile = "";
        let fileName = "";
        files.uploadFile.forEach(v => {
          uploadFile = v.path;
          fileName = uploadFile.substring(uploadFile.lastIndexOf(seq), uploadFile.length).replace(seq, "");
          fileAttr = {
            prim_id: 0,
            prim_filename: fileName,
            prim_filesize: v.size,
            prim_filetype: v.type,
            prim_url: process.env.URL_IMAGE + fileName,
            prim_primary: false
          };
          listOfFiles = [...listOfFiles, fileAttr];
        });
      }

      return resolve({
        files: listOfFiles,
        fields: fields,
        status: {
          status: "succeed",
          message: ""
        }
      });
    });
  });
  return result;
};

const showProductImage = async (req, res) => {
  const filename = req.params.filename;
  const url = `${process.cwd()}/${process.env.UPLOAD_DIR}/${filename}`;

  _fs.default.createReadStream(url).on("error", () => responseNotFound(req, res)).pipe(res);
};

function responseNotFound(req, res) {
  res.writeHead(404, {
    "Content-Type": "text/plain"
  });
  res.end("Not Found");
}

var _default = {
  uploadSingleFile,
  showProductImage,
  uploadMultipleFile
};
exports.default = _default;
//# sourceMappingURL=UpDonwloadHelper.js.map