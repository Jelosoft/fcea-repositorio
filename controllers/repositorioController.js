"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getArchivos = getArchivos;
exports.getArchivo = getArchivo;
exports.saveArchivo = saveArchivo;
exports.editArchivo = editArchivo;
exports.dowloandArchivo = dowloandArchivo;
exports.deleteArchivo = deleteArchivo;

var _tesis = _interopRequireDefault(require("../models/tesis"));

var _ranking = _interopRequireDefault(require("../models/ranking"));

var _mainErrors = require("../config/mainErrors");

var _path = _interopRequireDefault(require("path"));

var _carrera = _interopRequireDefault(require("../models/carrera"));

var _nivel = _interopRequireDefault(require("../models/nivel"));

var _sede = _interopRequireDefault(require("../models/sede"));

var _database = require("../database");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var geoip = require('geoip-lite'); //const {PaisNombre} = require('../tools/paisPorCodigo');


//Variables
var error = [];

function getArchivos(_x, _x2) {
  return _getArchivos.apply(this, arguments);
}

function _getArchivos() {
  _getArchivos = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var tesis;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _tesis["default"].findAll();

          case 3:
            tesis = _context.sent;
            res.json(tesis);
            _context.next = 11;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(501).json({
              err: _context.t0
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getArchivos.apply(this, arguments);
}

function getArchivo(_x3, _x4) {
  return _getArchivo.apply(this, arguments);
}

function _getArchivo() {
  _getArchivo = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    var id, tesi, rankingCity, ranking, dataFile;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            id = req.params.id;
            _context2.next = 4;
            return _tesis["default"].findOne({
              include: [{
                model: _sede["default"],
                required: true
              }, {
                model: _nivel["default"],
                required: true
              }, {
                model: _carrera["default"],
                required: true
              }],
              where: {
                idTesis: id,
                estado: 'A'
              }
            });

          case 4:
            tesi = _context2.sent;
            _context2.next = 7;
            return _ranking["default"].findAll({
              attributes: ['ciudad', [_database.sequelize.fn('COUNT', 'ciudad'), 'total']],
              group: ['ciudad'],
              where: {
                'idTesis': id
              }
            });

          case 7:
            rankingCity = _context2.sent;
            _context2.next = 10;
            return _ranking["default"].findAll({
              attributes: ['pais', [_database.sequelize.fn('COUNT', 'pais'), 'total']],
              group: ['pais'],
              where: {
                'idTesis': id
              }
            });

          case 10:
            ranking = _context2.sent;
            dataFile = {
              tesi: tesi,
              ranking: ranking,
              rankingCity: rankingCity
            };
            res.json({
              dataFile: dataFile
            });
            _context2.next = 19;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.status(501).json({
              err: _context2.t0
            });

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 15]]);
  }));
  return _getArchivo.apply(this, arguments);
}

function saveArchivo(_x5, _x6) {
  return _saveArchivo.apply(this, arguments);
}

function _saveArchivo() {
  _saveArchivo = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(req, res) {
    var titulo, autor, linea, descripcion, palclave, _req$body, isbn, doi, idNivel, idCarrera, idSede, idUsuario, _req$file, filename, originalname, newTesi;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            error = [];
            titulo = req.body.titulo.toUpperCase();
            autor = req.body.autor.toUpperCase();
            linea = req.body.linea.toUpperCase();
            descripcion = req.body.descripcion.toUpperCase();
            palclave = req.body.palClave.toUpperCase();
            _req$body = req.body, isbn = _req$body.isbn, doi = _req$body.doi;
            idNivel = req.body.idnivel;
            idCarrera = req.body.idcarrera;
            idSede = req.body.idsede;
            idUsuario = req.body.idusuario;
            _req$file = req.file, filename = _req$file.filename, originalname = _req$file.originalname;
            if (_path["default"].extname(req.file.filename) != '.pdf') error.push({
              msg: 'Formato no soportado'
            });

            if (!(error.length > 0)) {
              _context3.next = 18;
              break;
            }

            res.status(409).json({
              error: error
            });
            _context3.next = 23;
            break;

          case 18:
            console.log(req.body);
            _context3.next = 21;
            return _tesis["default"].create({
              titulo: titulo,
              autor: autor,
              linea: linea,
              palclave: palclave,
              descripcion: descripcion,
              idNivel: idNivel,
              idCarrera: idCarrera,
              idSede: idSede,
              isbn: isbn,
              doi: doi,
              filename: filename,
              originalname: originalname,
              idUsuario: idUsuario
            }, {
              fields: ['titulo', 'autor', 'linea', 'palclave', 'descripcion', 'idNivel', 'idCarrera', 'idSede', 'isbn', 'doi', 'filename', 'originalname', 'idUsuario']
            });

          case 21:
            newTesi = _context3.sent;

            if (newTesi) {
              res.json('Datos Insertados satisfactoriamente');
            }

          case 23:
            _context3.next = 29;
            break;

          case 25:
            _context3.prev = 25;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.status(501).json({
              err: _context3.t0
            });

          case 29:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 25]]);
  }));
  return _saveArchivo.apply(this, arguments);
}

