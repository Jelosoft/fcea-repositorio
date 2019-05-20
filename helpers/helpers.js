"use strict";

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

var SERCRET_KEY = 'myAppSecret';
var error = [];
var helpers = {};
var decodedToken = '';

helpers.verifyToken = function (req, res, next) {
  error = [];
  var token = req.query.token;
  jwt.verify(token, SERCRET_KEY, function (err, tokenData) {
    if (err) {
      console.log(err);

      if (err.name.includes('TokenExpiredError')) {
        error.push({
          msg: 'La conexión ha expirado.'
        });
      } else {
        error.push({
          msg: 'No esta autorizado'
        });
      }

      res.status(400).json({
        error: error
      });
    } else if (tokenData) {
      decodedToken = tokenData;
      next();
    }
  });
};

module.exports = helpers;