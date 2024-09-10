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
//Route to check if the API information is correct
kubernetesRouter.post(
	'/checkAPI',
	kubernetesController.checkAPI,
	(_req, res) => {
		res.status(200).json({ message: 'ok' });
	}
);
//Route to check if the environment file exists and if it has information
kubernetesRouter.get('/checkENV', generalController.checkEnv, (_req, res) => {
	res.status(200).json(res.locals.env);
});
//Route to create logs
kubernetesRouter.post(
	'/createLogs',
	kubernetesController.getPods,
	generalController.writeLog,
	(_req, res) => {
		res.status(200).json(res.locals.logs);
	}
);
//Route to get logs
kubernetesRouter.get('/getLogs', generalController.getLogs, (_req, res) => {
	res.status(200).json(res.locals.dirLogs);
});
//Route to download a log
kubernetesRouter.get(
	'/getDownloadLogs/:log',
	generalController.getDownloadSpecificLog,
	(_req, res) => {
		res.status(200);
	}
);
//Route to delete a log
kubernetesRouter.delete(
	'/deleteLogs/:log',
	generalController.deleteSpecificLog,
	(_req, res) => {
		res.status(200).json(res.locals.deletedLog);
	}
);
export default kubernetesRouter;
