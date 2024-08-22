import { Router } from 'express';
import prometheusController from '../controllers/prometheusController.js';

const prometheusRouter = Router();

// Route to fetch CPU usage metrics
prometheusRouter.get('/metrics/cpu', prometheusController.fetchCpuUsage, (_req, res) => {
    res.status(200).json(res.locals.cpuData);
});

// Route to fetch memory usage metrics
prometheusRouter.get('/metrics/memory', prometheusController.fetchMemoryUsage, (_req, res) => {
    res.status(200).json(res.locals.memoryData);
});

export default prometheusRouter;