const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
const booksRouter = require('./routers/books')
const authRouter = require('./routers/auth')
const dbo = require('./db/connection')

app.set("view engine", "ejs")
app.set('views', __dirname + '/frontend/views')

app.use(express.static(__dirname))
app.use(cors())
app.use(express.json())
app.use('/books', booksRouter)
app.use('/auth', authRouter)

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
app.get('/signin', (req, res) => {
  res.render('signin')
});
app.get('/signup', (req, res) => {
  res.render('signup')
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