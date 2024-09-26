const express = require(`express`)
const router = express.Router() // router sub route
const moment = require(`moment`)
const Todo = require(`../models/Todo`)
const todo = require(`../controllers/todo`)




// get route  
// home
router.get(`/`, todo.HomeController)





//add todo page
router.get(`/add-todo`, (req, res, next) => {
    try{
        res.render(`newTodo`, {title: `add todo`})
    }catch(error){
        res.status(500).json({message: error.message})
    }
})




// update todo page
router.get(`/update-todo/:id`, async(req, res, next) => {
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
router.get(`/delete-todo/:id`, async (req, res, next) => {
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




// add todo post methorouter
router.post(`/add-todo`, async (req, res, next) => {
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
router.post(`/update-todo/:id`, async (req, res, next) => {
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
router.post(`/delete-todo/:id`, async (req, res, next) => {
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
 

module.exports = router

