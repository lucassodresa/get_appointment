require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const jsend = require('jsend');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;
const isProd = process.env.NODE_ENV === 'production';
const isStaging = process.env.NODE_ENV === 'staging';

const app = express();
const routes = require('./routes');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());

app.use(express.json());
app.use(jsend.middleware);
app.use('/api', routes);

if (isProd || isStaging) {
  app.use(express.static('../web/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'web', 'build', 'index.html'));
  });
}

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log('Server running!'));

module.exports = app;
