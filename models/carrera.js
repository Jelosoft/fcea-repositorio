"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database");

var _tesis = _interopRequireDefault(require("./tesis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Carrera = _database.sequelize.define('carrera', {
  idCarrera: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  carrera: {
    type: _sequelize["default"].CHAR
  }
}, {
  timestamps: false,
  tableName: 'carrera'
});

Carrera.hasMany(_tesis["default"], {
  foreignKey: 'idCarrera',
  sourceKey: 'idCarrera'
});

_tesis["default"].belongsTo(Carrera, {
  foreignKey: 'idCarrera',
  sourceKey: 'idCarrera'
});

var _default = Carrera;
exports["default"] = _default;