import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connect_DB from './db/index.js';
import portfolioRoutes from './routers/portfolio.routes.js';
import  errorHandler  from './middleware/errorHandler.js';

// Configure dotenv
dotenv.config({ 
  silent: true,
  debug: false
});
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/portfolio', portfolioRoutes);

app.use(errorHandler);
connect_DB().then(() => {
    app.listen(PORT, () => console.log(`Active connection at Port: ${PORT}`) );
}).catch((err) => console.log("mongoDB Connection failed ", err));
