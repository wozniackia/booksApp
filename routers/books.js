const { Double } = require('bson');
const express = require('express');
const ObjectId = require('mongodb').ObjectId;

const router = express.Router();

let dbo = require('../db/connection');

router.get('/', async (req, res) => {
  const dbConnect = dbo.getDb();
  if(req.query.name) {
    let result = await dbConnect
      .collection('bookList')
      .findOne({name: req.query.name})
    res.json(result)
  } else if(req.query.release) {
    let result = await dbConnect
      .collection('bookList')
      .findOne({release_date: req.query.release})
    res.json(result)
  } else if(req.query.author) {
    dbConnect
    .collection('bookList')
    .find({author: req.query.author})
    .toArray(function (err, result) {
      res.json(result);
    });
  } else if(req.query.average) {
    dbConnect
    .collection('bookList')
    .find({average: {$gte: Number(req.query.average)}})
    .toArray(function (err, result) {
      res.json(result);
    });
  } else {
    dbConnect
    .collection('bookList')
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
  }
});

router.post('/addBook', async (req, res) => {
  const dbConnect = dbo.getDb();
  if(req.query.name && req.query.author && req.query.release) {
    let newBook = {
      name: req.query.name,
      author: req.query.author,
      release_date: Number(req.query.release),
      average: 0.0,
      reviews: {}
    }
    const result = await dbConnect.collection("bookList").insertOne(newBook);
    res.status(204).send();
  } else {
    res.status(400).send();
  }
})

router.post('/addReview', async (req, res) => {
  const dbConnect = dbo.getDb();
  if(req.query.review && req.query.name) {
    let oldResult = await dbConnect
      .collection("bookList")
      .findOne({ name: req.query.name });
    let reviews = oldResult.reviews
    reviews[Object.keys(reviews).length+1] = Double(req.query.review)
  
    let sum = 0;
    for(let i = 1; i <= Object.keys(reviews).length; i++) {
        sum += reviews[i]
    }
    oldResult.average = sum/Object.keys(reviews).length


    const result = await dbConnect
      .collection("bookList")
      .updateOne({ name: req.query.name }, { $set: { average: Double(sum/Object.keys(reviews).length), reviews: reviews } });
  
    res.status(204).send();
  } else {
    res.status(400).send();
  }
})

module.exports = router;