import generalService from '../services/generalService.js';
import kubernetesService from '../services/kubernetesService.js';
import fs from 'fs';
import path from 'path';
const generalController = {
    //middleware function to check if the env file exists
    checkEnv: (_req, res, next) => {
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
            res.status(500).json({ message: 'error checking env ' });
            throw new Error(`Something went wrong: ${error.message}`);
        }
    },
    //middleware function to write logs
    writeLog: async (_req, res, next) => {
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
    //middleware function to provide a file for download to the frontend
    getDownloadSpecificLog: (req, res, next) => {
        const logDir = path.resolve('../logs/') + '/' + req.params.log;
        res.download(logDir, (err) => {
            if (err) {
                throw new Error(`Something went wrong: ${err.message}`);
            }
            else {
                next();
            }
        });
    },
    //middleware function to grab the logs in the logs folder
    getLogs: (_req, res, next) => {
        generalService.checkLogs();
        const result = generalService.getDirLogs();
        const logHolder = result.map((element, _index) => {
            const logDir = path.resolve('../logs/') + '/' + element;
            return {
                name: element,
                log: JSON.parse(fs.readFileSync(logDir, 'utf-8')),
            };
        });
        res.locals.dirLogs = logHolder;
        next();
    },
    //middleware function to delete a specific log in the logs folder
    deleteSpecificLog: (req, res, next) => {
        const logDir = path.resolve('../logs/') + '/' + req.params.log;
        try {
            fs.unlinkSync(logDir);
            res.locals.deletedLog = req.params.log;
        }
        catch (error) {
            res.locals.deletedLog = 'failed to delete';
            throw new Error(`Something went wrong: ${error.message}`);
        }
        next();
    },
};
export default generalController;
