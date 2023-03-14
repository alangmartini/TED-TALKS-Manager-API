const validateEmail = (req, res, next) => {
  const user = req.body;

  const { email } = user;

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });        
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });      
  }

  next();
};

const validatePassword = (req, res, next) => {
  const user = req.body;

  const { password } = user;

  if (!password) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });      
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });      
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
};