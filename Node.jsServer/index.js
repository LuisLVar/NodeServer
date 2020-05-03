const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'beta1234',
    database: 'VOLUNTARIADO',
    multipleStatements: true,
    dateStrings: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}


// This should work both there and elsewhere.
function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}

app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));


//--------------------------------------------------------------------
//Login
app.post('/login', (req, res) => {
    let emp = req.body;
    var sql = "SELECT idpersonal, nombre, apellido, tipo_personal_tipo FROM PERSONAL WHERE correo = ? AND contrasena = ?";
    mysqlConnection.query(sql, [emp.correo, emp.contrasena], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
            console.log(emp);
        } else
            console.log(err);
    })
});

//--------------------------------------------------------------------
//Ver si el estudiante existe
app.post('/existeAlumno', (req, res) => {
    let emp = req.body;
    var sql = "SELECT * FROM ALUMNO WHERE nombre = ? AND apellido = ? AND idalumno = ?";
    mysqlConnection.query(sql, [emp.nombre, emp.apellido, emp.idalumno], (err, rows, fields) => {
        if (!err) {
            if (isEmptyObject(rows)) {
                res.json({ existe: false })
            } else {
                res.json({ existe: true })
            }

        } else
            console.log(err);
    })
});

//Obtener todos los estudiantes
app.get('/getAlumnos', (req, res) => {
    mysqlConnection.query('SELECT * FROM ALUMNO', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Crear Alumno
app.post('/crearAlumno', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO ALUMNO (NOMBRE,APELLIDO,DIRECCION,TELEFONO,CODIGO_PERSONAL,ENCARGADO,FECHA_NACIMIENTO,ESTADO) \
    VALUES (?,?,?,?,?,?,?,?);";
    mysqlConnection.query(sql, [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.codigo_personal, emp.encargado, emp.fecha_nacimiento, emp.estado], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Alumno creado' })
        } else
            res.json({ msg: 'Error: Error al crear el alumno' })
    })
});

//Eliminar Alumno
app.post('/eliminarAlumno', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE ALUMNO SET estado = 0 WHERE idalumno=?";
    mysqlConnection.query(sql, [emp.idalumno], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Alumno eliminado' })
        } else
            res.json({ msg: 'Error: Error al eliminar el alumno' })
    })
});

//Actualizar Alumno
app.post('/actualizarAlumno', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE ALUMNO SET NOMBRE =?,APELLIDO=?,DIRECCION=?,TELEFONO=?,CODIGO_PERSONAL=?,ENCARGADO=?,FECHA_NACIMIENTO=?,ESTADO=? WHERE idalumno=?";
    mysqlConnection.query(sql, [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.codigo_personal, emp.encargado, emp.fecha_nacimiento, emp.estado, emp.idalumno], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Alumno modificado' })
        } else
            res.json({ msg: 'Error: Error al modificar el alumno' })
    })
});

//--------------------------------------------------------------------
//Ver si el aspecto existe
app.post('/existeAspecto', (req, res) => {
    let emp = req.body;
    var sql = "SELECT * FROM ASPECTO WHERE nombre = ?";
    mysqlConnection.query(sql, [emp.nombre], (err, rows, fields) => {
        if (!err) {
            if (isEmptyObject(rows)) {
                res.json({ existe: false })
            } else {
                res.json({ existe: true })
            }

        } else
            console.log(err);
    })
});

//Obtener todos los aspectos
app.get('/getAspectos', (req, res) => {
    mysqlConnection.query('SELECT * FROM ASPECTO', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Crear Aspecto
app.post('/crearAspecto', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO ASPECTO (NOMBRE) \
    VALUES (?);";
    mysqlConnection.query(sql, [emp.nombre], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Aspecto creado' })
        } else
            res.json({ msg: 'Error: Error al crear el aspecto' })
    })
});

//Eliminar Aspecto
app.post('/eliminarAspecto', (req, res) => {
    let emp = req.body;
    var sql = "DELETE FROM ASPECTO WHERE idaspecto=? AND nombre=?";
    mysqlConnection.query(sql, [emp.idaspecto, emp.nombre], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Aspecto eliminado' })
        } else
            res.json({ msg: 'Error: Error al eliminar el Aspecto' })
    })
});

//Actualizar Aspecto
app.post('/actualizarAspecto', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE ASPECTO SET nombre =? WHERE idaspecto=?";
    mysqlConnection.query(sql, [emp.nombre, emp.idaspecto], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Aspecto modificado' })
        } else
            res.json({ msg: 'Error: Error al modificar el Aspecto' })
    })
});

