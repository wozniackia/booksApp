const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const booksRouter = require('./routers/books')
const dbo = require('./db/connection')

app.set("view engine", "ejs")
app.set('views', __dirname + '/frontend/views')

app.use(express.static(__dirname))
app.use(cors())
app.use(express.json())
app.use('/books', booksRouter)

app.get('/', (req, res) => {
  res.render('index')
});
app.get('/browse', (req, res) => {
  res.render('browse')
});
app.get('/add', (req, res) => {
  res.render('add')
});
app.get('/search', (req, res) => {
  res.render('search')
});

app.get('/*', (req, res) => {
  res.render('404')
});

dbo.connectToServer(function (err) {
    if (err) {
      console.error(err)
      process.exit()
    }
  
    // start the Express server
    app.listen(process.env.PORT || port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  });