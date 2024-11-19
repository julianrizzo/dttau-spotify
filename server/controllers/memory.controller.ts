import { Request, Response } from "npm:express";

import { getUserID, getAccessToken, getRefreshToken, getDeviceID } from '../helpers/memory.helper.ts';

const getMemoryItems = (_req: Request, res: Response) => {
    res.json({
        'Global Access Token': getAccessToken(),
        'Global Refresh Token': getRefreshToken(),
        'User ID': getUserID(),
        'Global Device ID': getDeviceID()
    });
};

export {
    getMemoryItems
}