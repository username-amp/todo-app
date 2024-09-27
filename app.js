const express = require(`express`)
const path = require(`path`)
const bodyParser = require("body-parser")
const connectMongodb = require(`./init/mongodb`)
const todoRoute = require(`./routes/todo`)
const dotenv = require(`dotenv`)


// environment variable
dotenv.config()

console.log(process.env.PORT)


// init app
const app = express()


// mongodb connection
connectMongodb()


// middleware path string (good for external css and linking)
app.use(express.static(path.join(__dirname, `public`)))
// Parse application/json
app.use(bodyParser.json())
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))
// use route
app.use(`/`, todoRoute)


// view engine
app.set(`view engine`, `ejs`)


module.exports = app


