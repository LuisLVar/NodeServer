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
        const personas = await pool.query('select * from personal where usuario = ? and password = ?',
        [emp.usuario, emp.password]);
        res.json(personas);
    }

//Ciclo

public async getCiclos(req: Request, res: Response) {
    const ciclos = await pool.query('select * from ciclo');        
        res.json(ciclos);
    
}

public async crearCiclo(req: Request, res: Response) {
    let emp = req.body;
    const ciclo = await pool.query('insert into ciclo (year) \
    values (?)',[emp.year]);
        res.json(ciclo);
    
}

public async eliminarCiclo(req: Request, res: Response) {
    let emp = req.body;
    const ciclo = await pool.query('delete from ciclo where ciclo=?',[emp.ciclo]);
    res.json(ciclo);
}

//Alumnos
    public async existeAlumno(req: Request, res: Response) {
        let emp = req.body;
        const personas = await pool.query('select * from alumno where nombre = ? and apellido = ? and id_alumno = ?',
        [emp.nombre, emp.apellido, emp.idalumno]);
        if(isEmptyObject(personas)){            
            res.json({ existe: false })
        }else{
            res.json({ existe: true })
        }
        
    }

    public async getAlumnos(req: Request, res: Response) {
        const alumnos = await pool.query('select * from alumno');        
            res.json(alumnos);
        
    }

    public async crearAlumno(req: Request, res: Response) {
        let emp = req.body;
        const alumnos = await pool.query('insert into alumno (nombre,apellido,direccion,telefono,cui,encargado,fecha_nacimiento,estado) \
        values (?,?,?,?,?,?,?,?)',[emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.cui, emp.encargado, emp.fecha_nacimiento, emp.estado]);
            res.json(alumnos);
        
    }

    public async eliminarAlumno(req: Request, res: Response) {
        let emp = req.body;
        const alumnos = await pool.query('update alumno set estado = 0 where id_alumno=?',[emp.id_alumno]);
        res.json(alumnos);
    }

    public async actualizarAlumno(req: Request, res: Response) {
        let emp = req.body;
        const alumnos = await pool.query('update alumno set nombre =?,apellido=?,direccion=?,telefono=?,cui=?, \
        encargado=?,fecha_nacimiento=?,estado=? where id_alumno=?',[emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.cui, 
            emp.encargado, emp.fecha_nacimiento, emp.estado, emp.id_alumno]);
        
            res.json({ msg: 'Exito: Alumno modificado' })
        
    }

//Aspectos

public async existeAspecto(req: Request, res: Response) {
    let emp = req.body;
    const aspectos = await pool.query('select * from aspecto where nombre = ?',
    [emp.nombre]);
    if(isEmptyObject(aspectos)){            
        res.json({ existe: false })
    }else{
        res.json({ existe: true })
    }
    
}

public async getAspectos(req: Request, res: Response) {
    const aspectos = await pool.query('select * from aspecto');        
        res.json(aspectos);
   
    
}

public async crearAspecto(req: Request, res: Response) {
    let emp = req.body;
    const aspectos = await pool.query('insert into aspecto (nombre) \
    values (?)',[emp.nombre]);
        res.json(aspectos);
    
}

public async eliminarAspecto(req: Request, res: Response) {
    let emp = req.body;
    const aspectos = await pool.query('delete from aspecto where aspecto=? and nombre=?',[emp.aspecto, emp.nombre]);
    res.json(aspectos);
}

public async actualizarAspecto(req: Request, res: Response) {
    let emp = req.body;
    const aspectos = await pool.query('update aspecto set nombre =? where aspecto=?',[emp.nombre, emp.aspecto]);
        res.json(aspectos);
    
}

//Grados
public async existeGrado(req: Request, res: Response) {
    let emp = req.body;
    const grados = await pool.query('select * from grado where nombre = ?',
    [emp.nombre]);
    if(isEmptyObject(grados)){            
        res.json({ existe: false })
    }else{
        res.json({ existe: true })
    }
    
}

public async getGrados(req: Request, res: Response) {
    const grados = await pool.query('select * from grado');        
        res.json(grados);
   
    
}

