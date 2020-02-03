const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const userRoutes = require('./src/routes/user.route')
const postRoutes = require('./src/routes/post.route')
const mongoose = require('mongoose')
const session = require('express-session')
const Mongostore = require('connect-mongo')(session)
const app = express()

const db = mongoose.connection;

dotenv.config()

//connect db
mongoose.set('useCreateIndex', true)
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('DB Connected!'));
db.on('error', (err) => {
    console.log('DB connection error:', err.message);
})


app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new Mongostore({
      mongooseConnection: db
  })
}));

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(expressValidator())



app.use('/user',userRoutes)
app.use('/post',postRoutes)

console.log('xxxxxxxxxxxx')
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
