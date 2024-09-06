import { Request, Response, NextFunction } from 'express';
import generalService from '../services/generalService.js';
import kubernetesService from '../services/kubernetesService.js';
import fs from 'fs';
import path from 'path';

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
    writeLog: async (_req: Request, res: Response, next: NextFunction) => {
        interface info {
            name: string;
            namespace: string;
        };
        generalService.checkLogs();
        const pods = res.locals.podData;
        const podNames: info[] = [];
        for(let element of pods){
            podNames.push({
                name: element.name,
                namespace: element.namespace
            } as info);
        }
        const logs = await kubernetesService.getLogs(podNames);
        generalService.writeLogs(logs);
        res.locals.logs = logs;
        next();
    },
    getDirectoryLogs: (_req: Request, res: Response, next: NextFunction) => {
        generalService.checkLogs();
        const result: string[] = generalService.getDirLogs();
        res.locals.dirLogs = result;
        //console.log(result);
        next();
    },
    getDownloadSpecificLog: (req: Request, res: Response, next: NextFunction) => {
        const logDir: string = path.resolve('../logs/') + '/' + req.params.log;
        res.download(logDir, (err) => {
            if(err){
                console.log(err);
            }
            else{
                next();
            }
        });
    },
    getReadSpecificLog: (req: Request, res: Response, next: NextFunction) => {
        const logDir: string = path.resolve('../logs/') + '/' + req.params.log;
        const info: string = fs.readFileSync(logDir, 'utf-8');
        //console.log(info);
        res.locals.specificLog = info;
        next();
    },
    deleteSpecificLog: (req: Request, res: Response, next: NextFunction) => {
        const logDir: string = path.resolve('../logs/') + '/' + req.params.log;
        try{
            fs.unlinkSync(logDir);
            res.locals.deletedLog = req.params.log;
        }
        catch (error) {
            console.log(error);
            res.locals.deletedLog = 'failed to delete';
        }
        next();
    }
};

export default generalController;
