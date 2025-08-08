import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import castRoute from './routes/castRoute.js'
import { fetchAndCacheCast } from './services/actorsService.js'
import errorHandler from './middleware/errorMiddleware.js'


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', castRoute)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  fetchAndCacheCast()
});
