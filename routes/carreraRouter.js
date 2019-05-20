"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _helpers = require("../helpers/helpers");

var _carreraController = require("../controllers/carreraController");

var _nivelValidation = require("../tools/nivelValidation");

var router = (0, _express.Router)();
router.get('/views/carreras', _carreraController.getCarrera);
router.post('/carrera/newcarrera', _helpers.verifyToken, _nivelValidation.valDato, _carreraController.saveCarrera);
router.put('/carrera/editcarrera/:_id', _helpers.verifyToken, _nivelValidation.valID, _nivelValidation.valDato, _carreraController.editCarrera);
router["delete"]('/carrera/:_id/delete', _helpers.verifyToken, _nivelValidation.valID, _carreraController.deleteCarrera);
var _default = router;
exports["default"] = _default;