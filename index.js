
const bodyParser = require("body-parser")
const express = require(`express`)
const path = require(`path`)
const connectMongodb = require(`./init/mongodb`)
const todoRoute = require(`./routes/todo`)



// init PORT
const PORT = 8000



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




// listen server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
}) 
