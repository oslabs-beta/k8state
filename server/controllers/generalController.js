import generalService from '../services/generalService.js';
import kubernetesService from '../services/kubernetesService.js';
import fs from 'fs';
import path from 'path';
const generalController = {
    //middleware function to check if the env file exists
    checkEnv: (_req, res, next) => {
        ;
        try {
            const check = generalService.checkEnv();
            if (check === 'exist') {
                res.locals.env = {
                    address: process.env.KUBERNETES_SERVER,
                    key: process.env.KUBERNETES_TOKEN,
                };
            }
            else {
                res.locals.env = check;
            }
            next();
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: 'error checking env ' });
        }
    },
    writeLog: async (_req, res, next) => {
        ;
        generalService.checkLogs();
        const pods = res.locals.podData;
        const podNames = [];
        for (let element of pods) {
            podNames.push({
                name: element.name,
                namespace: element.namespace,
            });
        }
        const logs = await kubernetesService.getLogs(podNames);
        generalService.writeLogs(logs);
        res.locals.logs = logs;
        next();
    },
    getDirectoryLogs: (_req, res, next) => {
        generalService.checkLogs();
        const result = generalService.getDirLogs();
        res.locals.dirLogs = result;
        //console.log(result);
        next();
    },
    getDownloadSpecificLog: (req, res, next) => {
        const logDir = path.resolve('../logs/') + '/' + req.params.log;
        res.download(logDir, (err) => {
            if (err) {
                console.log(err);
            }
            else {
                next();
            }
        });
    },
    getReadSpecificLog: (req, res, next) => {
        const logDir = path.resolve('../logs/') + '/' + req.params.log;
        const info = JSON.parse(fs.readFileSync(logDir, 'utf-8'));
        //console.log(info);
        res.locals.specificLog = info;
        next();
    },
    deleteSpecificLog: (req, res, next) => {
        const logDir = path.resolve('../logs/') + '/' + req.params.log;
        try {
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
