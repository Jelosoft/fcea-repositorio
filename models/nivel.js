"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database");

var _usuario = _interopRequireDefault(require("./usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Nivel = _database.sequelize.define('nivel', {
  idNivel: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  nivel: {
    type: _sequelize["default"].CHAR
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'nivel'
});

Nivel.hasMany(_usuario["default"], {
  foreignKey: 'idNivel',
  sourceKey: 'idNivel'
});

_usuario["default"].belongsTo(Nivel, {
  foreignKey: 'idNivel',
  sourceKey: 'idNivel'
});

var _default = Nivel;
exports["default"] = _default;