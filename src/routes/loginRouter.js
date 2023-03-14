const express = require('express');
const generateToken = require('../utils/generateToken');

const loginRouter = express.Router();

// Req3
loginRouter.post('/', async (req, res) => {
  const randomToken = generateToken();

  res.status(200).json({ token: randomToken });
});

module.exports = loginRouter;