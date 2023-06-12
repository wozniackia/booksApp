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