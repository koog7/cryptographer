import express from 'express';
const Vigenere = require('caesar-salad').Vigenere;

const cryptoRouter = express.Router();
cryptoRouter.use(express.json());

cryptoRouter.post('/encode', async (req, res) => {
    const { password, encode } = req.body;

    if (password.trim() === '' || encode.trim() === '') {
        return res.status(400).send('Password and encode text are required');
    }

    try {
        const encodeText = Vigenere.Cipher(password).crypt(encode);
        res.send({ encodeText });
    } catch (error) {
        res.status(500).send('Error encoding text');
    }
});

cryptoRouter.post('/decode', (req, res) => {
    const { password, decode } = req.body;

    if (password.trim() === '' || decode.trim() === '') {
        return res.status(400).send('Password and encode text are required');
    }

    try {
        const decodedText = Vigenere.Decipher(password).crypt(decode);
        res.send({ decodedText });
    } catch (error) {
        res.status(500).send('Error encoding text');
    }
});

export default cryptoRouter;
