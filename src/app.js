const express = require('express');
const { talkerRouter } = require('./routes/index');

const app = express();
app.use(express.json());

app.use('/talker', talkerRouter);

const HTTP_OK_STATUS = 200;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

module.exports = app;