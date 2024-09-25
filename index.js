const bodyParser = require("body-parser")
const express = require(`express`)
const mongoose = require(`mongoose`)
const path = require(`path`)
const { title } = require("process")



// init PORT
const PORT = 8000



// init app
const app = express()



// Parse application/json
app.use(bodyParser.json())



// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))



// define connectionURL
const connectionURL = `mongodb://localhost:27017/todoDb`



// connecting mongoose
mongoose
.connect(connectionURL)
.then(() => console.log(`Database connection Successfully`))
.catch((error) => console.log(error.message))



// defining todo schema
const todoSchema = mongoose.Schema({
    title: { type: String, required: true },
    desc: String,
}, {timestamps: true})




// todo model
const Todo = mongoose.model(`todo`, todoSchema)




// view engine
app.set(`view engine`, `ejs`)




// middleware path string (good for external css and linking)
app.use(express.static(path.join(__dirname, `public`)))




// get route
// home
app.get(`/`, (req, res, next) => {
    try{
        res.render(`index`, {title: `todo`})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})





//add todo page
app.get(`/add-todo`, (req, res, next) => {
    try{
        res.render(`newTodo`, {title: `add todo`})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})




// update todo page
app.get(`/update-todo`, (req, res, next) => {
    try{
        res.render(`updateTodo`, {title: `update todo`})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})



// delete todo page
app.get(`/delete-todo`, (req, res, next) => {
    try{
        res.render(`deleteTodo`, {title: `delete todo`})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})



// post method
app.post(`/add-todo`, async (req, res, next) => {
    try{
        const { title, desc } = req.body

        const newTodo = new Todo({ title, desc })

        await newTodo.save()

        console.log(`Todo created ${title} - ${desc}`)

        res.redirect(`/`)

    }catch(error) {
        res.status(500).json({message: error.message})
    }
})




// listen server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
}) 
