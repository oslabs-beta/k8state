import generalService from '../services/generalService.js';
import kubernetesService from '../services/kubernetesService.js';
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
    getWriteLog: async (_req, res, next) => {
        ;
        generalService.checkLogs();
        const pods = res.locals.podData;
        const podNames = [];
        for (let element of pods) {
            podNames.push({
                name: element.name,
                namespace: element.namespace
            });
        }
        const logs = await kubernetesService.getLogs(podNames);
        generalService.writeLogs(logs);
        res.locals.logs = logs;
        next();
    }
};
export default generalController;
