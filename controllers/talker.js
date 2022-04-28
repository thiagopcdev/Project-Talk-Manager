const router = require('express').Router();
const fs = require('fs').promises;
const authTalker = require('../middlewares/authTalker');

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOTFOUND: 404,
};

const readTalker = async () => {
  try {
    const res = await fs.readFile('./talker.json', 'utf-8').then((content) => JSON.parse(content));
    return res;
  } catch (err) {
    console.log(err.message);
  }
};

router.get('/', async (_req, res) => {
  const data = await readTalker();
  res.status(HTTP_STATUS.OK).json(data);
});

router.get('/search', authTalker[0], async (req, res) => {
  const { q } = req.query;
  const talkers = await readTalker();
  const getTalkers = talkers.filter((talker) => talker.name.includes(q));
  if (!getTalkers) return res.status(HTTP_STATUS.OK).json(talkers);

  res.status(HTTP_STATUS.OK).json(getTalkers);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const data = await readTalker();
  const getPeople = data.find((people) => people.id === parseInt(id, 10));
  if (!getPeople) {
    return res.status(HTTP_STATUS.NOTFOUND).json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  res.status(HTTP_STATUS.OK).json(getPeople);
});

router.post('/', ...authTalker, async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await readTalker();
    const newId = talkers.length + 1;
    const newTalker = { id: newId, name, age, talk };
    talkers.push(newTalker);

    try {
      await fs.writeFile('talker.json', JSON.stringify(talkers));
      res.status(HTTP_STATUS.CREATED).json(newTalker);
    } catch (err) {
      console.log(err.message);
    }
});

router.put('/:id', ...authTalker, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkers = await readTalker();
  const getIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  if (getIndex === -1) return res.status(404).json({ message: 'Talker not found!' });
  talkers[getIndex] = { ...talkers[getIndex], name, age, talk };

  try {
    await fs.writeFile('talker.json', JSON.stringify(talkers));
    res.status(HTTP_STATUS.OK).json(talkers[getIndex]);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete('/:id', authTalker[0], async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalker();
  const getIndex = talkers.findIndex((talker) => talker.id === parseInt(id, 10));
  if (getIndex === -1) return res.status(404).json({ message: 'Talker not found!' });
  talkers.splice(getIndex, 1);
  try {
    await fs.writeFile('talker.json', JSON.stringify(talkers));
    res.status(HTTP_STATUS.OK).json({ message: 'Pessoa palestrante deletada com sucesso' });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;