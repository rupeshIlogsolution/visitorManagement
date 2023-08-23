const express = require('express');
const app = express();
const sql = require('mssql')
const router = require('./router/router');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api',router)

app.get('/', function(req,res){
res.send("VisitorManagement")
})

app.listen(port, (err, req, res, next) => {
    if (err)
      console.log("Ouch! Something went wrong")
    console.log(`server listen on: ${port}`)
  })
