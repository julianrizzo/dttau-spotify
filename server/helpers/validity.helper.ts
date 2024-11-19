import { Request, Response, Next } from "npm:express";
import axios from "npm:axios";
import { refreshToken } from "../controllers/auth.controller.ts";
import { getAccessToken } from "./memory.helper.ts";

const lilHello = async (req: Request, res: Response, next: Next) => {
    try {
        const options = {
            url: 'https://api.spotify.com/v1/me/player',
            headers: { 'Authorization': 'Bearer ' + getAccessToken() },
            json: true,
            method: 'GET'
        };
    
        await axios(options);
    } catch {
        refreshToken(req, res);
    }
    console.log("Oh hey there sexy");
    next();
};

export {
    lilHello
}