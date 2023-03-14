const express = require('express');
const path = require('path');
const { readFile } = require('../manageFiles');

const talkerRouter = express.Router();

const itensPath = path.join(__dirname, '../talker.json');

// Req1
talkerRouter.get('/', async (req, res) => {
  const content = await readFile(itensPath);

  res.status(200).json(content);
});

module.exports = talkerRouter;