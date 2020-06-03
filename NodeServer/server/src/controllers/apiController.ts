import { Request, Response} from 'express';
import pool from '../database';

function isEmptyObject(obj:any) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}


class ApiController {
    
//Login 
    public async login(req: Request, res: Response) {
        let emp = req.body;
        const personas = await pool.query('SELECT * FROM PERSONAL WHERE usuario = ? AND password = ?',
        [emp.usuario, emp.password]);
        res.json(personas);
    }

//Ciclo

public async getCiclos(req: Request, res: Response) {
    const ciclos = await pool.query('SELECT * FROM CICLO');        
        res.json(ciclos);
    
}

public async crearCiclo(req: Request, res: Response) {
    let emp = req.body;
    const ciclo = await pool.query('INSERT INTO CICLO (YEAR) \
    VALUES (?)',[emp.year]);
        res.json(ciclo);
    
}

public async eliminarCiclo(req: Request, res: Response) {
    let emp = req.body;
    const ciclo = await pool.query('DELETE FROM CICLO WHERE ciclo=?',[emp.ciclo]);
    res.json(ciclo);
}

//Alumnos
    public async existeAlumno(req: Request, res: Response) {
        let emp = req.body;
        const personas = await pool.query('SELECT * FROM ALUMNO WHERE nombre = ? AND apellido = ? AND id_alumno = ?',
        [emp.nombre, emp.apellido, emp.idalumno]);
        if(isEmptyObject(personas)){            
            res.json({ existe: false })
        }else{
            res.json({ existe: true })
        }
        
    }

    public async getAlumnos(req: Request, res: Response) {
        const alumnos = await pool.query('SELECT * FROM ALUMNO');        
            res.json(alumnos);
        
    }

    public async crearAlumno(req: Request, res: Response) {
        let emp = req.body;
        const alumnos = await pool.query('INSERT INTO ALUMNO (NOMBRE,APELLIDO,DIRECCION,TELEFONO,CUI,ENCARGADO,FECHA_NACIMIENTO,ESTADO) \
        VALUES (?,?,?,?,?,?,?,?)',[emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.cui, emp.encargado, emp.fecha_nacimiento, emp.estado]);
            res.json(alumnos);
        
    }

    public async eliminarAlumno(req: Request, res: Response) {
        let emp = req.body;
        const alumnos = await pool.query('UPDATE ALUMNO SET estado = 0 WHERE id_alumno=?',[emp.id_alumno]);
        res.json(alumnos);
    }

