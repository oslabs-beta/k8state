import express, { Request, Response, NextFunction } from 'express';
import router from './routes/kubernetesRouter.js';

const app = express();
const PORT = 8080;

// Middleware example
app.use(express.json());

// Kubernetes Router Handler
app.use('/api', router);

// Kubernetes 404 Route Handler
app.use('/', (_req, res) => {
	res.status(404).send('Error page not found!');
});

// Express Global Error Handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.log(err);
	res.status(500).send('Something broke!');
});

// Starts the app on the given port
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