//--------------------------------------------------------------------
//Obtener los grados
app.get('/getGrados', (req, res) => {
    mysqlConnection.query('SELECT * FROM GRADO', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Obtener las secciones de un grado
app.post('/getSeccionGrado', (req, res) => {
    let emp = req.body;
    mysqlConnection.query('SELECT SECCION.idseccion, SECCION.nombre FROM SECCION JOIN GRADO ON SECCION.GRADO_grado = GRADO.idgrado WHERE GRADO.nombre =?', [emp.nombre], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Crear Inscripcion
app.post('/crearInscripcion', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO INSCRIPCION VALUES (?,?,?);";
    mysqlConnection.query(sql, [emp.fecha, emp.SECCION_seccion, emp.ALUMNO_alumno], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Inscripcion creada' })
        } else
            res.json({ msg: 'Error: Error al crear la inscripcion' })
    })
});

//Eliminar Inscripcion
app.post('/eliminarInscripcion', (req, res) => {
    let emp = req.body;
    var sql = "DELETE FROM INSCRIPCION WHERE SECCION_seccion=? AND ALUMNO_alumno=?";
    mysqlConnection.query(sql, [emp.SECCION_seccion, emp.ALUMNO_alumno], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Inscripcion eliminada' })
        } else
            res.json({ msg: 'Error: Error al eliminar la inscripcion' })
    })
});

//--------------------------------------------------------------------
//Ver si el grado existe
app.post('/existeGrado', (req, res) => {
    let emp = req.body;
    var sql = "SELECT * FROM GRADO WHERE nombre = ?";
    mysqlConnection.query(sql, [emp.nombre], (err, rows, fields) => {
        if (!err) {
            if (isEmptyObject(rows)) {
                res.json({ existe: false })
            } else {
                res.json({ existe: true })
            }

        } else
            console.log(err);
    })
});

//Crear Grado
app.post('/crearGrado', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO GRADO (NOMBRE) \
    VALUES (?);";
    mysqlConnection.query(sql, [emp.nombre], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Grado creado' })
        } else
            res.json({ msg: 'Error: Error al crear el grado' })
    })
});

//Eliminar Grado
app.post('/eliminarGrado', (req, res) => {
    let emp = req.body;
    var sql = "DELETE FROM GRADO WHERE idgrado=? AND nombre=?";
    mysqlConnection.query(sql, [emp.idgrado, emp.nombre], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Grado eliminado' })
        } else
            res.json({ msg: 'Error: Error al eliminar el grado' })
    })
});

//Actualizar Grado
app.post('/actualizarGrado', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE GRADO SET nombre =? WHERE idgrado=?";
    mysqlConnection.query(sql, [emp.nombre, emp.idgrado], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Grado modificado' })
        } else
            res.json({ msg: 'Error: Error al modificar el grado' })
    })
});

//---------------------------------------------------
//Obtener todas las secciones
app.get('/getSecciones', (req, res) => {
    mysqlConnection.query('SELECT SECCION.idseccion, SECCION.nombre, SECCION.anio, SECCION.estado, GRADO.nombre AS "nombre_grado", \
    PERSONAL.nombre AS "nombre_personal", GRADO.idgrado, PERSONAL.idpersonal FROM SECCION JOIN GRADO ON SECCION.GRADO_grado = GRADO.idgrado \
    JOIN PERSONAL ON SECCION.PERSONAL_personal = PERSONAL.idpersonal', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Ver si la seccion existe
app.post('/existeSeccion', (req, res) => {
    let emp = req.body;
    var sql = "SELECT * FROM SECCION WHERE nombre = ?";
    mysqlConnection.query(sql, [emp.nombre], (err, rows, fields) => {
        if (!err) {
            if (isEmptyObject(rows)) {
                res.json({ existe: false })
            } else {
                res.json({ existe: true })
            }

        } else
            console.log(err);
    })
});

//Crear Seccion
app.post('/crearSeccion', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO SECCION (nombre, anio, estado, GRADO_grado, PERSONAL_personal) \
    VALUES (?,?,?,?,?);";
    mysqlConnection.query(sql, [emp.nombre, emp.anio, emp.estado, emp.GRADO_grado, emp.PERSONAL_personal], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Sección creada' })
        } else
            res.json({ msg: 'Error: Error al crear la sección' })
    })
});

//Eliminar Seccion
app.post('/eliminarSeccion', (req, res) => {
    let emp = req.body;
    var sql = "DELETE FROM SECCION WHERE idseccion=?";
    mysqlConnection.query(sql, [emp.idseccion], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Sección eliminada' })
        } else
            res.json({ msg: 'Error: Error al eliminar la sección' })
    })
});

