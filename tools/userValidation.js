"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.valID = valID;
exports.valPass = valPass;
exports.valUser = valUser;
exports.valUsuario = valUsuario;
exports.valCI = valCI;
var error = [];

function valID(req, res, next) {
  console.log(req.body);
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

function valPass(req, res, next) {
  req.checkBody('password1').isLength({
    min: 8
  }).withMessage('La nueva contraseña debe tener al menos 8 caracteres');
  req.checkBody('passwordA').isLength({
    min: 8
  }).withMessage('La contraseña actual debe tener al menos 8 caracteres');
  error = [];
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

function valUser(req, res, next) {
  error = [];
  req.checkBody('ci').isNumeric({
    no_symbols: true
  }).withMessage('El C.I. debe ser solo caracter numérico').isLength({
    min: 6
  }).withMessage('El campo C.I. debe ser mayor a 400000');
  req.checkBody('nombre').isLength({
    min: 2
  }).withMessage('Un nombre esta compuesto por al menos 2 letras');
  req.checkBody('apellido').isLength({
    min: 2
  }).withMessage('Un apellido esta compuesto por al menos 2 letras');
  req.checkBody('correo').isEmail().withMessage('Correo Electrónico no válido');
  req.checkBody('idnivel').isNumeric({
    no_symbols: true
  }).withMessage('Seleccione un Nivel');
  req.checkBody('usuario').isLength({
    min: 5
  }).withMessage('El usuario debe contener al menos 5 caracteres');
  req.checkBody('password1').isLength({
    min: 8
  }).withMessage('La contraseña debe tener al menos 8 caracteres');
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

function valUsuario(req, res, next) {
  error = [];
  req.checkBody('ci').isNumeric({
    no_symbols: true
  }).withMessage('El C.I. debe ser solo caracter numérico').isLength({
    min: 6
  }).withMessage('El campo C.I. debe ser mayor a 400000');
  req.checkBody('nombre').isLength({
    min: 2
  }).withMessage('Un nombre esta compuesto por al menos 2 letras');
  req.checkBody('apellido').isLength({
    min: 2
  }).withMessage('Un apellido esta compuesto por al menos 2 letras');
  req.checkBody('correo').isEmail().withMessage('Correo Electrónico no válido');
  req.checkBody('idnivel').isNumeric({
    no_symbols: true
  }).withMessage('Id de nivel no válido');
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

function valCI(req, res, next) {
  error = [];
  req.checkBody('ci').isNumeric({
    no_symbols: true
  }).withMessage('El C.I. debe ser solo caracter numérico').isLength({
    min: 6
  }).withMessage('El campo C.I. debe ser mayor a 400000');
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