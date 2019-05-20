"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _helpers = require("../helpers/helpers");

var _repositorioController = require("../controllers/repositorioController");

var _repositorioValidation = require("../tools/repositorioValidation");

var router = (0, _express.Router)();
router.get('/uploads', _repositorioController.getArchivos);
router.post('/uploads', _helpers.verifyToken, _repositorioValidation.valUpload, _repositorioController.saveArchivo);
router.get('/uploads/:id', _repositorioValidation.valID, _repositorioController.getArchivo);
router.put('/uploads/:id', _helpers.verifyToken, _repositorioValidation.valID, _repositorioValidation.valUpload, _repositorioController.editArchivo);
router.get('/repository/dowloand/:id&:filename', _repositorioValidation.valID, _repositorioController.dowloandArchivo);
router["delete"]('/uploads/:id', _helpers.verifyToken, _repositorioValidation.valID, _repositorioController.deleteArchivo);
var _default = router;
exports["default"] = _default;