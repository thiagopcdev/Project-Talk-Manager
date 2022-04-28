const ERRORS = require('../helpers/authTalkerErrors');

const REGEX_DATE = new RegExp(/^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}$/);

const validateToken = (req, _res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return next(ERRORS.TOKEN_NULL);
  if (authorization.length !== 16) return next(ERRORS.TOKEN_INV);
  next();
};

const validateName = (req, _res, next) => {
  const { name } = req.body;
  if (!name) return next(ERRORS.NAME_NULL);
  if (name.length < 3) return next(ERRORS.NAME_SMALL);
  next();
};

const validateAge = (req, _res, next) => {
  const { age } = req.body;
  if (!age) return next(ERRORS.AGE_NULL);
  if (parseInt(age, 10) < 18) return next(ERRORS.AGE_INV);
  next();
};

const validateTalk = (req, _res, next) => {
  const { talk } = req.body;
  if (!talk) return next(ERRORS.TALK_NULL);
  const { watchedAt, rate } = talk;
  if (!watchedAt || (!rate && rate !== 0)) return next(ERRORS.TALK_NULL);
  next();
};

const validateWatched = (req, _res, next) => {
  const { talk: { watchedAt } } = req.body;
  if (!REGEX_DATE.test(watchedAt)) return next(ERRORS.WATCHED_FORMAT);
  next();
};

const validateRate = (req, _res, next) => {
  const { talk: { rate } } = req.body;
  const intRate = parseInt(rate, 10);
  if (!Number.isInteger(intRate)) return next(ERRORS.RATE_RANGE);
  if (intRate < 1 || intRate > 5) return next(ERRORS.RATE_RANGE);
  next();
};

module.exports = [
  validateToken, 
  validateName, 
  validateAge, 
  validateTalk, 
  validateWatched, 
  validateRate, 
];