"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singInUser = singInUser;
exports.getUser = getUser;
exports.saveUser = saveUser;
exports.editUser = editUser;
exports.editPass = editPass;
exports.deleteUser = deleteUser;

var _usuario = _interopRequireDefault(require("../models/usuario"));

var _nivel = _interopRequireDefault(require("../models/nivel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var bcrypt = require('bcryptjs');

var _require = require('../models/Encrypt'),
    encryptPassword = _require.encryptPassword,
    matchPassword = _require.matchPassword;

var jwt = require('jsonwebtoken');

var SERCRET_KEY = 'myAppSecret';

var _require2 = require('../config/mainErrors'),
    notify = _require2.notify; //const userCtrl = {};


var error = [];

function singInUser(_x, _x2) {
  return _singInUser.apply(this, arguments);
}

function _singInUser() {
  _singInUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var userData, user, resultPassword, expireIn, accessToken, usuario, dataUser;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            error = [];
            userData = {
              usuario: req.body.usuario,
              password: req.body.password
            };
            _context.next = 5;
            return _usuario["default"].findOne({
              include: [{
                model: _nivel["default"],
                required: true
              }],
              where: {
                usuario: userData.usuario,
                estado: 'A'
              }
            });

          case 5:
            user = _context.sent;

            if (!user) {
              _context.next = 22;
              break;
            }

            _context.next = 9;
            return matchPassword(userData.password, user.dataValues.pass);

          case 9:
            resultPassword = _context.sent;

            if (!resultPassword) {
              _context.next = 18;
              break;
            }

            //Generar Token
            expireIn = 24 * 60 * 60;
            accessToken = jwt.sign({
              id: user.dataValues.id
            }, SERCRET_KEY, {
              expiresIn: expireIn
            });
            usuario = {
              _id: user.dataValues.idUsuario,
              ci: user.dataValues.ci,
              nombre: user.dataValues.nombre,
              apellido: user.dataValues.apellido,
              correo: user.dataValues.correo,
              idnivel: user.dataValues.idNivel,
              nivel: user.dataValues.nivel.nivel,
              usuario: user.dataValues.usuario
            };
            dataUser = {
              usuario: usuario,
              accessToken: accessToken,
              expireIn: expireIn
            };
            return _context.abrupt("return", res.json({
              dataUser: dataUser
            }));

          case 18:
            error.push({
              msg: 'Usuario y/o contraseña Incorrecta'
            });
            res.status(501).json({
              error: error
            });

          case 20:
            _context.next = 24;
            break;

          case 22:
            error.push({
              msg: 'Usuario y/o contraseña Incorrecta'
            });
            res.status(501).json({
              error: error
            });

          case 24:
            _context.next = 30;
            break;

          case 26:
            _context.prev = 26;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(501).json({
              err: _context.t0
            });

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 26]]);
  }));
  return _singInUser.apply(this, arguments);
}

function getUser(_x3, _x4) {
  return _getUser.apply(this, arguments);
}

function _getUser() {
  _getUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var Users;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _usuario["default"].findAll({
              include: [{
                model: _nivel["default"],
                required: true
              }]
            });

          case 3:
            Users = _context2.sent;
            console.log(Users);
            res.json(Users);
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _getUser.apply(this, arguments);
}

function saveUser(_x5, _x6) {
  return _saveUser.apply(this, arguments);
}

