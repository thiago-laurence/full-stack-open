const express = require('express');
const { getAsync } = require('../redis')
const router = express.Router();

router.get('/', async (_, res) => {
  const addedTodos = await getAsync('added_todos') || 0;
  res.json({ added_todos: Number(addedTodos) });
});

module.exports = router;
