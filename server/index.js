const express = require('express');
const axios = require('axios');

const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../dist')));

// app.get('/*', (req, res) => {

// });

app.listen(3000);
