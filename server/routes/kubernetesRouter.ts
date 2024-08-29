import { Router } from 'express';
import kubernetesController from '../controllers/kubernetesController.js';
import generalController from '../controllers/generalController.js';
const kubernetesRouter = Router();

// Route to get all pods in the cluster
kubernetesRouter.get('/pods', kubernetesController.getPods, (_req, res) => {
	res.status(200).json(res.locals.podData);
});

// Route to get all details of a specific pod
kubernetesRouter.get(
	'/pods/:namespace/:podName',
	kubernetesController.getPodDetails,
	(_req, res) => {
		res.status(200).json(res.locals.pod);
	}
);

// Route to get all services in the cluster
kubernetesRouter.get(
	'/services',
	kubernetesController.getServices,
	(_req, res) => {
		res.status(200).json(res.locals.serviceData);
	}
);

// Route to get all nodes in the cluster
kubernetesRouter.get('/nodes', kubernetesController.getNodes, (_req, res) => {
    res.status(200).json(res.locals.nodeData);
});
kubernetesRouter.post('/checkAPI', kubernetesController.checkAPI, (_req, res) => {
    res.status(200).json({ message: 'ok' });
})
kubernetesRouter.get('/checkENV', generalController.checkEnv, (_req, res) => {
	res.status(200).json(res.locals.env);
});
kubernetesRouter.get('/createLogs', kubernetesController.getPods, generalController.writeLog, (_req, res) => {
    res.status(200).json(res.locals.logs);
})
kubernetesRouter.get('/getLogs', generalController.getDirectoryLogs, (_req, res) => {
    res.status(200).json(res.locals.dirLogs);
})
kubernetesRouter.get('/getLogs/:log',  (_req, res) => {
    res.status(200).json(res.locals.dirLog);
})
export default kubernetesRouter;
