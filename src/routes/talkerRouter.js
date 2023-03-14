const express = require('express');
const path = require('path');
const { validateAutorization } = require('../middlewares/validateAutorization');
const {
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalkObject,
} = require('../middlewares/validateTalkObject');
const { updateFile, addToFile } = require('../manageFiles/update');
const readFile = require('../manageFiles/read');

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

talkerRouter.post(
  '/',
  validateAutorization,
  validateName,
  validateAge,
  validateTalkObject,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const talkObject = req.body;
    
    try {
      const newTalkObject = await addToFile(itensPath, talkObject);

      return res.status(201).json(newTalkObject);
    } catch (e) {
      return res.status(400).json({ message: 'Deu ruim ' });
    }
  },
);

talkerRouter.put(
  '/:id',
  validateAutorization,
  validateName,
  validateAge,
  validateTalkObject,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const talkObject = req.body;
    const { id } = req.params;
    
    try {
      const updatedTalkObject = await updateFile(itensPath, talkObject, id);

      if (!updatedTalkObject) {
        return res.status(404).json({
          message: 'Pessoa palestrante não encontrada',
        });
      }

      return res.status(200).json(updatedTalkObject);
    } catch (e) {
      return res.status(400).json({ message: 'Deu ruim ' });
    }
  },
);

module.exports = talkerRouter;