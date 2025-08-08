import express from 'express'
import cors from 'cors'


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});