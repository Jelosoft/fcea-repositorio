"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _multer = _interopRequireDefault(require("multer"));

var _V = _interopRequireDefault(require("uuid/V4"));

var _cors = _interopRequireDefault(require("cors"));

var _expressValidator = _interopRequireDefault(require("express-validator"));

var _carreraRouter = _interopRequireDefault(require("./routes/carreraRouter"));

var _nivelesRouter = _interopRequireDefault(require("./routes/nivelesRouter"));

var _repositorioRouter = _interopRequireDefault(require("./routes/repositorioRouter"));

var _sedeRouter = _interopRequireDefault(require("./routes/sedeRouter"));

var _userRouter = _interopRequireDefault(require("./routes/userRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var Frontend = 'http://localhost:4200';

var path = require('path'); //Importing Routes


//Inicialización
var app = (0, _express["default"])(); //MIDDLEWARES

app.use((0, _morgan["default"])('dev'));
app.use((0, _express.json)());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use((0, _cors["default"])({
  origin: Frontend
}));
app.use((0, _expressValidator["default"])());

var storage = _multer["default"].diskStorage({
  destination: path.join(__dirname, 'public/pdf/uploads'),
  filename: function filename(req, file, cb, _filename) {
    cb(null, (0, _V["default"])() + path.extname(file.originalname).toLocaleLowerCase());
  }
});

app.use((0, _multer["default"])({
  storage: storage,
  limits: {
    fileSize: 10000000
  },
  //limite del tamaño del archivo a suber en bits
  fileFilter: function fileFilter(req, file, cb) {
    var filetypes = /pdf/; //la extension que soporta

    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname));

    if (mimetype && extname) {
      return cb(null, true);
    }

    cb('ERROR : Tipo de Archivo no soportado');
  }
}).single('tesispdf')); //Routes

var ruta = '/api/repositorio';
app.use(ruta, _carreraRouter["default"]);
app.use(ruta, _nivelesRouter["default"]);
app.use(ruta, _repositorioRouter["default"]);
app.use(ruta, _sedeRouter["default"]);
app.use(ruta, _userRouter["default"]); //Static Files

app.use(_express["default"]["static"](path.join(__dirname, 'public')));
var _default = app;
exports["default"] = _default;