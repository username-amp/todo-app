const bodyParser = require("body-parser")
const express = require(`express`)
const mongoose = require(`mongoose`)
const path = require(`path`)
const { title } = require("process")



// init PORT
const PORT = 8000



// init app
const app = express()

// middleware path string (good for external css and linking)
app.use(express.static(path.join(__dirname, `public`)))

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



// get route
// home
app.get(`/`, async(req, res, next) => {
    try{
        // fetch todos in mongodb
        const todos = await Todo.find({}).sort({createdAt: 1})

        // render the index.ejs file, passing the todos
        res.render(`index`, {title: `todo`, todos: todos})
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
app.get(`/update-todo/:id`, async(req, res, next) => {
    try{
        // Get the specific todo by ID
        const todo = await Todo.findById(req.params.id)
        if (!todo) {
            return res.status(404).json({ message: `todo not found`})
        }

        // render the updatetodo.ejs file with the current todo data
        res.render(`updateTodo`, {title: `Update todo`, todo})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})



// delete todo page
app.get(`/delete-todo/:id`, async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) {
            return res.status(404).json({ message: `Todo not found` });
        }
        res.render(`deleteTodo`, { title: `Delete Todo`, todo });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




// add todo post method
app.post(`/add-todo`, async (req, res, next) => {
    try{
        const { title, desc } = req.body

        if (!title) {
            return res.status(400).json({message: `title is required`})
        }

        const newTodo = new Todo({ title, desc })

        await newTodo.save()

        console.log(`Todo created ${title} - ${desc}`)

        res.redirect(`/`)

    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

// update todo post method
app.post(`/update-todo/:id`, async (req, res, next) => {
    try {
        const { title, desc } = req.body

        if (!title) {
            return res.status(400).json({ message: `title is required`})
        }

        // find the todo by id and update it
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, desc },
            { new: true, runValidators: true} // Options: return the updated todo
        )

        if (!updatedTodo) {
            return res.status(404).json({ message: `todo not found`})
        }

        console.log(`Todo updated: ${updatedTodo.title} - ${updatedTodo.desc}`)
        res.redirect(`/`) // redirect to the home page after updating
    }catch(error) {
        res.status(500).json({ message: error.message})
    }
})


//delete todo POST method
app.post(`/delete-todo/:id`, async (req, res, next) => {
    try{
        // find the todo by ID and delete it
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id)

        if (!deletedTodo) {
            return res.status(404).json({message: `todo not found`})
        }

        console.log(`todo deleted: ${deletedTodo.title}`)
        res.redirect(`/`)  // redirect to home page after deletion

    }catch(error) {
        res.status(500).json({ message: error.message})
    }
})
 



// listen server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
}) 
