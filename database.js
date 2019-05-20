"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequelize = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sequelize = new _sequelize["default"]('db3daihbch5j8d', 'xjkyloullwtbfx', '17a6ff252c582b5efecbc1c7d945459f1f4b1b07aa8074915a0a3fae31ccabb9', {
  host: 'ec2-54-83-19-244.compute-1.amazonaws.com',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    require: 30000,
    idle: 10000
  },
  loggin: false
});
exports.sequelize = sequelize;