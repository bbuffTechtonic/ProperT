import express from 'express';
import cors from 'cors';
import db from './db';
import AuthController from './controllers/AuthController';
import RentalController from './controllers/RentalController';
import UserController from './controllers/UserController';
const port = process.env.PORT || 3001;

const app = express();

app.use(cors());

app.use('/auth', AuthController);
app.use('/rentals', RentalController);
app.use('/user', UserController);

app.get('*', (req, res) => res.status(404).send('Not found'));

app.listen(port, () => console.log(`Listening on port ${port}!`));

module.exports = app;