function _saveUser() {
  _saveUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var _req$body, ci, correo, usuario, password1, password2, idnivel, nombre, apellido, idNivel, pass, newUser;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            error = [];
            _req$body = req.body, ci = _req$body.ci, correo = _req$body.correo, usuario = _req$body.usuario, password1 = _req$body.password1, password2 = _req$body.password2, idnivel = _req$body.idnivel;
            nombre = req.body.nombre.toUpperCase();
            apellido = req.body.apellido.toUpperCase();
            if (password1 !== password2) error.push({
              msg: 'Las contraseñas no coinciden'
            });

            if (!(error.length > 0)) {
              _context3.next = 10;
              break;
            }

            res.status(409).json({
              error: error
            });
            _context3.next = 20;
            break;

          case 10:
            idNivel = idnivel;
            _context3.next = 13;
            return encryptPassword(password1);

          case 13:
            pass = _context3.sent;
            console.log(req.body);
            console.log(pass);
            _context3.next = 18;
            return _usuario["default"].create({
              ci: ci,
              nombre: nombre,
              apellido: apellido,
              correo: correo,
              idNivel: idNivel,
              usuario: usuario,
              pass: pass
            }, {
              fields: ['ci', 'nombre', 'apellido', 'correo', 'idNivel', 'usuario', 'pass']
            });

          case 18:
            newUser = _context3.sent;

            if (newUser) {
              res.json('Usuario Registrado satisfactoriamente.');
            }

          case 20:
            _context3.next = 25;
            break;

          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 22]]);
  }));
  return _saveUser.apply(this, arguments);
}

function editUser(_x7, _x8) {
  return _editUser.apply(this, arguments);
}

function _editUser() {
  _editUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body2, ci, correo, usuario, nombre, apellido, idNivel, listUser;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            error = [];
            _req$body2 = req.body, ci = _req$body2.ci, correo = _req$body2.correo, usuario = _req$body2.usuario;
            nombre = req.body.nombre.toUpperCase();
            apellido = req.body.apellido.toUpperCase();
            idNivel = req.body.idnivel;
            _context4.next = 8;
            return _usuario["default"].findOne({
              attributes: ['idUsuario', 'ci', 'nombre', 'apellido', 'correo', 'usuario', 'idNivel'],
              where: {
                idUsuario: req.params.id
              }
            });

          case 8:
            listUser = _context4.sent;
            _context4.next = 11;
            return listUser.update({
              ci: ci,
              nombre: nombre,
              apellido: apellido,
              correo: correo,
              usuario: usuario,
              idNivel: idNivel
            });

          case 11:
            res.json('El usuario fue actualizado satisfactoriamente');
            _context4.next = 17;
            break;

          case 14:
            _context4.prev = 14;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 14]]);
  }));
  return _editUser.apply(this, arguments);
}

function editPass(_x9, _x10) {
  return _editPass.apply(this, arguments);
}

function _editPass() {
  _editPass = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _error, id, _req$body3, passwordA, password1, password2, pass, listUser;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _error = [];
            id = req.params.id;
            _req$body3 = req.body, passwordA = _req$body3.passwordA, password1 = _req$body3.password1, password2 = _req$body3.password2;
            if (password1 !== password2) _error.push({
              msg: 'Las contraseñas no coinciden'
            });

            if (!(_error.length > 0)) {
              _context5.next = 9;
              break;
            }

            res.status(409).json({
              error: _error
            });
            _context5.next = 18;
            break;

          case 9:
            _context5.next = 11;
            return encryptPassword(password1);

          case 11:
            pass = _context5.sent;
            _context5.next = 14;
            return _usuario["default"].findOne({
              attributes: ['idUsuario', 'pass'],
              where: {
                idUsuario: id
              }
            });

          case 14:
            listUser = _context5.sent;
            _context5.next = 17;
            return listUser.update({
              pass: pass
            });

          case 17:
            res.json('Contraseña actualizada satisfactoriamente');

          case 18:
            _context5.next = 23;
            break;

          case 20:
            _context5.prev = 20;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 23:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 20]]);
  }));
  return _editPass.apply(this, arguments);
}