    public async actualizarAlumno(req: Request, res: Response) {
        let emp = req.body;
        const alumnos = await pool.query('UPDATE ALUMNO SET NOMBRE =?,APELLIDO=?,DIRECCION=?,TELEFONO=?,CUI=?, \
        ENCARGADO=?,FECHA_NACIMIENTO=?,ESTADO=? WHERE id_alumno=?',[emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.cui, 
            emp.encargado, emp.fecha_nacimiento, emp.estado, emp.id_alumno]);
        
            res.json({ msg: 'Exito: Alumno modificado' })
        
    }

//Aspectos

public async existeAspecto(req: Request, res: Response) {
    let emp = req.body;
    const aspectos = await pool.query('SELECT * FROM ASPECTO WHERE nombre = ?',
    [emp.nombre]);
    if(isEmptyObject(aspectos)){            
        res.json({ existe: false })
    }else{
        res.json({ existe: true })
    }
    
}

public async getAspectos(req: Request, res: Response) {
    const aspectos = await pool.query('SELECT * FROM ASPECTO');        
        res.json(aspectos);
   
    
}

public async crearAspecto(req: Request, res: Response) {
    let emp = req.body;
    const aspectos = await pool.query('INSERT INTO ASPECTO (NOMBRE) \
    VALUES (?)',[emp.nombre]);
        res.json(aspectos);
    
}

public async eliminarAspecto(req: Request, res: Response) {
    let emp = req.body;
    const aspectos = await pool.query('DELETE FROM ASPECTO WHERE aspecto=? AND nombre=?',[emp.aspecto, emp.nombre]);
    res.json(aspectos);
}

public async actualizarAspecto(req: Request, res: Response) {
    let emp = req.body;
    const aspectos = await pool.query('UPDATE ASPECTO SET nombre =? WHERE aspecto=?',[emp.nombre, emp.aspecto]);
        res.json(aspectos);
    
}

//Grados
public async existeGrado(req: Request, res: Response) {
    let emp = req.body;
    const grados = await pool.query('SELECT * FROM GRADO WHERE nombre = ?',
    [emp.nombre]);
    if(isEmptyObject(grados)){            
        res.json({ existe: false })
    }else{
        res.json({ existe: true })
    }
    
}

public async getGrados(req: Request, res: Response) {
    const grados = await pool.query('SELECT * FROM GRADO');        
        res.json(grados);
   
    
}

public async crearGrado(req: Request, res: Response) {
    let emp = req.body;
    const grados = await pool.query('INSERT INTO GRADO (NOMBRE) \
    VALUES (?);',[emp.nombre]);
        res.json(grados);
    
}

public async eliminarGrado(req: Request, res: Response) {
    let emp = req.body;
    const grados = await pool.query('DELETE FROM GRADO WHERE grado=? AND nombre=?',[emp.grado, emp.nombre]);
    res.json(grados);
}

public async actualizarGrado(req: Request, res: Response) {
    let emp = req.body;
    const grados = await pool.query('UPDATE GRADO SET nombre =? WHERE grado=?',[emp.nombre, emp.grado]);
        res.json(grados);
    
}
//Secciones por grado
public async getSeccionGrado(req: Request, res: Response) {
    let emp = req.body;
    const grados = await pool.query('SELECT SECCION.seccion, SECCION.nombre FROM SECCION JOIN GRADO ON SECCION.GRADO_grado = GRADO.grado WHERE GRADO.nombre =?',[emp.nombre]);
        res.json(grados);
    
}

//Inscripcion

public async crearInscripcion(req: Request, res: Response) {
    let emp = req.body;
    const inscripcion = await pool.query('INSERT INTO INSCRIPCION VALUES (?,?,?)',[emp.fecha, emp.seccion, emp.alumno]);
        res.json(inscripcion);
    
}

public async eliminarInscripcion(req: Request, res: Response) {
    let emp = req.body;
    const inscripcion = await pool.query('DELETE FROM INSCRIPCION WHERE SECCION_seccion=? AND ALUMNO_alumno=?',[emp.seccion, emp.alumno]);
    res.json(inscripcion);
}

//Secciones
public async getSecciones(req: Request, res: Response) {
    const secciones = await pool.query('SELECT SECCION.seccion, SECCION.nombre, SECCION.estado, GRADO.nombre AS "nombre_grado", \
    PERSONAL.nombre AS "nombre_personal", GRADO.grado, PERSONAL.id_personal FROM SECCION JOIN GRADO ON SECCION.GRADO_grado = GRADO.grado \
    JOIN PERSONAL ON SECCION.PERSONAL_personal = PERSONAL.id_personal');        
        res.json(secciones);
   
}

public async existeSeccion(req: Request, res: Response) {
    let emp = req.body;
    const seccion = await pool.query('SELECT * FROM SECCION WHERE nombre = ?',
    [emp.nombre]);
    if(isEmptyObject(seccion)){            
        res.json({ existe: false })
    }else{
        res.json({ existe: true })
    }
    
}

public async crearSeccion(req: Request, res: Response) {
    let emp = req.body;
    const seccion = await pool.query('INSERT INTO SECCION (nombre, estado, GRADO_grado, PERSONAL_personal, CICLO_ciclo) \
    VALUES (?,?,?,?,?)',[emp.nombre, emp.estado, emp.GRADO_grado, emp.PERSONAL_personal, emp.CICLO_ciclo]);
        res.json(seccion);
    
}

public async eliminarSeccion(req: Request, res: Response) {
    let emp = req.body;
    const seccion = await pool.query('DELETE FROM SECCION WHERE seccion=?',[emp.seccion]);
    res.json(seccion);
}

public async actualizarSeccion(req: Request, res: Response) {
    let emp = req.body;
    const seccion = await pool.query('UPDATE SECCION SET nombre = ?, estado=?, GRADO_grado=?, PERSONAL_personal=?, CICLO_ciclo=? WHERE seccion=?',
    [emp.nombre, emp.estado, emp.GRADO_grado, emp.PERSONAL_personal, emp.CICLO_ciclo, emp.seccion]);
        res.json(seccion);
    
}

//Personal
public async getPersonal(req: Request, res: Response) {
    const personal = await pool.query('SELECT P.id_personal, P.nombre, P.apellido, P.direccion, P.telefono, P.usuario, P.password, P.estado, \
    ESCUELA.nombre AS "nombre_escuela", TIPO_PERSONAL.nombre AS "nombre_tipo", P.ESCUELA_escuela, P.TIPO_PERSONAL_tipo \
    FROM PERSONAL P JOIN ESCUELA ON P.ESCUELA_escuela = ESCUELA.escuela \
    JOIN TIPO_PERSONAL ON P.TIPO_PERSONAL_tipo = TIPO_PERSONAL.tipo');        
        res.json(personal);
   
}

public async crearPersonal(req: Request, res: Response) {
    let emp = req.body;
    const personal = await pool.query('INSERT INTO PERSONAL (nombre, apellido, direccion, telefono, usuario, password, estado, \
        ESCUELA_escuela, TIPO_PERSONAL_tipo) VALUES (?,?,?,?,?,?,?,?,?)',
        [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.usuario, emp.password, emp.estado, emp.ESCUELA_escuela, emp.TIPO_PERSONAL_tipo]);
        res.json(personal);
    
}

public async eliminarPersonal(req: Request, res: Response) {
    let emp = req.body;
    const personal = await pool.query('DELETE FROM PERSONAL WHERE id_personal=?',[emp.id_personal]);
    res.json(personal);
}

public async actualizarPersonal(req: Request, res: Response) {
    let emp = req.body;
    const personal = await pool.query('UPDATE PERSONAL SET nombre =?, apellido=?, direccion=?, telefono=?, usuario=?, \
     password=?, estado=?, ESCUELA_escuela=?, TIPO_PERSONAL_tipo=? \
    WHERE id_personal=?',
    [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.usuario, emp.password, emp.estado, emp.ESCUELA_escuela, emp.TIPO_PERSONAL_tipo, emp.id_personal]);
        res.json(personal);
    
}

//getEscuelas
public async getEscuelas(req: Request, res: Response) {
    const escuelas = await pool.query('SELECT * FROM ESCUELA');        
        res.json(escuelas);   
}

//Obtener el tipo del personal
public async getTipoPersonal(req: Request, res: Response) {
    let emp = req.body;
    const personal = await pool.query('SELECT TIPO_PERSONAL.nombre AS "nombre_tipo", P.nombre FROM PERSONAL P \
    JOIN ESCUELA ON P.ESCUELA_escuela = ESCUELA.escuela \
    JOIN TIPO_PERSONAL ON P.TIPO_PERSONAL_tipo = TIPO_PERSONAL.tipo');
    res.json(personal);
}

//Materias
public async getMaterias(req: Request, res: Response) {
    const materias = await pool.query('SELECT * FROM MATERIA');        
        res.json(materias);
   
}

public async crearMateria(req: Request, res: Response) {
    let emp = req.body;
    const materia = await pool.query('INSERT INTO MATERIA (nombre, contenido) \
    VALUES (?,?)',[emp.nombre, emp.contenido]);
        res.json(materia);
    
}

public async eliminarMateria(req: Request, res: Response) {
    let emp = req.body;
    const materia = await pool.query('DELETE FROM MATERIA WHERE materia=?',[emp.materia]);
    res.json(materia);
}

public async actualizarMateria(req: Request, res: Response) {
    let emp = req.body;
    const materia = await pool.query('UPDATE MATERIA SET nombre =?, contenido=? WHERE materia=?',
    [emp.nombre, emp.contenido, emp.materia]);
        res.json(materia);
    
}

//Bloques
public async getBloques(req: Request, res: Response) {
    const bloques = await pool.query('SELECT * FROM BLOQUE');        
        res.json(bloques);
   
}

public async crearBloque(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('INSERT INTO BLOQUE (NOMBRE) \
    VALUES (?)',[emp.nombre]);
        res.json(bloque);
    
}

public async eliminarBloque(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('DELETE FROM BLOQUE WHERE bloque=?',[emp.bloque]);
    res.json(bloque);
}

public async actualizarBloque(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('UPDATE BLOQUE SET NOMBRE =? WHERE idbloque=?',
    [emp.nombre, emp.bloque]);
        res.json(bloque);
    
}

//Cantidad de alumnos en el anio actual
public async getAlumnosAnio(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('SELECT COUNT(*) AS "alumnos" FROM ALUMNO WHERE YEAR(CURDATE())',
    [emp.nombre, emp.bloque]);
        res.json(bloque);
    
}

//Cantidad de docentes en el anio actual
public async getDocentesAnio(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('SELECT COUNT(*) AS "docentes" FROM PERSONAL WHERE YEAR(CURDATE()) AND TIPO_PERSONAL_tipo = 2');
        res.json(bloque);
    
}

//Alumnos por años
public async alumnosPorYear(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('SELECT YEAR(I.fecha) AS "year", COUNT(A.id_alumno) AS "alumnos" FROM INSCRIPCION I JOIN ALUMNO A ON I.ALUMNO_alumno = A.id_alumno \
    GROUP BY YEAR(I.fecha)');
        res.json(bloque);
    
}

//Alumnos por seccion especifica
public async alumnosPorSeccion(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('SELECT A.id_alumno AS "id_alumno", A.nombre AS "nombre_alumno", A.apellido AS "apellido_alumno" FROM INSCRIPCION I \
    JOIN ALUMNO A ON I.ALUMNO_alumno = A.id_alumno WHERE I.SECCION_seccion=?',
    [emp.seccion]);
        res.json(bloque);
    
}




}

export const apiController = new ApiController();