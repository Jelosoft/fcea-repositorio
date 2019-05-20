"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notify = notify;

function notify(code) {
  //Errores del sequelize
  switch (code) {
    case '23000':
      return 'Campo duplicado';

    case '23503':
      return 'No se puede eliminar debido a una relación existente.';

    default:
      return 'Server error';
  }
}