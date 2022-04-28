const objErrorGenerator = (status, message) => ({ status, message });

const ERRORS = {
  TOKEN_NULL: objErrorGenerator(401, 'Token não encontrado'),
  TOKEN_INV: objErrorGenerator(401, 'Token inválido'),
  NAME_NULL: objErrorGenerator(400, 'O campo "name" é obrigatório'),
  NAME_SMALL: objErrorGenerator(400, 'O "name" deve ter pelo menos 3 caracteres'),
  AGE_NULL: objErrorGenerator(400, 'O campo "age" é obrigatório'),
  AGE_INV: objErrorGenerator(400, 'A pessoa palestrante deve ser maior de idade'),
  WATCHED_FORMAT: objErrorGenerator(400, 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"'),
  RATE_RANGE: objErrorGenerator(400, 'O campo "rate" deve ser um inteiro de 1 à 5'),
  TALK_NULL: objErrorGenerator(400, 
    'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios'),
};

module.exports = ERRORS;