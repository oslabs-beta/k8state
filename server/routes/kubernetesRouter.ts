import { Router } from 'express';
import kubernetesController from '../controllers/kubernetesController.js';

const router = Router();

// Route to get all pods in the cluster
router.get('/pods', kubernetesController.getPods, (_req, res) => {
    res.status(200).json(res.locals.podData);
});

// Route to get all details of a specific pod
router.get('/pods/:namespace/:podName', kubernetesController.getPodDetails, (req, res) => {
    res.status(200).json(res.locals.pod);
});

// Route to get all services in the cluster
router.get('/services', kubernetesController.getServices, (req, res) => {
    res.status(200).json(res.locals.serviceData);
});

// Route to get all nodes in the cluster
router.get('/nodes', kubernetesController.getNodes, (req, res) => {
    res.status(200).json(res.locals.nodeData);
});

export default router;