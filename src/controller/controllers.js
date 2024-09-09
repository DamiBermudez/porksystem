const express = require('express');
const router = express.Router();
const customController= require('../model/models');

// páginas iniciales
router.get('/index',customController.index);
router.get('/alimentacion',customController.alimentacion);
router.get('/ceba',customController.ceba);
router.get('/cliente',customController.cliente);
router.get('/mortalidad',customController.mortalidad);
router.get('/vacunacion', customController.vacunacion);
router.get('/consultar_alimentacion',customController.consultar_alimentacion);
router.get('/consultar_ceba',customController.consultar_ceba);
router.get('/consultar_vacunacion',customController.consultar_vacunacion);
router.get('/consultar_mortalidad',customController.consultar_mortalidad);
router.get('/registrar_alimentacion', customController.registrar_alimentacion);
router.get('/registrar_ceba',customController.registrar_ceba);
router.get('/registrar_vacunacion',customController.registrar_vacunacion);
router.get('/registrar_mortalidad',customController.registrar_mortalidad);



// Ruta para manejar la consulta por rango de fechas
router.get('/consultar_alimentacion/fechas', customController.consultaAlimentacionFechas);
router.get('/consultar_ceba/fechas',customController.consultaCebaFechas);
router.get('/consultar_vacunacion/fechas',customController.consultaVacunacionFechas);
router.get('/consultar_mortalidad/fechas',customController.consultaMortalidadFechas);
// Ruta para manejar la consulta por número de lote
router.get('/consultar_alimentacion/lote', customController.consultaAlimentacionLote);
router.get('/consultar_ceba/lote',customController.consultaCebaLote);
router.get('/consultar_vacunacion/lote',customController.consultaVacunacionLote);
router.get('/consultar_mortalidad/lote',customController.consultaMortalidadLote);
//Ruta para insertar
router.post('/registrar_alimentacion/insertar', customController.insertar_alimentacion);
router.post('/registrar_ceba/insertar',customController.insertar_ceba);
router.post('/registrar_vacunacion/insertar',customController.insertar_vacunacion);
router.post('/registrar_mortalidad/insertar',customController.insertar_mortalidad);

module.exports = router;