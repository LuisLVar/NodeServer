"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            const personas = yield database_1.default.query('SELECT * FROM PERSONAL WHERE usuario = ? AND password = ?', [emp.usuario, emp.password]);
            res.json(personas);
        });
    }
    //Ciclo
    getCiclos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const ciclos = yield database_1.default.query('SELECT * FROM CICLO');
            res.json(ciclos);
        });
    }
    crearCiclo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const ciclo = yield database_1.default.query('INSERT INTO CICLO (YEAR) \
    VALUES (?)', [emp.year]);
            res.json(ciclo);
        });
    }
    eliminarCiclo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const ciclo = yield database_1.default.query('DELETE FROM CICLO WHERE ciclo=?', [emp.ciclo]);
            res.json(ciclo);
        });
    }
    //Alumnos
    existeAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personas = yield database_1.default.query('SELECT * FROM ALUMNO WHERE nombre = ? AND apellido = ? AND id_alumno = ?', [emp.nombre, emp.apellido, emp.idalumno]);
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
            const alumnos = yield database_1.default.query('SELECT * FROM ALUMNO');
            res.json(alumnos);
        });
    }
    crearAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const alumnos = yield database_1.default.query('INSERT INTO ALUMNO (NOMBRE,APELLIDO,DIRECCION,TELEFONO,CUI,ENCARGADO,FECHA_NACIMIENTO,ESTADO) \
        VALUES (?,?,?,?,?,?,?,?)', [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.cui, emp.encargado, emp.fecha_nacimiento, emp.estado]);
            res.json(alumnos);
        });
    }
    eliminarAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const alumnos = yield database_1.default.query('UPDATE ALUMNO SET estado = 0 WHERE id_alumno=?', [emp.id_alumno]);
            res.json(alumnos);
        });
    }
    actualizarAlumno(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const alumnos = yield database_1.default.query('UPDATE ALUMNO SET NOMBRE =?,APELLIDO=?,DIRECCION=?,TELEFONO=?,CUI=?, \
        ENCARGADO=?,FECHA_NACIMIENTO=?,ESTADO=? WHERE id_alumno=?', [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.cui,
                emp.encargado, emp.fecha_nacimiento, emp.estado, emp.id_alumno]);
            res.json({ msg: 'Exito: Alumno modificado' });
        });
    }
    //Aspectos
    existeAspecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const aspectos = yield database_1.default.query('SELECT * FROM ASPECTO WHERE nombre = ?', [emp.nombre]);
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
            const aspectos = yield database_1.default.query('SELECT * FROM ASPECTO');
            res.json(aspectos);
        });
    }
    crearAspecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const aspectos = yield database_1.default.query('INSERT INTO ASPECTO (NOMBRE) \
    VALUES (?)', [emp.nombre]);
            res.json(aspectos);
        });
    }
    eliminarAspecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const aspectos = yield database_1.default.query('DELETE FROM ASPECTO WHERE aspecto=? AND nombre=?', [emp.aspecto, emp.nombre]);
            res.json(aspectos);
        });
    }
    actualizarAspecto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const aspectos = yield database_1.default.query('UPDATE ASPECTO SET nombre =? WHERE aspecto=?', [emp.nombre, emp.aspecto]);
            res.json(aspectos);
        });
    }
    //Grados
    existeGrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const grados = yield database_1.default.query('SELECT * FROM GRADO WHERE nombre = ?', [emp.nombre]);
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
            const grados = yield database_1.default.query('SELECT * FROM GRADO');
            res.json(grados);
        });
    }
    crearGrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const grados = yield database_1.default.query('INSERT INTO GRADO (NOMBRE) \
    VALUES (?);', [emp.nombre]);
            res.json(grados);
        });
    }
    eliminarGrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const grados = yield database_1.default.query('DELETE FROM GRADO WHERE grado=? AND nombre=?', [emp.grado, emp.nombre]);
            res.json(grados);
        });
    }
    actualizarGrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const grados = yield database_1.default.query('UPDATE GRADO SET nombre =? WHERE grado=?', [emp.nombre, emp.grado]);
            res.json(grados);
        });
    }
    //Secciones por grado
    getSeccionGrado(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const grados = yield database_1.default.query('SELECT SECCION.seccion, SECCION.nombre FROM SECCION JOIN GRADO ON SECCION.GRADO_grado = GRADO.grado WHERE GRADO.nombre =?', [emp.nombre]);
            res.json(grados);
        });
    }
    //Inscripcion
    crearInscripcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const inscripcion = yield database_1.default.query('INSERT INTO INSCRIPCION VALUES (?,?,?)', [emp.fecha, emp.seccion, emp.alumno]);
            res.json(inscripcion);
        });
    }
    eliminarInscripcion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const inscripcion = yield database_1.default.query('DELETE FROM INSCRIPCION WHERE SECCION_seccion=? AND ALUMNO_alumno=?', [emp.seccion, emp.alumno]);
            res.json(inscripcion);
        });
    }
    //Secciones
    getSecciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const secciones = yield database_1.default.query('SELECT SECCION.seccion, SECCION.nombre, SECCION.estado, GRADO.nombre AS "nombre_grado", \
    PERSONAL.nombre AS "nombre_personal", GRADO.grado, PERSONAL.id_personal FROM SECCION JOIN GRADO ON SECCION.GRADO_grado = GRADO.grado \
    JOIN PERSONAL ON SECCION.PERSONAL_personal = PERSONAL.id_personal');
            res.json(secciones);
        });
    }
    existeSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const seccion = yield database_1.default.query('SELECT * FROM SECCION WHERE nombre = ?', [emp.nombre]);
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
            const seccion = yield database_1.default.query('INSERT INTO SECCION (nombre, estado, GRADO_grado, PERSONAL_personal, CICLO_ciclo) \
    VALUES (?,?,?,?,?)', [emp.nombre, emp.estado, emp.GRADO_grado, emp.PERSONAL_personal, emp.CICLO_ciclo]);
            res.json(seccion);
        });
    }
    eliminarSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const seccion = yield database_1.default.query('DELETE FROM SECCION WHERE seccion=?', [emp.seccion]);
            res.json(seccion);
        });
    }
    actualizarSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const seccion = yield database_1.default.query('UPDATE SECCION SET nombre = ?, estado=?, GRADO_grado=?, PERSONAL_personal=?, CICLO_ciclo=? WHERE seccion=?', [emp.nombre, emp.estado, emp.GRADO_grado, emp.PERSONAL_personal, emp.CICLO_ciclo, emp.seccion]);
            res.json(seccion);
        });
    }
    //Personal
    getPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const personal = yield database_1.default.query('SELECT P.id_personal, P.nombre, P.apellido, P.direccion, P.telefono, P.usuario, P.password, P.estado, \
    ESCUELA.nombre AS "nombre_escuela", TIPO_PERSONAL.nombre AS "nombre_tipo", P.ESCUELA_escuela, P.TIPO_PERSONAL_tipo \
    FROM PERSONAL P JOIN ESCUELA ON P.ESCUELA_escuela = ESCUELA.escuela \
    JOIN TIPO_PERSONAL ON P.TIPO_PERSONAL_tipo = TIPO_PERSONAL.tipo');
            res.json(personal);
        });
    }
    crearPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personal = yield database_1.default.query('INSERT INTO PERSONAL (nombre, apellido, direccion, telefono, usuario, password, estado, \
        ESCUELA_escuela, TIPO_PERSONAL_tipo) VALUES (?,?,?,?,?,?,?,?,?)', [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.usuario, emp.password, emp.estado, emp.ESCUELA_escuela, emp.TIPO_PERSONAL_tipo]);
            res.json(personal);
        });
    }
    eliminarPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personal = yield database_1.default.query('DELETE FROM PERSONAL WHERE id_personal=?', [emp.id_personal]);
            res.json(personal);
        });
    }
    actualizarPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personal = yield database_1.default.query('UPDATE PERSONAL SET nombre =?, apellido=?, direccion=?, telefono=?, usuario=?, \
     password=?, estado=?, ESCUELA_escuela=?, TIPO_PERSONAL_tipo=? \
    WHERE id_personal=?', [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.usuario, emp.password, emp.estado, emp.ESCUELA_escuela, emp.TIPO_PERSONAL_tipo, emp.id_personal]);
            res.json(personal);
        });
    }
    //getEscuelas
    getEscuelas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const escuelas = yield database_1.default.query('SELECT * FROM ESCUELA');
            res.json(escuelas);
        });
    }
    //Obtener el tipo del personal
    getTipoPersonal(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const personal = yield database_1.default.query('SELECT TIPO_PERSONAL.nombre AS "nombre_tipo", P.nombre FROM PERSONAL P \
    JOIN ESCUELA ON P.ESCUELA_escuela = ESCUELA.escuela \
    JOIN TIPO_PERSONAL ON P.TIPO_PERSONAL_tipo = TIPO_PERSONAL.tipo');
            res.json(personal);
        });
    }
    //Materias
    getMaterias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const materias = yield database_1.default.query('SELECT * FROM MATERIA');
            res.json(materias);
        });
    }
    crearMateria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const materia = yield database_1.default.query('INSERT INTO MATERIA (nombre, contenido) \
    VALUES (?,?)', [emp.nombre, emp.contenido]);
            res.json(materia);
        });
    }
    eliminarMateria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const materia = yield database_1.default.query('DELETE FROM MATERIA WHERE materia=?', [emp.materia]);
            res.json(materia);
        });
    }
    actualizarMateria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const materia = yield database_1.default.query('UPDATE MATERIA SET nombre =?, contenido=? WHERE materia=?', [emp.nombre, emp.contenido, emp.materia]);
            res.json(materia);
        });
    }
    //Bloques
    getBloques(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bloques = yield database_1.default.query('SELECT * FROM BLOQUE');
            res.json(bloques);
        });
    }
    crearBloque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('INSERT INTO BLOQUE (NOMBRE) \
    VALUES (?)', [emp.nombre]);
            res.json(bloque);
        });
    }
    eliminarBloque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('DELETE FROM BLOQUE WHERE bloque=?', [emp.bloque]);
            res.json(bloque);
        });
    }
    actualizarBloque(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('UPDATE BLOQUE SET NOMBRE =? WHERE idbloque=?', [emp.nombre, emp.bloque]);
            res.json(bloque);
        });
    }
    //Cantidad de alumnos en el anio actual
    getAlumnosAnio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('SELECT COUNT(*) AS "alumnos" FROM ALUMNO WHERE YEAR(CURDATE())', [emp.nombre, emp.bloque]);
            res.json(bloque);
        });
    }
    //Cantidad de docentes en el anio actual
    getDocentesAnio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('SELECT COUNT(*) AS "docentes" FROM PERSONAL WHERE YEAR(CURDATE()) AND TIPO_PERSONAL_tipo = 2');
            res.json(bloque);
        });
    }
    //Alumnos por años
    alumnosPorYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('SELECT YEAR(I.fecha) AS "year", COUNT(A.id_alumno) AS "alumnos" FROM INSCRIPCION I JOIN ALUMNO A ON I.ALUMNO_alumno = A.id_alumno \
    GROUP BY YEAR(I.fecha)');
            res.json(bloque);
        });
    }
    //Alumnos por seccion especifica
    alumnosPorSeccion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let emp = req.body;
            const bloque = yield database_1.default.query('SELECT A.id_alumno AS "id_alumno", A.nombre AS "nombre_alumno", A.apellido AS "apellido_alumno" FROM INSCRIPCION I \
    JOIN ALUMNO A ON I.ALUMNO_alumno = A.id_alumno WHERE I.SECCION_seccion=?', [emp.seccion]);
            res.json(bloque);
        });
    }
}
exports.apiController = new ApiController();
