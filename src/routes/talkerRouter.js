const express = require('express');
const path = require('path');

// Validations
const { validateAutorization } = require('../middlewares/validateAutorization');
const {
  validateName,
  validateAge,
  validateWatchedAt,
  validateWatchedAtQuery,
  validateRate,
  validateRateQuery,
  validateRateBody,
  validateTalkObject,
} = require('../middlewares/validateTalkObject');

// Files management
const { updateFile, addToFile, updateRateOnFile } = require('../manageFiles/update');
const readFile = require('../manageFiles/read');
const deleteFromFile = require('../manageFiles/delete');

// Utils
const applyFilter = require('../utils/applyFilter');

const talkerRouter = express.Router();

const itensPath = path.join(__dirname, '../talker.json');

talkerRouter.get('/', async (req, res) => {
  const content = await readFile(itensPath);

  res.status(200).json(content);
});

talkerRouter.get(
  '/search',
  validateAutorization,
  validateRateQuery,
  validateWatchedAtQuery,
  async (req, res) => {
    const { q, rate, date } = req.query;
    const currentTalkers = await readFile(itensPath);

    const filters = {
      searchTerm: q,
      rate,
      date: date.replaceAll('"', ''),
    };

    const filteredTalkers = applyFilter(filters, currentTalkers);
    return res.status(200).json(filteredTalkers);
  },
);

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const content = await readFile(itensPath);
  
  if (!content) {
    throw new Error('Algo deu errado com a requisição');
  }

  const talkerObj = content.find((talker) => talker.id === Number(id));

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

talkerRouter.delete(
  '/:id',
  validateAutorization,
  async (req, res) => {
    const { id } = req.params;
    await deleteFromFile(itensPath, id);

    return res.status(204).json({});
  },
);

talkerRouter.patch(
  '/rate/:id',
  validateAutorization,
  validateRateBody,
  async (req, res) => {
    const { id } = req.params;
    const { rate } = req.body;

    try {
      const error = await updateRateOnFile(itensPath, rate, id);

      if (error.type) {
        console.error(error.type, error.message);
        throw new Error();
      }

      return res.status(204).json({});
    } catch (e) {
      return res.status(400).json({ message: 'Something went pretty badly' });
    }
  },
);

module.exports = talkerRouter;