import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