function deleteUser(_x11, _x12) {
  return _deleteUser.apply(this, arguments);
}
/*

userCtrl.newUser = async (req, res) => {
    error = [];
    const {ci, correo, usuario, password1, password2, idnivel} = req.body;
    const nombre = req.body.nombre.toUpperCase();
    const apellido = req.body.apellido.toUpperCase();
    const id = 0;

    if(password1 !== password2) error.push({msg: 'Las contraseñas no coinciden'});
    if(error.length > 0){
        res.status(409).json({error});
    }else{
        const password = await encryptPassword(password1);
        mysqlConnection.query(`CALL usuarioAddOrEdit(?,?,?,?,?,?,?,?);`, 
        [id, ci, nombre, apellido, correo, idnivel, usuario, password],(err, usuario, filds) => {
            if(!err){
                return res.json('Usuario Registrado satisfactoriamente.');
            }else{
                if(err.sqlState == '23000'){
                    if(err.sqlMessage.includes('ci')){
                        error.push({msg:'La cédula del usuario ya fue registrado, prueba con otro.'});
                    }else if(err.sqlMessage.includes('correo')){
                        error.push({msg:'El correo ya está registrado, prueba con otro.'});
                    }else if(err.sqlMessage.includes('usuario')){
                        error.push({msg:'El usuario ya está registrado, prueba con otro.'});
                    }
                }else{
                    error.push({msg: notify(err.sqlState)});
                }
                res.status(501).json({error});
            }
        });
    }
};

userCtrl.actualizarUser= async (req, res) =>{
    error = [];
    const {ci, correo, usuario, idnivel} = req.body;
    const nombre = req.body.nombre.toUpperCase();
    const apellido = req.body.apellido.toUpperCase();
    mysqlConnection.query(`CALL usuarioAddOrEdit(?,?,?,?,?,?,?,?);`, 
    [req.params.id, ci, nombre, apellido, correo, idnivel, usuario, 'password'], (err, usuario, filds) => {
        if(!err){
            res.json('El usuario fue actualizado satisfactoriamente');
        }else{
            if(err.sqlState == '23000'){
                if(err.sqlMessage.includes('ci')){
                    error.push({msg:'La cédula del usuario ya fue registrado, prueba con otro.'});
                }else if(err.sqlMessage.includes('correo')){
                    error.push({msg:'El correo ya está registrado, prueba con otro.'});
                }else if(err.sqlMessage.includes('usuario')){
                    error.push({msg:'El usuario ya está registrado, prueba con otro.'});
                }
            }else{
                error.push({msg: notify(err.sqlState)});
            }
            res.status(501).json({error});
        }
    });
};

userCtrl.updatePass= (req, res) =>{
    console.log(req.body);
    let error = [];
    const id = req.params.id;
    const {passwordA, password1, password2} = req.body;
    if(password1 !== password2) error.push({msg:'Las contraseñas no coinciden'});
    if(error.length > 0){
        res.status(409).json({error});
    }else{
        mysqlConnection.query(`SELECT password FROM usuario WHERE idusuario = ?;`, [id], async (err, usuario, filds) => {
            if(!err){
                const resultPassword = await matchPassword(passwordA, usuario[0].password);
                if(resultPassword){
                    const password = await encryptPassword(password1);
                    mysqlConnection.query(`UPDATE usuario SET password = ? WHERE idusuario = ?;`, [password,id],(erro, user) => {
                        if(!erro){
                            res.json('Contraseña actualizada satisfactoriamente');
                        }else{
                            error.push({msg: notify(erro.sqlState)});
                            res.status(501).json({error});
                        }
                    });
                }else{
                    res.json('Contraseña incorrecta');
                }  
            }else{
                error.push({msg: notify(err.sqlState)});
                res.status(501).json({error});
            }
        });
    }
};

userCtrl.deleteUser = async (req, res) =>{
    error = [];
    const {id} = req.params;
    mysqlConnection.query(`DELETE FROM usuario WHERE idusuario = ?;`, [id],(err, usuario, filds) => {
        if(!err){
            res.json('Usuario Eliminado Satisfactoriamente');
        }else{
            res.status(500).json({error});
        }
    });
};

module.exports = userCtrl;
*/


function _deleteUser() {
  _deleteUser = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var id, deleterow;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            error = [];
            id = req.params.id;
            _context6.next = 5;
            return _usuario["default"].destroy({
              where: {
                idUsuario: id
              }
            });

          case 5:
            deleterow = _context6.sent;

            if (deleterow) {
              res.json('Usuario Eliminado Satisfactoriamente');
            }

            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);

            if (_context6.t0.parent.code == 23503) {
              res.json('No se puede eliminar al Usuario debido a que esta relacionado a otros datos.');
            } else {
              error.push({
                msg: notify(_context6.t0.parent.code)
              });
              res.status(501).json({
                error: error
              });
            }

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return _deleteUser.apply(this, arguments);
}