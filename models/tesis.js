"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = require("../database");

var _ranking = _interopRequireDefault(require("./ranking"));

var _carrera = _interopRequireDefault(require("./carrera"));

var _nivel = _interopRequireDefault(require("./nivel"));

var _sede = _interopRequireDefault(require("./sede"));

var _usuario = _interopRequireDefault(require("./usuario"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Tesis = _database.sequelize.define('tesis', {
  idTesis: {
    type: _sequelize["default"].INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: _sequelize["default"].TEXT
  },
  autor: {
    type: _sequelize["default"].STRING(500)
  },
  linea: {
    type: _sequelize["default"].STRING
  },
  publicado: {
    type: _sequelize["default"].DATE
  },
  descripcion: {
    type: _sequelize["default"].TEXT
  },
  palclave: {
    type: _sequelize["default"].STRING
  },
  idNivel: {
    type: _sequelize["default"].INTEGER
  },
  idCarrera: {
    type: _sequelize["default"].INTEGER
  },
  idSede: {
    type: _sequelize["default"].INTEGER
  },
  isbn: {
    type: _sequelize["default"].STRING
  },
  doi: {
    type: _sequelize["default"].STRING
  },
  descargado: {
    type: _sequelize["default"].INTEGER
  },
  filename: {
    type: _sequelize["default"].STRING
  },
  originalname: {
    type: _sequelize["default"].STRING
  },
  creado: {
    type: _sequelize["default"].DATE
  },
  idUsuario: {
    type: _sequelize["default"].INTEGER
  },
  modificado: {
    type: _sequelize["default"].DATE
  }
}, {
  timestamps: false,
  tableName: 'tesis'
}); //Clves Foraneas


_nivel["default"].hasMany(Tesis, {
  foreignKey: 'idNivel',
  sourceKey: 'idNivel'
});

Tesis.belongsTo(_nivel["default"], {
  foreignKey: 'idNivel',
  sourceKey: 'idNivel'
});

_sede["default"].hasMany(Tesis, {
  foreignKey: 'idSede',
  sourceKey: 'idSede'
});

Tesis.belongsTo(_sede["default"], {
  foreignKey: 'idSede',
  sourceKey: 'idSede'
});
Tesis.hasMany(_ranking["default"], {
  foreignKey: 'idTesis',
  sourceKey: 'idTesis'
});

_ranking["default"].belongsTo(Tesis, {
  foreignKey: 'idTesis',
  sourceKey: 'idTesis'
});
/*
Carrera.hasMany(Tesis, {foreignKey: 'idCarrera', sourceKey : 'idCarrera'});
Tesis.belongsTo(Carrera, {foreignKey: 'idCarrera', sourceKey : 'idCarrera'});
*/
//Una tesis puede tener una sola carrera...
//Tesis.belongsTo(Usuario, {foreingKey: 'idusuario', sourceKey: 'idusuario'});
//Tesis.belongsTo(Carrera, {foreingKey: 'idcarrera', sourceKey: 'idcarrera'});
//Tesis.belongsTo(Nivel, {foreingKey: 'idnivel', sourceKey: 'idnivel'});
//Tesis.belongsTo(Sede, {foreingKey: 'idsede', sourceKey: 'idsede'});
//Tesis.belongsTo(Ranking, {foreingKey: 'idtesis', sourceKey: 'idtesis'});


var _default = Tesis;
exports["default"] = _default;