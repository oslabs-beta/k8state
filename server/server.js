import express from 'express';
const app = express();
const port = 8080;
// Middleware example
app.use(express.json());
// Basic route example
app.get('/api', (_req, res) => {
	res.send('Hello, TypeScript with Express!');
});
// Error handling middleware
app.use((err, _req, res, _next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