//Actualizar Seccion
app.post('/actualizarSeccion', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE SECCION SET nombre = ?, anio=?, estado=?, GRADO_grado=?, PERSONAL_personal=? WHERE idseccion=?";
    mysqlConnection.query(sql, [emp.nombre, emp.anio, emp.estado, emp.GRADO_grado, emp.PERSONAL_personal, emp.idseccion], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Sección modificada' })
        } else
            res.json({ msg: 'Error: Error al modificar la sección' })
    })
});

//-------------------------------------------------------------------
//Obtener todo el personal
app.get('/getPersonal', (req, res) => {
    mysqlConnection.query('SELECT P.idpersonal, P.nombre, P.apellido, P.direccion, P.telefono, P.correo, P.contrasena, P.dpi, P.estado, \
    ESCUELA.nombre AS "nombre_escuela", TIPO_PERSONAL.nombre AS "nombre_tipo", P.ESCUELA_escuela, P.TIPO_PERSONAL_tipo \
    FROM PERSONAL P JOIN ESCUELA ON P.ESCUELA_escuela = ESCUELA.idescuela \
    JOIN TIPO_PERSONAL ON P.TIPO_PERSONAL_tipo = TIPO_PERSONAL.idtipo_personal', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Crear Personal
app.post('/crearPersonal', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO PERSONAL (nombre, apellido, direccion, telefono, correo, contrasena, dpi, estado, ESCUELA_escuela, TIPO_PERSONAL_tipo) \
    VALUES (?,?,?,?,?,?,?,?,?,?);";
    mysqlConnection.query(sql, [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.correo,
        emp.contrasena, emp.dpi, emp.estado, emp.ESCUELA_escuela, emp.TIPO_PERSONAL_tipo
    ], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Personal creado' })
        } else
            res.json({ msg: 'Error: Error al crear el personal' })
    })
});

//Eliminar Personal
app.post('/eliminarPersonal', (req, res) => {
    let emp = req.body;
    var sql = "DELETE FROM PERSONAL WHERE idpersonal=?";
    mysqlConnection.query(sql, [emp.idpersonal], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Personal eliminado' })
        } else
            res.json({ msg: 'Error: Error al eliminar el personal' })
    })
});

//Actualizar Personal
app.post('/actualizarPersonal', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE PERSONAL SET nombre =?, apellido=?, direccion=?, telefono=?, correo=?, contrasena=?, dpi=?, estado=?, ESCUELA_escuela=?, TIPO_PERSONAL_tipo=? \
     WHERE idpersonal=?";
    mysqlConnection.query(sql, [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.correo, emp.contrasena, emp.dpi, emp.estado, emp.ESCUELA_escuela, emp.TIPO_PERSONAL_tipo, emp.idpersonal], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Personal actualizado' })
        } else
            res.json({ msg: 'Error: Error al actualizar el personal' })
    })
});

//-------------------------------------------------------------------
//Obtener las escuelas
app.get('/getEscuelas', (req, res) => {
    mysqlConnection.query('SELECT * FROM ESCUELA', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Obtener el tipo de personal
app.get('/getTipoPersonal', (req, res) => {
    mysqlConnection.query('SELECT TIPO_PERSONAL.nombre AS "nombre_tipo", P.nombre \
    FROM PERSONAL P JOIN ESCUELA ON P.ESCUELA_escuela = ESCUELA.idescuela \
    JOIN TIPO_PERSONAL ON P.TIPO_PERSONAL_tipo = TIPO_PERSONAL.idtipo_personal', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

///////////////////////////////////////////////////////
//Obtener las materias
app.get('/getMaterias', (req, res) => {
    mysqlConnection.query('SELECT * FROM MATERIA', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Crear Materias
app.post('/crearMateria', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO MATERIA (nombre, contenido) \
    VALUES (?,?);";
    mysqlConnection.query(sql, [emp.nombre, emp.contenido], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Materia creada' })
        } else
            res.json({ msg: 'Error: Error al crear la materia' })
    })
});

//Eliminar Materia
app.post('/eliminarMateria', (req, res) => {
    let emp = req.body;
    var sql = "DELETE FROM MATERIA WHERE idmateria=?";
    mysqlConnection.query(sql, [emp.idmateria], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Materia eliminada' })
        } else
            res.json({ msg: 'Error: Error al eliminar la materia' })
    })
});

//Actualizar Materia
app.post('/actualizarMateria', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE MATERIA SET nombre =?, contenido=? WHERE idmateria=?";
    mysqlConnection.query(sql, [emp.nombre, emp.contenido, emp.idmateria], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Materia modificada' })
        } else
            res.json({ msg: 'Error: Error al modificar la materia' })
    })
});

//--------------------------------------------------------------------
//Ver si el bloque existe
app.post('/existeBloque', (req, res) => {
    let emp = req.body;
    var sql = "SELECT * FROM BLOQUE WHERE nombre = ?";
    mysqlConnection.query(sql, [emp.nombre], (err, rows, fields) => {
        if (!err) {
            if (isEmptyObject(rows)) {
                res.json({ existe: false })
            } else {
                res.json({ existe: true })
            }

        } else
            console.log(err);
    })
});

//Obtener todos los bloques
app.get('/getBloques', (req, res) => {
    mysqlConnection.query('SELECT * FROM BLOQUE', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Crear Bloque
app.post('/crearBloque', (req, res) => {
    let emp = req.body;
    var sql = "INSERT INTO BLOQUE (NOMBRE) \
    VALUES (?);";
    mysqlConnection.query(sql, [emp.nombre], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Bloque creado' })
        } else
            res.json({ msg: 'Error: Error al crear el bloque' })
    })
});

//Eliminar Bloque
app.post('/eliminarBloque', (req, res) => {
    let emp = req.body;
    var sql = "DELETE FROM BLOQUE WHERE idbloque=?";
    mysqlConnection.query(sql, [emp.idbloque], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Bloque eliminado' })
        } else
            res.json({ msg: 'Error: Error al eliminar el bloque' })
    })
});

