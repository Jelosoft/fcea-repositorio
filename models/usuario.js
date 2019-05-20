"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database");

var _nivel = _interopRequireDefault(require("./nivel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Usuario = _database.sequelize.define('usuario', {
  idUsuario: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true
  },
  ci: {
    type: _sequelize["default"].INTEGER
  },
  nombre: {
    type: _sequelize["default"].STRING
  },
  apellido: {
    type: _sequelize["default"].STRING
  },
  correo: {
    type: _sequelize["default"].STRING
  },
  idNivel: {
    type: _sequelize["default"].INTEGER
  },
  usuario: {
    type: _sequelize["default"].STRING
  },
  pass: {
    type: _sequelize["default"].STRING
  },
  tipo: {
    type: _sequelize["default"].CHAR
  },
  estado: {
    type: _sequelize["default"].CHAR
  }
}, {
  timestamps: false,
  freezeTableName: true,
  tableName: 'usuario'
});

var _default = Usuario;
exports["default"] = _default;