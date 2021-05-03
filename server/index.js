import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import institutionRoutes from './routes/institutions.js';
import studentRoutes from './routes/student.js'
import relationsRoutes from './routes/relations.js'
import verifierRoutes from './routes/verifier.js'
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(bodyParser.json({ extended:true}));
app.use(bodyParser.urlencoded({ extended:true}));
app.use(cors());

app.use('/institutions', institutionRoutes);
app.use('/students', studentRoutes);
app.use('/relations', relationsRoutes);
app.use('/verifiers', verifierRoutes);
app.get('/', (req, res) => {
  res.send('Hello to creducate-api')
});
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);