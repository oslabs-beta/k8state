import { Request, Response, NextFunction } from 'express';
import generalService from '../services/generalService.js';

const generalController = {
    //middleware function to check if the env file exists
    checkEnv: (_req: Request, res: Response, next: NextFunction) => {
        interface addresskey {
            address: string;
            key: string;
        };
        try{
            const check =  generalService.checkEnv();
            if(check === 'exist'){
                res.locals.env = {
                    address: process.env.KUBERNETES_SERVER,
                    key: process.env.KUBERNETES_TOKEN,
                } as addresskey;
            }
            else{
                res.locals.env = check;
            }
            next();
        }
        catch (error){
            console.log(error);
            res.status(500).json({ message: 'error checking env '});
        }
    },
    test: (_req: Request, _res: Response, next: NextFunction) => {
        generalService.checkLogs();
        next();
    }
};

export default generalController;