public async crearGrado(req: Request, res: Response) {
    let emp = req.body;
    const grados = await pool.query('insert into grado (nombre) \
    values (?)',[emp.nombre]);
        res.json(grados);
    
}

public async eliminarGrado(req: Request, res: Response) {
    let emp = req.body;
    const grados = await pool.query('delete from grado where grado=? and nombre=?',[emp.grado, emp.nombre]);
    res.json(grados);
}

public async actualizarGrado(req: Request, res: Response) {
    let emp = req.body;
    const grados = await pool.query('update grado set nombre =? where grado=?',[emp.nombre, emp.grado]);
        res.json(grados);
    
}
//Secciones por grado
public async getSeccionGrado(req: Request, res: Response) {
    let emp = req.body;
    const grados = await pool.query('select seccion.seccion, seccion.nombre from seccion join grado on seccion.grado_grado = grado.grado where grado.nombre =?',[emp.nombre]);
        res.json(grados);
    
}

//Inscripcion

public async crearInscripcion(req: Request, res: Response) {
    let emp = req.body;
    const inscripcion = await pool.query('insert into inscripcion values (?,?,?)',[emp.fecha, emp.seccion, emp.alumno]);
        res.json(inscripcion);
    
}

public async eliminarInscripcion(req: Request, res: Response) {
    let emp = req.body;
    const inscripcion = await pool.query('delete from inscripcion where seccion_seccion=? and alumno_alumno=?',[emp.seccion, emp.alumno]);
    res.json(inscripcion);
}

//Secciones
public async getSecciones(req: Request, res: Response) {
    const secciones = await pool.query('select seccion.seccion, seccion.nombre, seccion.estado, grado.nombre as "nombre_grado", \
    personal.nombre as "nombre_personal", grado.grado, personal.id_personal from seccion join grado on seccion.grado_grado = grado.grado \
    join personal on seccion.personal_personal = personal.id_personal');        
        res.json(secciones);
   
}

public async existeSeccion(req: Request, res: Response) {
    let emp = req.body;
    const seccion = await pool.query('select * from seccion where nombre = ?',
    [emp.nombre]);
    if(isEmptyObject(seccion)){            
        res.json({ existe: false })
    }else{
        res.json({ existe: true })
    }
    
}

public async crearSeccion(req: Request, res: Response) {
    let emp = req.body;
    const seccion = await pool.query('insert into seccion (nombre, estado, grado_grado, personal_personal, ciclo_ciclo) \
    values (?,?,?,?,?)',[emp.nombre, emp.estado, emp.GRADO_grado, emp.PERSONAL_personal, emp.CICLO_ciclo]);
        res.json(seccion);
    
}

public async eliminarSeccion(req: Request, res: Response) {
    let emp = req.body;
    const seccion = await pool.query('delete from seccion where seccion=?',[emp.seccion]);
    res.json(seccion);
}

public async actualizarSeccion(req: Request, res: Response) {
    let emp = req.body;
    const seccion = await pool.query('update seccion set nombre = ?, estado=?, grado_grado=?, personal_personal=?, ciclo_ciclo=? where seccion=?',
    [emp.nombre, emp.estado, emp.GRADO_grado, emp.PERSONAL_personal, emp.CICLO_ciclo, emp.seccion]);
        res.json(seccion);
    
}

//Personal
public async getPersonal(req: Request, res: Response) {
    const personal = await pool.query('select p.id_personal, p.nombre, p.apellido, p.direccion, p.telefono, p.usuario, p.password, p.estado, \
    escuela.nombre as "nombre_escuela", tipo_personal.nombre as "nombre_tipo", p.escuela_escuela, p.tipo_personal_tipo \
    from personal p join escuela on p.escuela_escuela = escuela.escuela \
    join tipo_personal on p.tipo_personal_tipo = tipo_personal.tipo');        
        res.json(personal);
   
}

public async crearPersonal(req: Request, res: Response) {
    let emp = req.body;
    const personal = await pool.query('insert into personal (nombre, apellido, direccion, telefono, usuario, password, estado, \
        escuela_escuela, tipo_personal_tipo) values (?,?,?,?,?,?,?,?,?)',
        [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.usuario, emp.password, emp.estado, emp.ESCUELA_escuela, emp.TIPO_PERSONAL_tipo]);
        res.json(personal);
    
}

