import express from 'express';
import router from './routes/kubernetesRouter.js';
import cors from 'cors';
const app = express();
const PORT = 8080;
// Middleware
app.use(express.json());
app.use(cors());
// Kubernetes Router Handler
app.use('/api', router);
// Kubernetes 404 Route Handler
app.use('/', (_req, res) => {
    res.status(404).send('Error page not found!');
});
// Express Global Error Handler
app.use((err, _req, res, _next) => {
    console.log(err);
    res.status(500).send('Something broke!');
});
// Starts the app on the given port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
