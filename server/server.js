// Importing required dependencies and functions
import express from 'express';
import cors from 'cors';
import kubernetesRouter from './routes/kubernetesRouter';

const app = express();
const PORT = 8080;

// Middleware Setup
app.use(express.json());
app.use(cors());


// Kubernetes Router Handler
app.use('/api', kubernetesRouter);

// Global Error Handler
app.use((err, _req, res, _next) => {
  res.status(500).send('Unknown error caught by express global error handler.');
});

// Starts the server on the given port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});