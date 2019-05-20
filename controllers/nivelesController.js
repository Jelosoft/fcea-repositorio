"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNivel = getNivel;
exports.saveNivel = saveNivel;
exports.editNivel = editNivel;
exports.deleteNivel = deleteNivel;

var _nivel = _interopRequireDefault(require("../models/nivel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../config/mainErrors'),
    notify = _require.notify;

var nivelCtrl = {};
var error = [];

function getNivel(_x, _x2) {
  return _getNivel.apply(this, arguments);
}

function _getNivel() {
  _getNivel = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var niveles;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _nivel["default"].findAll();

          case 3:
            niveles = _context.sent;
            res.json(niveles);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getNivel.apply(this, arguments);
}

function saveNivel(_x3, _x4) {
  return _saveNivel.apply(this, arguments);
}

function _saveNivel() {
  _saveNivel = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var nivel, newNivel;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            nivel = req.body.dato.toUpperCase();
            _context2.next = 4;
            return _nivel["default"].create({
              nivel: nivel
            }, {
              fields: ['nivel']
            });

          case 4:
            newNivel = _context2.sent;

            if (newNivel) {
              res.json('Nivel registrado satisfactoriamente');
            }

            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.status(501).json({
              err: _context2.t0
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _saveNivel.apply(this, arguments);
}

function editNivel(_x5, _x6) {
  return _editNivel.apply(this, arguments);
}

function _editNivel() {
  _editNivel = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var nivel, listNiveles;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            nivel = req.body.dato.toUpperCase();
            _context4.next = 4;
            return _nivel["default"].findAll({
              attributes: ['idNivel', 'nivel'],
              where: {
                idNivel: req.params._id
              }
            });

          case 4:
            listNiveles = _context4.sent;

            if (listNiveles.length > 0) {
              console.log('entrooo');
              listNiveles.forEach(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3(oneNivel) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return oneNivel.update({
                            nivel: nivel
                          });

                        case 2:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x9) {
                  return _ref.apply(this, arguments);
                };
              }());
              res.json('El nivel fue actualizado satisfactoriamente');
            }

            _context4.next = 12;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);
            res.status(501).json({
              err: _context4.t0
            });

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return _editNivel.apply(this, arguments);
}

function deleteNivel(_x7, _x8) {
  return _deleteNivel.apply(this, arguments);
}
/*
nivelCtrl.getNivel = async (req, res) => {
    mysqlConnection.query(`SELECT idNivel, nivel FROM nivel WHERE estado = 'A';`, (err, niveles, fields) => {
        if(!err){
            res.json(niveles);
        }else{
            console.log(err);
        }
    });
};


nivelCtrl.newNivel = async (req, res) =>{
    error = [];
    const nivel = req.body.dato.toUpperCase();
    const id = 0;
    mysqlConnection.query(`CALL nivelAddOrEdit( ?, ?);`, [id, nivel],(err, niveles, fields) => {
        if(!err){
            res.json('Nivel registrado satisfactoriamente');
        }else{
            console.log(err);
            res.status(501).json({err});
        }
    });
};

nivelCtrl.editNivel= async (req, res) =>{
    error = [];
    const nivel = req.body.dato.toUpperCase();
    mysqlConnection.query(`CALL nivelAddOrEdit( ?, ?);`, [req.params._id, nivel],(err, niveles, fields) => {
        if(!err){
            res.json('El nivel fue actualizado satisfactoriamente');
        }else{
            console.log(err);
            res.status(501).json({err});
        }
    });
};

nivelCtrl.deleteNivel = async (req, res) =>{
    error = [];
    const {_id} = req.params;
    mysqlConnection.query(`DELETE FROM nivel WHERE idNivel = ?;`, [_id],(err, nivel, filds) => {
        if(!err){
            res.json('Nivel eliminado satisfactoriamente');
        }else{
            if(err.sqlState == '23000'){
                mysqlConnection.query( `UPDATE nivel SET estado = 'I' WHERE idNivel = ?;`, [_id], async (err, nivel, filds) => {
                    if(!err){
                        res.json('Nivel anulado satisfactoriamente');
                    }else{
                        res.status(501).json({err});
                    }
                });
            }else{
                res.status(501).json({err});
            }
        }
    });
};


module.exports = nivelCtrl;
*/


function _deleteNivel() {
  _deleteNivel = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var _id, deleterow;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _id = req.params._id;
            _context5.next = 4;
            return _nivel["default"].destroy({
              where: {
                idNivel: _id
              }
            });

          case 4:
            deleterow = _context5.sent;

            if (deleterow) {
              res.json('Nivel eliminado satisfactoriamente');
            }

            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);

            if (_context5.t0.parent.code == 23503) {
              res.json('No se puede eliminar el Nivel debido a que esta relacionado a otros datos.');
            } else {
              error.push({
                msg: notify(_context5.t0.parent.code)
              });
              res.status(501).json({
                error: error
              });
            }

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 8]]);
  }));
  return _deleteNivel.apply(this, arguments);
}