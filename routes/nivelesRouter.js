"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _nivelesController = require("../controllers/nivelesController");

var _helpers = require("../helpers/helpers");

var _nivelValidation = require("../tools/nivelValidation");

var router = (0, _express.Router)();
router.get('/views/niveles', _nivelesController.getNivel);
router.post('/nivel/newnivel', _helpers.verifyToken, _nivelValidation.valDato, _nivelesController.saveNivel);
router.put('/nivel/editnivel/:_id', _helpers.verifyToken, _nivelValidation.valID, _nivelValidation.valDato, _nivelesController.editNivel);
router["delete"]('/nivel/:_id/delete', _helpers.verifyToken, _nivelValidation.valID, _nivelesController.deleteNivel);
var _default = router;
exports["default"] = _default;