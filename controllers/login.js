const router = require('express').Router();
const authLogin = require('../middlewares/authLogin');

const TOKEN = { token: '7mqaVRXJSp886CGr' };

router.post('/', authLogin, async (req, res) => {
  res.status(200).json(TOKEN);
});

module.exports = router;