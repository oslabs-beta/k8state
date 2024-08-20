import express from 'express';
// import kubernetesRouter from './routes/kubernetesRouter.ts';
const app = express();
const PORT = 8080;
// Middleware example
app.use(express.json());
// Kubernetes Router Handler
// app.use('/api', kubernetesRouter);
// Basic route example
app.get('/api', (_req, res) => {
	res.send('Hello, TypeScript with Express!');
});
// Error handling middleware
app.use((err, _req, res, _next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
