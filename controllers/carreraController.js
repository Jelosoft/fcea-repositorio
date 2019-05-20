"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCarrera = getCarrera;
exports.saveCarrera = saveCarrera;
exports.editCarrera = editCarrera;
exports.deleteCarrera = deleteCarrera;

var _carrera = _interopRequireDefault(require("../models/carrera"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//const { notify } = require('../config/mainErrors');
function getCarrera(_x, _x2) {
  return _getCarrera.apply(this, arguments);
}

function _getCarrera() {
  _getCarrera = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var carreras;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _carrera["default"].findAll();

          case 3:
            carreras = _context.sent;
            res.json(carreras);
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
  return _getCarrera.apply(this, arguments);
}

function saveCarrera(_x3, _x4) {
  return _saveCarrera.apply(this, arguments);
}

function _saveCarrera() {
  _saveCarrera = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var carrera, newCarrera;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            carrera = req.body.dato.toUpperCase();
            _context2.next = 4;
            return _carrera["default"].create({
              carrera: carrera
            }, {
              fields: ['carrera']
            });

          case 4:
            newCarrera = _context2.sent;

            if (newCarrera) {
              res.json('Carrera registrada satisfactoriamente');
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
  return _saveCarrera.apply(this, arguments);
}

function editCarrera(_x5, _x6) {
  return _editCarrera.apply(this, arguments);
}

function _editCarrera() {
  _editCarrera = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var carrera, listCarreras;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            carrera = req.body.dato.toUpperCase();
            _context4.next = 4;
            return _carrera["default"].findAll({
              attributes: ['idCarrera', 'carrera'],
              where: {
                idCarrera: req.params._id
              }
            });

          case 4:
            listCarreras = _context4.sent;

            if (listCarreras.length > 0) {
              listCarreras.forEach(
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3(oneCarrera) {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return oneCarrera.update({
                            carrera: carrera
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
              res.json('Carrera registrada satisfactoriamente');
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
  return _editCarrera.apply(this, arguments);
}

function deleteCarrera(_x7, _x8) {
  return _deleteCarrera.apply(this, arguments);
}
/*
carreraCtrl.deleteCarrera = async (req, res) =>{
    error = [];
    const {_id} = req.params;
    mysqlConnection.query(`DELETE FROM carrera WHERE idCarrera = ?;`, [_id],(err, carrera, filds) => {
        if(!err){
            res.json('Carrera eliminada satisfactoriamente');
        }else{
            if(err.sqlState == '23000'){
                mysqlConnection.query( `UPDATE carrera SET estado = 'I' WHERE idCarrera = ?;`, [_id], async (err, carrera, filds) => {
                    if(!err){
                        res.json('Carrera anulada satisfactoriamente');
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

module.exports = carreraCtrl;

*/


function _deleteCarrera() {
  _deleteCarrera = _asyncToGenerator(
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
            return _carrera["default"].destroy({
              where: {
                idCarrera: _id
              }
            });

          case 4:
            deleterow = _context5.sent;

            if (deleterow) {
              res.json('Carrera eliminada satisfactoriamente');
            }

            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](0);

            if (_context5.t0.parent.code == 23503) {
              res.json('No se puede eliminar la Carrera debido a que esta relacionado a otros datos.');
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
  return _deleteCarrera.apply(this, arguments);
}