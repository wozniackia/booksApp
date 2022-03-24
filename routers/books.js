const { Double } = require('bson');
const express = require('express');
const axios = require('axios')
const ObjectId = require('mongodb').ObjectId;

const router = express.Router();

let dbo = require('../db/connection');

router.get('/', async (req, res) => {
  const dbConnect = dbo.getDb();
  if (req.query.name) {
    let result = await dbConnect
      .collection('bookList')
      .findOne({ name: req.query.name })
    res.json(result)
  } else if (req.query.release) {
    let result = await dbConnect
      .collection('bookList')
      .findOne({ release_date: req.query.release })
    res.json(result)
  } else if (req.query.author) {
    dbConnect
      .collection('bookList')
      .find({ author: req.query.author })
      .toArray(function (err, result) {
        res.json(result);
      });
  } else if (req.query.average) {
    dbConnect
      .collection('bookList')
      .find({ average: { $gte: Number(req.query.average) } })
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

  axios.get(`https://openlibrary.org/search.json?q=${req.query.name}`)
    .then(function (response) {
      let author = response.data.docs[0]["author_name"]
      let title = response.data.docs[0]["title"]
      let published = response.data.docs[0]["first_publish_year"]
      let data = response.data.docs[0]["edition_key"]
      let size = response.data.docs[0]["edition_key"].length
      let images = []
      let p = new Promise(function (resolve, reject) {
            for(let i = 0; i < size; i++) {
                axios.get(`https://covers.openlibrary.org/b/olid/${data[i]}-L.jpg`)
                  .then(function (response) {
                    if(response.headers["content-type"] == 'image/jpeg') {
                      asyncPush(images, `https://covers.openlibrary.org/b/olid/${data[i]}-L.jpg`, resolve)
                    }
                  })
            }
      })
      p.then(function () {
          console.log(author)
          console.log(title)
          console.log(published)
          console.log(images)

          if (req.query.name) {
            let newBook = {
              name: title,
              author: author,
              release_date: Number(published),
              average: 0.0,
              reviews: {},
              cover: images[req.query.image]
            }
            const result = dbConnect.collection("bookList").insertOne(newBook);
            res.status(204).send();
          } else {
            res.status(400).send();
          }
      })
    });
})

router.post('/addReview', async (req, res) => {
  const dbConnect = dbo.getDb();
  if (req.query.review && req.query.name) {
    let oldResult = await dbConnect
      .collection("bookList")
      .findOne({ name: req.query.name });
    let reviews = oldResult.reviews
    reviews[Object.keys(reviews).length + 1] = Double(req.query.review)

    let sum = 0;
    for (let i = 1; i <= Object.keys(reviews).length; i++) {
      sum += reviews[i]
    }
    oldResult.average = Math.floor(sum / Object.keys(reviews).length * 100)/100

    const result = await dbConnect
      .collection("bookList")
      .updateOne({ name: req.query.name }, { $set: { average: Number(Math.floor(sum / Object.keys(reviews).length * 100)/100), reviews: reviews } });

    res.status(204).send();
  } else {
    res.status(400).send();
  }
})

function asyncPush(a, val, cb) {
  setTimeout(function() { a.push(val); }, 0);
  if(a.length > 4) {
    cb();
  }
}

module.exports = router;