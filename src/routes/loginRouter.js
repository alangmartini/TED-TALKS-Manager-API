const express = require('express');
const generateToken = require('../utils/generateToken');
const { validateEmail, validatePassword } = require('../middlewares/validateEmailAndId');

const loginRouter = express.Router();

// Req3
// Req4
loginRouter.post(
  '/', 
  validateEmail,
  validatePassword,
  async (req, res) => {
    const randomToken = generateToken();

    return res.status(200).json({ token: randomToken });
  },
);

module.exports = loginRouter;