//Actualizar Bloque
app.post('/actualizarBloque', (req, res) => {
    let emp = req.body;
    var sql = "UPDATE BLOQUE SET NOMBRE =? WHERE idbloque=?";
    mysqlConnection.query(sql, [emp.nombreemp.idbloque], (err, rows, fields) => {
        if (!err) {
            res.json({ msg: 'Exito: Bloque modificado' })
        } else
            res.json({ msg: 'Error: Error al modificar el bloque' })
    })
});


//-------------------------------------------------------
//Cantidad de alumnos en el anio actual
app.get('/getAlumnosAnio', (req, res) => {
    mysqlConnection.query('SELECT COUNT(*) AS "alumnos" FROM ALUMNO WHERE YEAR(CURDATE());', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Cantidad de docentes en el anio actual
app.get('/getDocentesAnio', (req, res) => {
    mysqlConnection.query('SELECT COUNT(*) AS "docentes" FROM PERSONAL WHERE YEAR(CURDATE()) AND TIPO_PERSONAL_tipo = 2;', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//aniosRegistrados
app.get('/aniosRegistrados', (req, res) => {
    mysqlConnection.query('SELECT YEAR(I.fecha) AS "year", COUNT(A.idalumno) AS "alumnos" FROM INSCRIPCION I JOIN ALUMNO A ON I.ALUMNO_alumno = A.idalumno \
    GROUP BY YEAR(I.fecha);', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//bloquesRegistrados
app.get('/bloquesRegistrados', (req, res) => {
    mysqlConnection.query('SELECT YEAR(I.fecha) AS "year", COUNT(A.idalumno) AS "alumnos" FROM INSCRIPCION I JOIN ALUMNO A ON I.ALUMNO_alumno = A.idalumno \
    GROUP BY YEAR(I.fecha);', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//GradosXAnio
app.post('/gradosAnio', (req, res) => {
    let emp = req.body;
    var sql = "SELECT S.GRADO_grado AS 'id_grado', G.nombre AS 'nombre_grado', COUNT(I.ALUMNO_alumno) AS 'alumnos' FROM SECCION S \
    JOIN GRADO G ON S.GRADO_grado = G.idgrado \
    JOIN INSCRIPCION I ON S.idseccion =  I.SECCION_seccion \
    JOIN PERSONAL P ON S.PERSONAL_personal = P.idpersonal \
    WHERE S.anio = ?  \
    GROUP BY S.GRADO_grado, G.nombre;";

    var sql2 = "SELECT S.GRADO_grado AS 'id_grado', G.nombre AS 'nombre_grado', COUNT(I.ALUMNO_alumno) AS 'alumnos' FROM SECCION S \
    JOIN GRADO G ON S.GRADO_grado = G.idgrado \
    JOIN INSCRIPCION I ON S.idseccion =  I.SECCION_seccion \
    JOIN PERSONAL P ON S.PERSONAL_personal = P.idpersonal \
    WHERE S.anio = ? AND S.PERSONAL_personal= ? AND S.PERSONAL_personal = P.idpersonal \
    GROUP BY S.GRADO_grado, G.nombre;";

    var sql1 = "SELECT TIPO_PERSONAL_tipo FROM PERSONAL WHERE idpersonal = ?";
    mysqlConnection.query(sql1, [emp.id_personal], (err, rows, fields) => {
        if (!err) {
            if (rows[0] != null) {
                result = JSON.stringify(rows[0])
                result = result.replace(/(^\[)/, '');
                result = result.replace(/(\]$)/, '');
                try {
                    var resultObj = JSON.parse(result);
                } catch (e) {
                    console.log("Error, not a valid JSON string");
                }
                var my_value = resultObj["TIPO_PERSONAL_tipo"];

                if (my_value == 1) {

                    mysqlConnection.query(sql, [emp.year], (err, rows2, fields) => {
                        if (!err) {
                            res.send(rows2);
                        } else
                            res.send('Error');
                    })
                } else if (my_value == 2) {
                    mysqlConnection.query(sql2, [emp.year, emp.id_personal], (err, rows3, fields) => {
                        if (!err) {
                            res.send(rows3);
                        } else
                            res.send('Error')
                    })
                } else {
                    res.send('Error')
                }
            } else {
                res.send('No existe el docente')
            }

        } else
            res.send('Error')
    })
});

//SeccionesXGrado
app.post('/seccionesGrado', (req, res) => {
    let emp = req.body;
    var sql = "SELECT S.idseccion AS 'id_seccion', S.nombre AS 'nombre_seccion', S.anio AS 'year', G.idgrado AS 'id_grado', P.idpersonal AS 'id_personal', COUNT(I.ALUMNO_alumno) AS 'alumnos' FROM SECCION S \
    JOIN GRADO G ON S.GRADO_grado = G.idgrado \
    JOIN PERSONAL P ON S.PERSONAL_personal = P.idpersonal \
    JOIN INSCRIPCION I ON S.idseccion =  I.SECCION_seccion \
    WHERE S.anio = ? AND G.idgrado= ? AND S.estado = 1 \
    GROUP BY S.idseccion, S.nombre, S.anio, G.idgrado, P.idpersonal;";

    var sql2 = "SELECT S.idseccion AS 'id_seccion', S.nombre AS 'nombre_seccion', S.anio AS 'year', G.idgrado AS 'id_grado', P.idpersonal AS 'id_personal', COUNT(I.ALUMNO_alumno) AS 'alumnos' FROM SECCION S \
    JOIN GRADO G ON S.GRADO_grado = G.idgrado \
    JOIN PERSONAL P ON S.PERSONAL_personal = P.idpersonal \
    JOIN INSCRIPCION I ON S.idseccion =  I.SECCION_seccion \
    WHERE S.anio = ? AND G.idgrado=? AND S.estado = 1 AND S.PERSONAL_personal= ? AND S.PERSONAL_personal = P.idpersonal \
    GROUP BY S.idseccion, S.nombre, S.anio, G.idgrado, P.idpersonal;";

    var sql1 = "SELECT TIPO_PERSONAL_tipo FROM PERSONAL WHERE idpersonal = ?";
    mysqlConnection.query(sql1, [emp.id_personal], (err, rows, fields) => {
        if (!err) {
            if (rows[0] != null) {
                result = JSON.stringify(rows[0])
                result = result.replace(/(^\[)/, '');
                result = result.replace(/(\]$)/, '');
                try {
                    var resultObj = JSON.parse(result);
                } catch (e) {
                    console.log("Error, not a valid JSON string");
                }
                var my_value = resultObj["TIPO_PERSONAL_tipo"];

                if (my_value == 1) {

                    mysqlConnection.query(sql, [emp.year, emp.id_grado], (err, rows2, fields) => {
                        if (!err) {
                            res.send(rows2);
                        } else
                            res.send('Error');
                    })
                } else if (my_value == 2) {
                    mysqlConnection.query(sql2, [emp.year, emp.id_grado, emp.id_personal], (err, rows3, fields) => {
                        if (!err) {
                            res.send(rows3);
                        } else
                            res.send('Error')
                    })
                } else {
                    res.send('Error')
                }
            } else {
                res.send('No existe el docente')
            }

        } else
            res.send('Error')
    })
});

//Alumnos por seccion especifica
app.post('/alumnosSeccion', (req, res) => {
    let emp = req.body;
    var sql = "SELECT A.idalumno AS 'id_alumno', A.nombre AS 'nombre_alumno', A.apellido AS 'apellido_alumno' FROM INSCRIPCION I \
    JOIN ALUMNO A ON I.ALUMNO_alumno = A.idalumno \
    WHERE I.SECCION_seccion=?;";
    mysqlConnection.query(sql, [emp.id_seccion], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else
            res.send('Error');
    })
});