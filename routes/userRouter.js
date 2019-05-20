"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _helpers = require("../helpers/helpers");

var _usuarioController = require("../controllers/usuarioController");

var _userValidation = require("../tools/userValidation");

var router = (0, _express.Router)();
router.get('/users/viewuser', _helpers.verifyToken, _usuarioController.getUser);
router.post('/users/login', _usuarioController.singInUser);
router.post('/users/signup', _helpers.verifyToken, _userValidation.valUser, _usuarioController.saveUser);
router.put('/users/updatepass/:id', _helpers.verifyToken, _userValidation.valID, _userValidation.valPass, _usuarioController.editPass);
router.put('/users/updateuser/:id', _helpers.verifyToken, _userValidation.valID, _userValidation.valUsuario, _usuarioController.editUser);
router["delete"]('/users/:id/deleteuser', _helpers.verifyToken, _userValidation.valID, _usuarioController.deleteUser);
var _default = router;
exports["default"] = _default;