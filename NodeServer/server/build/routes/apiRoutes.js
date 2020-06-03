"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController_1 = require("../controllers/apiController");
class ApiRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/login', apiController_1.apiController.login);
        this.router.get('/getCiclos', apiController_1.apiController.getCiclos);
        this.router.post('/crearCiclo', apiController_1.apiController.crearCiclo);
        this.router.post('/eliminarCiclo', apiController_1.apiController.eliminarCiclo);
        this.router.post('/existeAlumno', apiController_1.apiController.existeAlumno);
        this.router.get('/getAlumnos', apiController_1.apiController.getAlumnos);
        this.router.post('/crearAlumno', apiController_1.apiController.crearAlumno);
        this.router.post('/eliminarAlumno', apiController_1.apiController.eliminarAlumno);
        this.router.post('/actualizarAlumno', apiController_1.apiController.actualizarAlumno);
        this.router.post('/existeAspecto', apiController_1.apiController.existeAspecto);
        this.router.get('/getAspectos', apiController_1.apiController.getAspectos);
        this.router.post('/crearAspecto', apiController_1.apiController.crearAspecto);
        this.router.post('/eliminarAspecto', apiController_1.apiController.eliminarAspecto);
        this.router.post('/actualizarAspecto', apiController_1.apiController.actualizarAspecto);
        this.router.post('/existeGrado', apiController_1.apiController.existeGrado);
        this.router.get('/getGrados', apiController_1.apiController.getGrados);
        this.router.post('/crearGrado', apiController_1.apiController.crearGrado);
        this.router.post('/eliminarGrado', apiController_1.apiController.eliminarGrado);
        this.router.post('/actualizarGrado', apiController_1.apiController.actualizarGrado);
        this.router.post('/getSeccionGrado', apiController_1.apiController.getSeccionGrado);
        this.router.post('/crearInscripcion', apiController_1.apiController.crearInscripcion);
        this.router.post('/eliminarInscripcion', apiController_1.apiController.eliminarInscripcion);
        this.router.get('/getSecciones', apiController_1.apiController.getSecciones);
        this.router.post('/existeSeccion', apiController_1.apiController.existeSeccion);
        this.router.post('/crearSeccion', apiController_1.apiController.crearSeccion);
        this.router.post('/eliminarSeccion', apiController_1.apiController.eliminarSeccion);
        this.router.post('/actualizarSeccion', apiController_1.apiController.actualizarSeccion);
        this.router.get('/getPersonal', apiController_1.apiController.getPersonal);
        this.router.post('/crearPersonal', apiController_1.apiController.crearPersonal);
        this.router.post('/eliminarPersonal', apiController_1.apiController.eliminarPersonal);
        this.router.post('/actualizarPersonal', apiController_1.apiController.actualizarPersonal);
        this.router.get('/getEscuelas', apiController_1.apiController.getEscuelas);
        this.router.get('/getTipoPersonal', apiController_1.apiController.getTipoPersonal);
        this.router.get('/getMaterias', apiController_1.apiController.getMaterias);
        this.router.post('/crearMateria', apiController_1.apiController.crearMateria);
        this.router.post('/eliminarMateria', apiController_1.apiController.eliminarMateria);
        this.router.post('/actualizarMateria', apiController_1.apiController.actualizarMateria);
        this.router.get('/getBloques', apiController_1.apiController.getBloques);
        this.router.post('/crearBloque', apiController_1.apiController.crearBloque);
        this.router.post('/eliminarBloque', apiController_1.apiController.eliminarBloque);
        this.router.post('/actualizarBloque', apiController_1.apiController.actualizarBloque);
        this.router.get('/getAlumnosAnio', apiController_1.apiController.getAlumnosAnio);
        this.router.get('/getDocentesAnio', apiController_1.apiController.getDocentesAnio);
        this.router.get('/alumnosPorYear', apiController_1.apiController.alumnosPorYear);
        this.router.post('/alumnosPorSeccion', apiController_1.apiController.alumnosPorSeccion);
    }
}
const apiRoutes = new ApiRoutes();
exports.default = apiRoutes.router;
