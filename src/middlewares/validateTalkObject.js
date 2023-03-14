const isValidDate = require('../utils/validateDate');

const validateName = (req, res, next) => {
  const talkObject = req.body;
  const { name } = talkObject;

  if (!name) {
    return res.status(400).json({
    message: 'O campo "name" é obrigatório',
    });        
  }

  if (name.length < 3) {
    return res.status(400).json({
    message: 'O "name" deve ter pelo menos 3 caracteres',
    });      
  }

  next();
};

const validateAge = (req, res, next) => {
  const talkObject = req.body;
  const { age } = talkObject;

  if (!age) {
    return res.status(400).json({
    message: 'O campo "age" é obrigatório',
    });      
  }

  if (age < 18 || !Number.isInteger(age)) {
    return res.status(400).json({
    message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });      
  }

  next();
};

const TALK_ERRORS = {
  noTalk: {
    message: 'O campo "talk" é obrigatório',
  },
  noWatchedAt: {
    message: 'O campo "watchedAt" é obrigatório',
  },
  invalidWatchedAt: {
    message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
  },
  noRate: {
    message: 'O campo "rate" é obrigatório',
  },
  invalidRate: {
    message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
  },
};

const validateWatchedAt = (req, res, next) => {
  const talkObject = req.body;
  const { talk } = talkObject;

  if (!talk.watchedAt) {
    return res.status(400).json(TALK_ERRORS.noWatchedAt);      
  }

  if (!isValidDate(talk.watchedAt)) {
    return res.status(400).json(TALK_ERRORS.invalidWatchedAt);      
  }

  next();
};

const validateRate = (req, res, next) => {
  const talkObject = req.body;
  const { talk } = talkObject;

  if (talk.rate === undefined) {
    return res.status(400).json(TALK_ERRORS.noRate);      
  }

  if (talk.rate < 1 || talk.rate > 5 || !Number.isInteger(talk.rate)) {
    return res.status(400).json(TALK_ERRORS.invalidRate);      
  }

  next();
};

const validateTalkObject = async (req, res, next) => {
  const talkObject = req.body;
  const { talk } = talkObject;

  if (!talk) {
    return res.status(400).json(TALK_ERRORS.noTalk);      
  }

  next();
};

module.exports = {
  validateName,
  validateAge,
  validateWatchedAt,
  validateRate,
  validateTalkObject,
};