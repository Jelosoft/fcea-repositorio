"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSede = getSede;
exports.saveSede = saveSede;
exports.editSede = editSede;
exports.deleteSede = deleteSede;

var _sede = _interopRequireDefault(require("../models/sede"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _require = require('../config/mainErrors'),
    notify = _require.notify;

function getSede(_x, _x2) {
  return _getSede.apply(this, arguments);
}

function _getSede() {
  _getSede = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var sedes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _sede["default"].findAll();

          case 3:
            sedes = _context.sent;
            res.json(sedes);
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
  return _getSede.apply(this, arguments);
}

function saveSede(_x3, _x4) {
  return _saveSede.apply(this, arguments);
}

function _saveSede() {
  _saveSede = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var sede, newSede;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            sede = req.body.dato.toUpperCase();
            _context2.next = 4;
            return _sede["default"].create({
              sede: sede
            }, {
              fields: ['sede']
            });

          case 4:
            newSede = _context2.sent;

            if (newSede) {
              res.json('Sede registrado satisfactoriamente');
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
  return _saveSede.apply(this, arguments);
}

function editSede(_x5, _x6) {
  return _editSede.apply(this, arguments);
}

function _editSede() {
  _editSede = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var sede, listSede;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            sede = req.body.dato.toUpperCase();
            _context3.next = 4;
            return _sede["default"].findOne({
              attributes: ['idSede', 'sede'],
              where: {
                idSede: req.params._id
              }
            });

          case 4:
            listSede = _context3.sent;

            if (!listSede) {
              _context3.next = 9;
              break;
            }

            _context3.next = 8;
            return listSede.update({
              sede: sede
            });

          case 8:
            res.json('Sede actualizado satisfactoriamente');

          case 9:
            _context3.next = 15;
            break;

          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(501).json({
              err: _context3.t0
            });

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 11]]);
  }));
  return _editSede.apply(this, arguments);
}

function deleteSede(_x7, _x8) {
  return _deleteSede.apply(this, arguments);
}
/*
const sedeCtrl = {};
let error = [];

sedeCtrl.deleteSede = async (req, res) =>{
    error = [];
    const {_id} = req.params;
    mysqlConnection.query(`DELETE FROM sede WHERE idSede = ?;`, [_id],(err, sede, filds) => {
        if(!err){
            res.json('Sede eliminado satisfactoriamente');
        }else{
            if(err.sqlState == '23000'){
                mysqlConnection.query( `UPDATE sede SET estado = 'I' WHERE idSede = ?;`, [_id], async (err, sede, filds) => {
                    if(!err){
                        res.json('Sede anulado satisfactoriamente');
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


module.exports = sedeCtrl;
*/


function _deleteSede() {
  _deleteSede = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var _id, deleterow;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _id = req.params._id;
            _context4.next = 4;
            return _sede["default"].destroy({
              where: {
                idSede: _id
              }
            });

          case 4:
            deleterow = _context4.sent;

            if (deleterow) {
              res.json('Sede eliminado satisfactoriamente');
            }

            _context4.next = 11;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](0);

            if (_context4.t0.parent.code == 23503) {
              res.json('No se puede eliminar la Sede debido a que esta relacionado a otros datos.');
            } else {
              error.push({
                msg: notify(_context4.t0.parent.code)
              });
              res.status(501).json({
                error: error
              });
            }

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 8]]);
  }));
  return _deleteSede.apply(this, arguments);
}