public async eliminarPersonal(req: Request, res: Response) {
    let emp = req.body;
    const personal = await pool.query('delete from personal where id_personal=?',[emp.id_personal]);
    res.json(personal);
}

public async actualizarPersonal(req: Request, res: Response) {
    let emp = req.body;
    const personal = await pool.query('update personal set nombre =?, apellido=?, direccion=?, telefono=?, usuario=?, \
     password=?, estado=?, escuela_escuela=?, tipo_personal_tipo=? \
    where id_personal=?',
    [emp.nombre, emp.apellido, emp.direccion, emp.telefono, emp.usuario, emp.password, emp.estado, emp.ESCUELA_escuela, emp.TIPO_PERSONAL_tipo, emp.id_personal]);
        res.json(personal);
    
}

//getEscuelas
public async getEscuelas(req: Request, res: Response) {
    const escuelas = await pool.query('select * from escuela');        
        res.json(escuelas);   
}

//Obtener el tipo del personal
public async getTipoPersonal(req: Request, res: Response) {
    let emp = req.body;
    const personal = await pool.query('select tipo_personal.nombre as "nombre_tipo", p.nombre from personal p \
    join escuela on p.escuela_escuela = escuela.escuela \
    join tipo_personal on p.tipo_personal_tipo = tipo_personal.tipo');
    res.json(personal);
}

//Materias
public async getMaterias(req: Request, res: Response) {
    const materias = await pool.query('select * from materia');        
        res.json(materias);
   
}

public async crearMateria(req: Request, res: Response) {
    let emp = req.body;
    const materia = await pool.query('insert into materia (nombre, contenido) \
    values (?,?)',[emp.nombre, emp.contenido]);
        res.json(materia);
    
}

public async eliminarMateria(req: Request, res: Response) {
    let emp = req.body;
    const materia = await pool.query('delete from materia where materia=?',[emp.materia]);
    res.json(materia);
}

public async actualizarMateria(req: Request, res: Response) {
    let emp = req.body;
    const materia = await pool.query('update materia set nombre =?, contenido=? where materia=?',
    [emp.nombre, emp.contenido, emp.materia]);
        res.json(materia);
    
}

//Bloques
public async getBloques(req: Request, res: Response) {
    const bloques = await pool.query('select * from bloque');        
        res.json(bloques);
   
}

public async crearBloque(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('insert into bloque (nombre) \
    values (?)',[emp.nombre]);
        res.json(bloque);
    
}

public async eliminarBloque(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('delete from bloque where bloque=?',[emp.bloque]);
    res.json(bloque);
}

public async actualizarBloque(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('update bloque set nombre =? where idbloque=?',
    [emp.nombre, emp.bloque]);
        res.json(bloque);
    
}

//Cantidad de alumnos en el anio actual
public async getAlumnosAnio(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('select count(*) as "alumnos" from alumno where year(curdate())',
    [emp.nombre, emp.bloque]);
        res.json(bloque);
    
}

//Cantidad de docentes en el anio actual
public async getDocentesAnio(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('select count(*) as "docentes" from personal where year(curdate()) and tipo_personal_tipo = 2');
        res.json(bloque);
    
}

//Alumnos por años
public async alumnosPorYear(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('select year(i.fecha) as "year", count(a.id_alumno) as "alumnos" from inscripcion i join alumno a on i.alumno_alumno = a.id_alumno \
    group by year(i.fecha)');
        res.json(bloque);
    
}

//Alumnos por seccion especifica
public async alumnosPorSeccion(req: Request, res: Response) {
    let emp = req.body;
    const bloque = await pool.query('select a.id_alumno as "id_alumno", a.nombre as "nombre_alumno", a.apellido as "apellido_alumno" from inscripcion i \
    join alumno a on i.alumno_alumno = a.id_alumno where i.seccion_seccion=?',
    [emp.seccion]);
        res.json(bloque);
    
}




}

export const apiController = new ApiController();