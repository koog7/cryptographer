import express from 'express';
import cryptoRouter from "./routers/crypto";
import cors from 'cors';

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json())
app.use('/', cryptoRouter)

app.listen(port, () => {
    console.log('Server starter : http://127.0.0.1:' + port);
});