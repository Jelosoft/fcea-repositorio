"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _sedeController = require("../controllers/sedeController");

var _helpers = require("../helpers/helpers");

var _nivelValidation = require("../tools/nivelValidation");

var router = (0, _express.Router)();
router.get('/views/sedes', _sedeController.getSede);
router.post('/sede/newsede', _helpers.verifyToken, _nivelValidation.valDato, _sedeController.saveSede); ///

router.put('/sede/editsede/:_id', _helpers.verifyToken, _nivelValidation.valID, _nivelValidation.valDato, _sedeController.editSede);
router["delete"]('/sede/:_id/delete', _helpers.verifyToken, _nivelValidation.valID, _sedeController.deleteSede);
var _default = router;
exports["default"] = _default;