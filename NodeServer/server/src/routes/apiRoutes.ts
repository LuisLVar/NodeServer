import { Router } from 'express';
import { apiController } from '../controllers/apiController';
import pool from '../database';

class ApiRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config():void {
        this.router.post('/login', apiController.login);
        this.router.get('/getCiclos', apiController.getCiclos);
        this.router.post('/crearCiclo', apiController.crearCiclo);
        this.router.post('/eliminarCiclo', apiController.eliminarCiclo);    
        this.router.post('/existeAlumno', apiController.existeAlumno);
        this.router.get('/getAlumnos', apiController.getAlumnos);       
        this.router.post('/crearAlumno', apiController.crearAlumno);
        this.router.post('/eliminarAlumno', apiController.eliminarAlumno);
        this.router.post('/actualizarAlumno', apiController.actualizarAlumno);
        this.router.post('/existeAspecto', apiController.existeAspecto);
        this.router.get('/getAspectos', apiController.getAspectos);
        this.router.post('/crearAspecto', apiController.crearAspecto);
        this.router.post('/eliminarAspecto', apiController.eliminarAspecto);
        this.router.post('/actualizarAspecto', apiController.actualizarAspecto);
        this.router.post('/existeGrado', apiController.existeGrado);
        this.router.get('/getGrados', apiController.getGrados);
        this.router.post('/crearGrado', apiController.crearGrado);
        this.router.post('/eliminarGrado', apiController.eliminarGrado);
        this.router.post('/actualizarGrado', apiController.actualizarGrado);
        this.router.post('/getSeccionGrado', apiController.getSeccionGrado);
        this.router.post('/crearInscripcion', apiController.crearInscripcion);
        this.router.post('/eliminarInscripcion', apiController.eliminarInscripcion);
        this.router.get('/getSecciones', apiController.getSecciones);
        this.router.post('/existeSeccion', apiController.existeSeccion);
        this.router.post('/crearSeccion', apiController.crearSeccion);
        this.router.post('/eliminarSeccion', apiController.eliminarSeccion);
        this.router.post('/actualizarSeccion', apiController.actualizarSeccion);
        this.router.get('/getPersonal', apiController.getPersonal);
        this.router.post('/crearPersonal', apiController.crearPersonal);
        this.router.post('/eliminarPersonal', apiController.eliminarPersonal);
        this.router.post('/actualizarPersonal', apiController.actualizarPersonal);
        this.router.get('/getEscuelas', apiController.getEscuelas);
        this.router.get('/getTipoPersonal', apiController.getTipoPersonal);
        this.router.get('/getMaterias', apiController.getMaterias);
        this.router.post('/crearMateria', apiController.crearMateria);
        this.router.post('/eliminarMateria', apiController.eliminarMateria);
        this.router.post('/actualizarMateria', apiController.actualizarMateria);
        this.router.get('/getBloques', apiController.getBloques);
        this.router.post('/crearBloque', apiController.crearBloque);
        this.router.post('/eliminarBloque', apiController.eliminarBloque);
        this.router.post('/actualizarBloque', apiController.actualizarBloque);
        this.router.get('/getAlumnosAnio', apiController.getAlumnosAnio);
        this.router.get('/getDocentesAnio', apiController.getDocentesAnio);
        this.router.get('/alumnosPorYear', apiController.alumnosPorYear);
        this.router.post('/alumnosPorSeccion', apiController.alumnosPorSeccion);

    }

}

const apiRoutes = new ApiRoutes();
export default apiRoutes.router;