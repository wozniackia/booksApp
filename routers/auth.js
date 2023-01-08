const { Double } = require('bson');
const express = require('express');
const axios = require('axios')
const ObjectId = require('mongodb').ObjectId;

const router = express.Router();
let md5 = require('md5');
let TokenGenerator = require( 'token-generator' )({
  salt: 'wydzial elektrotechniki i informatyki',
  timestampMap: 'wozniackia',
});
let dbo = require('../db/connection');

router.get('/signin', async (req, res) => {
  const dbConnect = dbo.getDb();
  if(!(req.query.username && req.query.password)){
    res.status(400).send('no username or password');
    return;
  }
  let result = await dbConnect
    .collection('accounts')
    .findOne({ username: req.query.username });
  if(result == null) {
    res.status(400).send('wrong username');
    return;
  }
  if(result.password == req.query.password){
    let token = TokenGenerator.generate();
    let newToken = {
      username: req.query.username,
      token: token,
      datetime: Date.now()
    }
    await dbConnect.collection("tokens")
      .deleteOne({username: req.query.username});
    await dbConnect.collection("tokens").insertOne(newToken);
    let info = {
      username: newToken.username,
      token: newToken.token,
      datetime: newToken.datetime,
      role: result.role
    }
    res.json(info);
  } else {
    res.status(400).send('wrong password');
  }
});

router.get('/validate', async (req, res) => {
  const dbConnect = dbo.getDb();
  if(!(req.query.token)){
    res.status(400).send('no token');
    return;
  }
  let result = await dbConnect
    .collection('tokens')
    .findOne({ token : req.query.token });
  if(result == null || result.datetime + 300000 < Date.now()){
    await dbConnect.collection("tokens")
      .deleteOne({token: req.query.token});
    res.status(400).send('expired');
  } else {
    res.status(204).send('valid');
  }
});

router.post('/signup', async (req, res) => {
  const dbConnect = dbo.getDb();
  let newAccount = {
    username: req.query.username,
    password: md5(req.query.password),
    role: 'ROLE_USER',
  }
  if (newAccount.username && newAccount.password) {
    dbConnect.collection("accounts").insertOne(newAccount);
    res.status(204).send("Register successfull");
  } else {
    res.status(400).send();
  }
});

router.post('/signout', async (req, res) => {
  const dbConnect = dbo.getDb();
  if(!(req.query.username && req.query.token)){
    res.status(400).send('no username or token');
    return;
  }
  let result = await dbConnect
    .collection('tokens')
    .findOne({ token : req.query.token });
  if(result == null) {
    res.status(400).send('wrong username');
    return;
  }
  if(result.token == req.query.token){
    await dbConnect.collection("tokens")
      .deleteOne({token: req.query.token});
    res.status(204).send("Signout successfull");
  } else {
    res.status(400).send('wrong token');
  }
});

module.exports = router;