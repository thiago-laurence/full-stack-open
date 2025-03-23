const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config();

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);
const MONGO_DB = process.env.MONGO_DB || undefined
console.log('MONGO_DB:', MONGO_DB);
module.exports = app;
