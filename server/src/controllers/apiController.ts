import { Request, Response } from 'express';
import pool from '../database';


class ApiController {

    public async getEscuelas(req: Request, res: Response) {
        const escuelas = await pool.query('SELECT * FROM ESCUELA');
        res.json(escuelas);
    }
}

export const apiController = new ApiController();