function editArchivo(_x7, _x8) {
  return _editArchivo.apply(this, arguments);
}

function _editArchivo() {
  _editArchivo = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(req, res) {
    var id, titulo, autor, linea, descripcion, palclave, _req$body2, isbn, doi, idNivel, idCarrera, idSede, listTesi;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            error = [];
            id = req.params.id;
            titulo = req.body.titulo.toUpperCase();
            autor = req.body.autor.toUpperCase();
            linea = req.body.linea.toUpperCase();
            descripcion = req.body.descripcion.toUpperCase();
            palclave = req.body.palClave.toUpperCase();
            _req$body2 = req.body, isbn = _req$body2.isbn, doi = _req$body2.doi;
            idNivel = req.body.idnivel;
            idCarrera = req.body.idcarrera;
            idSede = req.body.idsede;
            _context4.next = 14;
            return _tesis["default"].findOne({
              attributes: ['idTesis', 'titulo', 'autor', 'linea', 'palclave', 'descripcion', 'idNivel', 'idCarrera', 'idSede', 'isbn', 'doi'],
              where: {
                idTesis: id
              }
            });

          case 14:
            listTesi = _context4.sent;
            _context4.next = 17;
            return listTesi.update({
              titulo: titulo,
              autor: autor,
              linea: linea,
              palclave: palclave,
              descripcion: descripcion,
              idNivel: idNivel,
              idCarrera: idCarrera,
              idSede: idSede,
              isbn: isbn,
              doi: doi
            });

          case 17:
            res.json('Datos Actualizado satisfactoriamente');
            _context4.next = 25;
            break;

          case 20:
            _context4.prev = 20;
            _context4.t0 = _context4["catch"](0);
            console.log('Hubo un eroorrrrr');
            console.log(_context4.t0);
            res.status(501).json({
              err: _context4.t0
            });

          case 25:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 20]]);
  }));
  return _editArchivo.apply(this, arguments);
}

function dowloandArchivo(_x9, _x10) {
  return _dowloandArchivo.apply(this, arguments);
}

function _dowloandArchivo() {
  _dowloandArchivo = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(req, res) {
    var geo, pais, ciudad, idTesis, newRanking, listTesi, descargado, filePath;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            geo = geoip.lookup('207.97.227.239'); //req.ip

            console.log(geo);

            if (!geo) {
              _context5.next = 22;
              break;
            }

            pais = geo.country;
            ciudad = geo.city;
            idTesis = req.params.id;
            _context5.next = 9;
            return _ranking["default"].create({
              pais: pais,
              ciudad: ciudad,
              idTesis: idTesis
            }, {
              fields: ['pais', 'ciudad', 'idTesis']
            });

          case 9:
            newRanking = _context5.sent;

            if (!newRanking) {
              _context5.next = 20;
              break;
            }

            _context5.next = 13;
            return _tesis["default"].findOne({
              attributes: ['idTesis', 'descargado'],
              where: {
                idTesis: idTesis
              }
            });

          case 13:
            listTesi = _context5.sent;
            descargado = listTesi.dataValues.descargado + 1;

            if (!listTesi) {
              _context5.next = 20;
              break;
            }

            _context5.next = 18;
            return listTesi.update({
              descargado: descargado
            });

          case 18:
            filePath = _path["default"].join(__dirname, '../public/pdf/uploads', '/', req.params.filename);
            res.sendFile(filePath);

          case 20:
            _context5.next = 24;
            break;

          case 22:
            error.push({
              msg: 'Error al obtener la geolocalización'
            });
            res.status(501).json({
              error: error
            });

          case 24:
            _context5.next = 31;
            break;

          case 26:
            _context5.prev = 26;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);
            error.push({
              msg: (0, _mainErrors.notify)(_context5.t0.sqlState)
            });
            res.status(501).json({
              error: error
            });

          case 31:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 26]]);
  }));
  return _dowloandArchivo.apply(this, arguments);
}

function deleteArchivo(_x11, _x12) {
  return _deleteArchivo.apply(this, arguments);
}
/*
repositorioCtrl.getArchivo = async (req, res) => {
        const {id} = req.params;
        const query = `
        SELECT idTesis, titulo, autor, linea, publicado, descripcion, n.nivel, 
        c.carrera, isbn, doi, descargado, filename, originalname, s.sede
        FROM tesis t, carrera c, nivel n, sede s WHERE t.idCarrera = c.idCarrera 
        AND t.idNivel = n.idNivel AND t.idSede = s.idSede AND idTesis = ? AND t.estado = 'A';`;
        mysqlConnection.query( query, [id], (err, tesi, filds) => {
            if(!err){
                tesi = tesi[0];
                mysqlConnection.query( `SELECT pais, COUNT(pais) AS total FROM ranking WHERE idTesis = ? 
                                            GROUP BY pais LIMIT 5;`, [id], (err, ranking, filds) => {
                    if(!err){
                        mysqlConnection.query( `SELECT ciudad, COUNT(ciudad) AS total FROM ranking 
                            WHERE idTesis = ?  GROUP BY ciudad LIMIT 5;`, [id], (err, rankingCity, filds) => {
                            if(!err){
                                //ranking[0]._id = obtenerPaisNombre(ranking._id);
                                /*ranking.forEach(rang => {
                                    rang._id = PaisNombre(rang._id);
                                });*/

