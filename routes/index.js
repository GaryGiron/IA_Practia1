var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

//connecting to db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/privado',{useNewUrlParser: true}).then(()=>{
    console.log('conexion exitosa a bd');

}).catch(err=>console.log(err));

const Stud = require('../models/students');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ingreso de Datos - IA' });
});

router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Buscar Esudiante' });
});

router.get('/group', function(req, res, next) {
  res.render('group', { title: 'Buscar Esudiante por Grupo' });
});

router.post('/new_student', (req, res, next) => {
  console.log(req.body);  

  //if (req.body._id === "") {
    let per = new Stud({
      nombre: req.body.nombre,
      carnet: req.body.carnet,
      dpi: req.body.dpi,
      semestre: req.body.semestre,
      anio:req.body.anio,
      grupo: req.body.grupo,
      correo: req.body.correo
    });
    
    per.save().then(() => console.log('creado correctamente'));;
  //} else {    
    //console.log(req.body._id);
    //Stud.findByIdAndUpdate(req.body._id, { $set: req.body }, { new: true }, (err, model) => {
    //  if (err) throw err;
    //});
  //}
  res.redirect('/');
});

router.post('/busca/student', async (req, res, next) =>{
  console.log(req.body)
  const query = await Stud.
  find({
    carnet: req.body.carne,
    semestre: req.body.semestre,
    anio: req.body.anio
  });
  console.log(query);
  res.render('lista', { title: 'Estudiantes Encontrados', estudiantes: query});
});

router.post('/busca/grupo', async (req, res, next) =>{
  console.log(req.body)
  const query = await Stud.
  find({
    grupo: req.body.grupo
  });
  console.log(query);
  res.render('lista', { title: 'Estudiantes Encontrados Pertenecientes al grupo '+req.body.grupo, estudiantes: query});
});


module.exports = router;
