"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
class ApiController {
    //Login 
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personas = yield database_1.default.query('select * from personal where usuario = ? and password = ?', [emp.usuario, emp.password]);
            res.json(personas);
        });
    }
    //Ciclo
    getCiclos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ciclos = yield database_1.default.query('select * from ciclo');
            res.json(ciclos);
        });
    }
    crearCiclo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const ciclo = yield database_1.default.query('insert into ciclo (year) \
    values (?)', [emp.year]);
            res.json(ciclo);
        });
    }
    eliminarCiclo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const ciclo = yield database_1.default.query('delete from ciclo where ciclo=?', [emp.ciclo]);
            res.json(ciclo);
        });
    }
    //Alumnos
    existeAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personas = yield database_1.default.query('select * from alumno where nombre = ? and apellido = ? and id_alumno = ?', [emp.nombre, emp.apellido, emp.idalumno]);
            if (isEmptyObject(personas)) {
                res.json({ existe: false });
            }
            else {
                res.json({ existe: true });
            }
        });
    }
    getAlumnos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const alumnos = yield database_1.default.query('select * from alumno');
            res.json(alumnos);
        });
    }
    crearAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const alumnos = yield database_1.default.query('insert into alumno (nombre,apellido,direccion,telefono,cui,encargado,fecha_nacimiento,estado) \
        values (?,?,?,?,?,?,?,?)', [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.cui, emp.encargado, emp.fecha_nacimiento, emp.estado]);
            res.json(alumnos);
        });
    }
    eliminarAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const alumnos = yield database_1.default.query('update alumno set estado = 0 where id_alumno=?', [emp.id_alumno]);
            res.json(alumnos);
        });
    }
    actualizarAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const alumnos = yield database_1.default.query('update alumno set nombre =?,apellido=?,direccion=?,telefono=?,cui=?, \
        encargado=?,fecha_nacimiento=?,estado=? where id_alumno=?', [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.cui,
                emp.encargado, emp.fecha_nacimiento, emp.estado, emp.id_alumno]);
            res.json({ msg: 'Exito: Alumno modificado' });
        });
    }
    //Aspectos
    existeAspecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const aspectos = yield database_1.default.query('select * from aspecto where nombre = ?', [emp.nombre]);
            if (isEmptyObject(aspectos)) {
                res.json({ existe: false });
            }
            else {
                res.json({ existe: true });
            }
        });
    }
    getAspectos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aspectos = yield database_1.default.query('select * from aspecto');
            res.json(aspectos);
        });
    }
    crearAspecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const aspectos = yield database_1.default.query('insert into aspecto (nombre) \
    values (?)', [emp.nombre]);
            res.json(aspectos);
        });
    }
    eliminarAspecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const aspectos = yield database_1.default.query('delete from aspecto where aspecto=? and nombre=?', [emp.aspecto, emp.nombre]);
            res.json(aspectos);
        });
    }
    actualizarAspecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const aspectos = yield database_1.default.query('update aspecto set nombre =? where aspecto=?', [emp.nombre, emp.aspecto]);
            res.json(aspectos);
        });
    }
    //Grados
    existeGrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const grados = yield database_1.default.query('select * from grado where nombre = ?', [emp.nombre]);
            if (isEmptyObject(grados)) {
                res.json({ existe: false });
            }
            else {
                res.json({ existe: true });
            }
        });
    }
    getGrados(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const grados = yield database_1.default.query('select * from grado');
            res.json(grados);
        });
    }
    crearGrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const grados = yield database_1.default.query('insert into grado (nombre) \
    values (?)', [emp.nombre]);
            res.json(grados);
        });
    }
    eliminarGrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const grados = yield database_1.default.query('delete from grado where grado=? and nombre=?', [emp.grado, emp.nombre]);
            res.json(grados);
        });
    }
    actualizarGrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const grados = yield database_1.default.query('update grado set nombre =? where grado=?', [emp.nombre, emp.grado]);
            res.json(grados);
        });
    }
    //Secciones por grado
    getSeccionGrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const grados = yield database_1.default.query('select seccion.seccion, seccion.nombre from seccion join grado on seccion.grado_grado = grado.grado where grado.nombre =?', [emp.nombre]);
            res.json(grados);
        });
    }
    //Inscripcion
    crearInscripcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const inscripcion = yield database_1.default.query('insert into inscripcion values (?,?,?)', [emp.fecha, emp.seccion, emp.alumno]);
            res.json(inscripcion);
        });
    }
    eliminarInscripcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const inscripcion = yield database_1.default.query('delete from inscripcion where seccion_seccion=? and alumno_alumno=?', [emp.seccion, emp.alumno]);
            res.json(inscripcion);
        });
    }
    //Secciones
    getSecciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const secciones = yield database_1.default.query('select seccion.seccion, seccion.nombre, seccion.estado, grado.nombre as "nombre_grado", \
    personal.nombre as "nombre_personal", grado.grado, personal.id_personal from seccion join grado on seccion.grado_grado = grado.grado \
    join personal on seccion.personal_personal = personal.id_personal');
            res.json(secciones);
        });
    }
    existeSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const seccion = yield database_1.default.query('select * from seccion where nombre = ?', [emp.nombre]);
            if (isEmptyObject(seccion)) {
                res.json({ existe: false });
            }
            else {
                res.json({ existe: true });
            }
        });
    }
    crearSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const seccion = yield database_1.default.query('insert into seccion (nombre, estado, grado_grado, personal_personal, ciclo_ciclo) \
    values (?,?,?,?,?)', [emp.nombre, emp.estado, emp.GRADO_grado, emp.PERSONAL_personal, emp.CICLO_ciclo]);
            res.json(seccion);
        });
    }
    eliminarSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const seccion = yield database_1.default.query('delete from seccion where seccion=?', [emp.seccion]);
            res.json(seccion);
        });
    }
    actualizarSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const seccion = yield database_1.default.query('update seccion set nombre = ?, estado=?, grado_grado=?, personal_personal=?, ciclo_ciclo=? where seccion=?', [emp.nombre, emp.estado, emp.GRADO_grado, emp.PERSONAL_personal, emp.CICLO_ciclo, emp.seccion]);
            res.json(seccion);
        });
    }
    //Personal
    getPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const personal = yield database_1.default.query('select p.id_personal, p.nombre, p.apellido, p.direccion, p.telefono, p.usuario, p.password, p.estado, \
    escuela.nombre as "nombre_escuela", tipo_personal.nombre as "nombre_tipo", p.escuela_escuela, p.tipo_personal_tipo \
    from personal p join escuela on p.escuela_escuela = escuela.escuela \
    join tipo_personal on p.tipo_personal_tipo = tipo_personal.tipo');
            res.json(personal);
        });
    }
    crearPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personal = yield database_1.default.query('insert into personal (nombre, apellido, direccion, telefono, usuario, password, estado, \
        escuela_escuela, tipo_personal_tipo) values (?,?,?,?,?,?,?,?,?)', [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.usuario, emp.password, emp.estado, emp.ESCUELA_escuela, emp.TIPO_PERSONAL_tipo]);
            res.json(personal);
        });
    }
    eliminarPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personal = yield database_1.default.query('delete from personal where id_personal=?', [emp.id_personal]);
            res.json(personal);
        });
    }
    actualizarPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personal = yield database_1.default.query('update personal set nombre =?, apellido=?, direccion=?, telefono=?, usuario=?, \
     password=?, estado=?, escuela_escuela=?, tipo_personal_tipo=? \
    where id_personal=?', [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.usuario, emp.password, emp.estado, emp.ESCUELA_escuela, emp.TIPO_PERSONAL_tipo, emp.id_personal]);
            res.json(personal);
        });
    }
    //getEscuelas
    getEscuelas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const escuelas = yield database_1.default.query('select * from escuela');
            res.json(escuelas);
        });
    }
    //Obtener el tipo del personal
    getTipoPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personal = yield database_1.default.query('select tipo_personal.nombre as "nombre_tipo", p.nombre from personal p \
    join escuela on p.escuela_escuela = escuela.escuela \
    join tipo_personal on p.tipo_personal_tipo = tipo_personal.tipo');
            res.json(personal);
        });
    }
    //Materias
    getMaterias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const materias = yield database_1.default.query('select * from materia');
            res.json(materias);
        });
    }
    crearMateria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const materia = yield database_1.default.query('insert into materia (nombre, contenido) \
    values (?,?)', [emp.nombre, emp.contenido]);
            res.json(materia);
        });
    }
    eliminarMateria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const materia = yield database_1.default.query('delete from materia where materia=?', [emp.materia]);
            res.json(materia);
        });
    }
    actualizarMateria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const materia = yield database_1.default.query('update materia set nombre =?, contenido=? where materia=?', [emp.nombre, emp.contenido, emp.materia]);
            res.json(materia);
        });
    }
    //Bloques
    getBloques(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bloques = yield database_1.default.query('select * from bloque');
            res.json(bloques);
        });
    }
    crearBloque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('insert into bloque (nombre) \
    values (?)', [emp.nombre]);
            res.json(bloque);
        });
    }
    eliminarBloque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('delete from bloque where bloque=?', [emp.bloque]);
            res.json(bloque);
        });
    }
    actualizarBloque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('update bloque set nombre =? where idbloque=?', [emp.nombre, emp.bloque]);
            res.json(bloque);
        });
    }
    //Cantidad de alumnos en el anio actual
    getAlumnosAnio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('select count(*) as "alumnos" from alumno where year(curdate())', [emp.nombre, emp.bloque]);
            res.json(bloque);
        });
    }
    //Cantidad de docentes en el anio actual
    getDocentesAnio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('select count(*) as "docentes" from personal where year(curdate()) and tipo_personal_tipo = 2');
            res.json(bloque);
        });
    }
    //Alumnos por años
    alumnosPorYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('select year(i.fecha) as "year", count(a.id_alumno) as "alumnos" from inscripcion i join alumno a on i.alumno_alumno = a.id_alumno \
    group by year(i.fecha)');
            res.json(bloque);
        });
    }
    //Alumnos por seccion especifica
    alumnosPorSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('select a.id_alumno as "id_alumno", a.nombre as "nombre_alumno", a.apellido as "apellido_alumno" from inscripcion i \
    join alumno a on i.alumno_alumno = a.id_alumno where i.seccion_seccion=?', [emp.seccion]);
            res.json(bloque);
        });
    }
}
exports.apiController = new ApiController();
