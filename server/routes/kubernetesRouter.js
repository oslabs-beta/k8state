import { Router } from 'express';
import { getPods, getPodDetails, getServices, getNodes } from '../controllers/kubernetesController';
const router = Router();
// Route to get all pods in the cluster
router.get('/pods', getPods, (req, res) => {
});
// Route to get all details of a specific pod
router.get('/pods/:podName', getPodDetails, (req, res) => {
});
// Route to get all services in the cluster
router.get('/services', getServices, (req, res) => {
});
// Route to get all nodes in the cluster
router.get('/nodes', getNodes, (req, res) => {
});
export default router;
