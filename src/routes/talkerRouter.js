const express = require('express');
const path = require('path');
const { readFile } = require('../manageFiles');

const talkerRouter = express.Router();

const itensPath = path.join(__dirname, '../talker.json');

talkerRouter.get('/', async (req, res) => {
  const content = await readFile(itensPath);

  res.status(200).json(content);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const content = await readFile(itensPath);
  console.log('cotnent is', content);
  if (!content) {
    throw new Error('Algo deu errado com a requisição');
  }

  const talkerObj = content.find((talker) => talker.id === Number(id));

  console.log('there is a talkerObj:', talkerObj);
  if (!talkerObj) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200).json(talkerObj);
});

module.exports = talkerRouter;