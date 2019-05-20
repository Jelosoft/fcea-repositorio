"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valID = valID;
exports.valUpload = valUpload;
var error = [];

function valID(req, res, next) {
  error = [];
  req.checkParams('id', 'ID recibido no válido').isNumeric({
    no_symbols: true
  });
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      var errors = result.array();

      if (errors.length != 0) {
        errors.forEach(function (err) {
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

function valUpload(req, res, next) {
  error = [];
  req.checkBody('titulo').isLength({
    min: 5
  }).withMessage('Palabra muy corta para un título, al memos 5 caracteres');
  req.checkBody('autor').isLength({
    min: 5
  }).withMessage('El nombre es muy corto para un autor, use al memos 5 caracteres');
  req.checkBody('linea').isLength({
    min: 5
  }).withMessage('Linea de Investigación corta, use al memos 5 caracteres');
  req.checkBody('descripcion').isLength({
    min: 50
  }).withMessage('La descripción es muy breve, use al memos 50 caracteres');
  req.checkBody('palClave').isLength({
    min: 5
  }).withMessage('Palabras Claves muy breve, use al memos 5 caracteres');
  req.checkBody('idcarrera').isNumeric({
    no_symbols: true
  }).withMessage('Identifique a que carrera pertenece el registro');
  req.checkBody('idnivel').isNumeric({
    no_symbols: true
  }).withMessage('Identifique el nivel al que pertenece el autor');
  req.getValidationResult().then(function (result) {
    if (!result.isEmpty()) {
      var errors = result.array();

      if (errors.length != 0) {
        errors.forEach(function (err) {
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