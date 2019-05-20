"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database");

var _tesis = _interopRequireDefault(require("./tesis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Ranking = _database.sequelize.define('ranking', {
  idRanking: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pais: {
    type: _sequelize["default"].STRING
  },
  ciudad: {
    type: _sequelize["default"].STRING
  },
  idTesis: {
    type: _sequelize["default"].INTEGER
  },
  estado: {
    type: _sequelize["default"].CHAR
  }
}, {
  timestamps: false,
  tableName: 'ranking'
}); //Clves Foraneas


var _default = Ranking;
exports["default"] = _default;