/*
const dataFile = {
    tesi,
    ranking,
    rankingCity
}
console.log(dataFile);
res.json({ dataFile });
}else{
error.push({msg: notify(err.sqlState)});
res.status(501).json({error});
}
});
}else{
error.push({msg: notify(err.sqlState)});
res.status(501).json({error});
}
});
}else{
error.push({msg: notify(err.sqlState)});
res.status(501).json({error});
}
});
}
repositorioCtrl.createArchivo = async (req, res) => {
error = [];
const titulo = req.body.titulo.toUpperCase();
const autor = req.body.autor.toUpperCase();
const linea = req.body.linea.toUpperCase();
const descripcion = req.body.descripcion.toUpperCase();
const palClave = req.body.palClave.toUpperCase();
const {isbn,doi, idnivel, idcarrera, idsede, idusuario} = req.body;
const {filename, originalname } = req.file;
if(path.extname(req.file.filename) != '.pdf') error.push({msg : 'Formato no soportado'});
if (error.length > 0) {
res.status(409).json({ error });
}else{
mysqlConnection.query(`CALL archivoAddOrEdit(?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, 
[0, titulo, autor, linea, descripcion, palClave, idnivel, idcarrera, 
isbn, doi, filename, originalname, idsede, idusuario], (err, archivo, filds) => {
if(!err){
res.json('Datos Insertados satisfactoriamente');
}else{
if(err.sqlState == '23000'){
if(err.sqlMessage.includes('isbn')){
error.push({msg:'La ISBN ya fue registrado, verifíquelo.'});
}
}else{
error.push({msg: notify(err.sqlState)});
}
res.status(501).json({error});
}
});
}
}
repositorioCtrl.editArchivo = async (req, res)=>{
error = [];
console.log(req.params);
console.log(req.body);
const {id} = req.params;
const titulo = req.body.titulo.toUpperCase();
const autor = req.body.autor.toUpperCase();
const linea = req.body.linea.toUpperCase();
const descripcion = req.body.descripcion.toUpperCase();
const palClave = req.body.palClave.toUpperCase();
const {isbn,doi, idnivel, idcarrera, idsede, idusuario} = req.body;
mysqlConnection.query(`CALL archivoAddOrEdit(?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, 
[id, titulo, autor, linea, descripcion, palClave, idnivel, idcarrera, 
isbn, doi, 'f', 'o', idsede, idusuario], (err, archivo, filds) => {
if(!err){
res.json('Datos Actualizado satisfactoriamente');
}else{
console.log(err);
if(err.sqlState == '23000'){
if(err.sqlMessage.includes('isbn')){
error.push({msg:'La ISBN ya fue registrado, verifíquelo.'});
}else if(err.sqlMessage.includes('titulo')){
error.push({msg:'El titulo ya está registrado, prueba con otro'});
}
}else{
error.push({msg: notify(err.sqlState)});
}
res.status(501).json({error});
}
});
};
repositorioCtrl.dowloandArchivo = async (req, res)=>{
const query = `CALL  downloadArchivo(?, ?, ?);`;
const geo = geoip.lookup('207.97.227.239');//req.ip
if(geo){
mysqlConnection.query( query, [req.params.id, geo.city, geo.country], (err, download, filds) => {
if(!err){
filePath = path.join(__dirname, '../public/pdf/uploads','/',req.params.filename);
res.sendFile(filePath);
}else{
error.push({msg: notify(err.sqlState)});
res.status(501).json({error});
}
});
}else{
error.push({msg: 'Error al obtener la geolocalización'});
res.status(501).json({error});
}
};
repositorioCtrl.deleteArchivo = (req, res)=>{
const {id} = req.params;
mysqlConnection.query( `UPDATE tesis SET estado = 'I' WHERE idTesis = ?;`, [id], async (err, tesis, fields) => {
if(!err){
res.json('Archivo eliminado satisfactoriamente');
}else{
res.status(501).json({err});
}
});
};
module.exports = repositorioCtrl;
*/


function _deleteArchivo() {
  _deleteArchivo = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(req, res) {
    var id, deleterow;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.prev = 1;
            _context6.next = 4;
            return _tesis["default"].destroy({
              where: {
                idTesis: id
              }
            });

          case 4:
            deleterow = _context6.sent;

            if (deleterow) {
              res.json('Archivo eliminado satisfactoriamente');
            }

            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);

            if (_context6.t0.parent.code == 23503) {
              res.json('No se puede eliminar el archivo debido a que esta relacionado a otros datos.');
            } else {
              error.push({
                msg: (0, _mainErrors.notify)(_context6.t0.parent.code)
              });
              res.status(501).json({
                error: error
              });
            }

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 8]]);
  }));
  return _deleteArchivo.apply(this, arguments);
}