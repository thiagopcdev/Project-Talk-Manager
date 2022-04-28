const emailRegex = new RegExp(/^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/);
const BAD_REQ = 400;

const authLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(BAD_REQ).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(BAD_REQ).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return res.status(BAD_REQ).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return res.status(BAD_REQ).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
};

module.exports = authLogin;