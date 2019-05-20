"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valID = valID;
exports.valDato = valDato;
var error = [];

function valID(req, res, next) {
  errors = [];
  console.log(req.params);
  req.checkParams('_id', 'ID recibido no válido').isNumeric({
    no_symbols: true
  });
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      var _errors = result.array();

      if (_errors.length != 0) {
        _errors.forEach(function (err) {
          error.push({
            msg: err.msg
          });
        });
      }

      res.status(409).json({
        error: error
      });
      return;
    }

    next();
  });
}

function valDato(req, res, next) {
  error = [];
  req.checkBody('dato').isLength({
    min: 5
  }).withMessage('Debe tener al menos 5 caracteres de largo');
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      var _errors2 = result.array();

      if (_errors2.length != 0) {
        _errors2.forEach(function (err) {
          error.push({
            msg: err.msg
          });
        });
      }

      res.status(501).json({
        error: error
      });
    }

    next();
  });
}