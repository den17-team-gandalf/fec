const express = require('express');
const axios = require('axios');

const app = express();
const path = require('path');

const { API_KEY } = require('../configs');

axios.defaults.headers.common.Authorization = API_KEY;
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.urlencoded());
app.use(express.json());

const proxyGet = (req, res) => {
  const queryString = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-den/${req.params['0']}`;
  // console.log(queryString);
  axios.get(queryString)
    .then((results) => {
      // console.log(results.data);
      res.send(results.data);
    })
    .catch((err) => {
      // console.log(err);
      res.send(err);
    });
};

const proxyPost = (req, res) => {
  axios.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-den/${req.params['0']}`, req.body)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => {
      // console.log(err);
      res.send(err);
    });
};

const proxyPut = (req, res) => {
  axios.put(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-den/${req.params['0']}`, req.body)
    .then((results) => {
      res.send(results.data);
    })
    .catch((err) => {
      // console.log(err);
      res.send(err);
    });
};

// const proxyDelete = (req, res) => {
//   axios.delete('https://app-hrsei-api.herokuapp.com/api/fec2/hr-den/', req.params)
//     .then((results) => {
//       res.send(results);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.send(err);
//     });
// };

app.get('/*', proxyGet);

app.post('/*', proxyPost);

app.put('/*', proxyPut);

// app.delete('/*', proxyDelete);

app.listen(3000);
