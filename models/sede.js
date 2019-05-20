"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database");

var _tesis = _interopRequireDefault(require("./tesis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Sede = _database.sequelize.define('sede', {
  idSede: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  sede: {
    type: _sequelize["default"].STRING
  }
}, {
  timestamps: false,
  tableName: 'sede'
});
/*
Sede.hasMany(Tesis, {foreignKey: 'idSede', sourceKey : 'idSede'});
Tesis.belongsTo(Sede, {foreignKey: 'idSede', sourceKey : 'idSede'});
*/


var _default = Sede;
exports["default"] = _default;