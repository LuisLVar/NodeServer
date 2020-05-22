import { Request, Response } from 'express';
import pool from '../database';


class ApiController {

    public async getAlumnos(req: Request, res: Response) {
        const alumnos = await pool.query('SELECT * FROM alumno');
        res.json(alumnos);
    }
}

export const apiController = new ApiController();