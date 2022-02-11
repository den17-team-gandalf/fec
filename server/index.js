import API_KEY from '../configs';

const express = require('express');
const axios = require('axios');

const app = express();
const path = require('path');

axios.defaults.headers.common.Authorization = API_KEY;
app.use(express.static(path.join(__dirname, '../dist')));

const proxyGet = (req, resp) => {
  axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-den17/', req.params)
    .then((resu) => {
      resp.send(resu);
    })
    .catch((err) => {
      console.log(err);
      resp.send(err);
    });
};

const proxyPost = (req, resp) => {
  axios.post('https://app-hrsei-api.herokuapp.com/api/fec2/hr-den17/', req)
    .then((resu) => {
      resp.send(resu);
    })
    .catch((err) => {
      console.log(err);
      resp.send(err);
    });
};

const proxyPut = (req, resp) => {
  axios.put('https://app-hrsei-api.herokuapp.com/api/fec2/hr-den17/', req.params)
    .then((resu) => {
      resp.send(resu);
    })
    .catch((err) => {
      console.log(err);
      resp.send(err);
    });
};

const proxyDelete = (req, resp) => {
  axios.delete('https://app-hrsei-api.herokuapp.com/api/fec2/hr-den17/', req.params)
    .then((resu) => {
      resp.send(resu);
    })
    .catch((err) => {
      console.log(err);
      resp.send(err);
    });
};

app.get('/*', proxyGet);

app.post('/*', proxyPost);

app.put('/*', proxyPut);

app.delete('/*', proxyDelete);

app.listen(3000);
