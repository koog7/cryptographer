import express from 'express';
import cryptoRouter from "./routers/crypto";

const app = express();
const port = 8000;

app.use(express.json())
app.use('/', cryptoRouter)
app.listen(port, () => {
    console.log('Server starter : http://127.0.0.1:' + port);
});