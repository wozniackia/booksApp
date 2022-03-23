const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const books2 = require('./routers/books')
const dbo = require('./db/connection')

app.use(cors());
app.use(express.json());
app.use('/books', books2)

app.get('/', (req, res) => {
  res.send('Hello world!')
})

dbo.connectToServer(function (err) {
    if (err) {
      console.error(err);
      process.exit();
    }
  
    // start the Express server
    app.listen(process.env.PORT || port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  });