const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const statisticsRouter = require('./routes/statistics');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/statistics', statisticsRouter);

console.log('Im inside container app');

module.exports = app;
