import { Request, Response } from "npm:express";

import { resume, pause } from '../services/control.service.ts';

const resumeMusic = async (req: Request, res: Response) => {
    const response = await resume(req, res);
    res.send(response.data);
};

const pauseMusic = async (req: Request, res: Response) => {
    const response = await pause(req, res);
    res.send(response.data);
};


export {
    resumeMusic,
    pauseMusic
}