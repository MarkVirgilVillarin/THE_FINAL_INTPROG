import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import errorHandler from './_middleware/error-handler';
import accountsController from './accounts/accounts.controller';
import swaggerDocs from './_helpers/swagger';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// CORS – use CORS_ORIGIN env var in production (set to deployed Angular URL)
const corsOrigin = process.env.CORS_ORIGIN;
app.use(cors({
  origin: corsOrigin
    ? corsOrigin
    : (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => callback(null, true),
  credentials: true
}));

// API routes
app.use('/accounts', accountsController);

// Swagger docs
app.use('/api-docs', swaggerDocs);

// Global error handler (must be last)
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
