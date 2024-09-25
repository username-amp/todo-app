const express = require(`express`)

// init PORT
const PORT = 8000

// init app
const app = express()

// view engine
app.set(`view engine`, `ejs`)

// listen server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})