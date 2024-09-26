const moment = require(`moment`)
const Todo = require(`../models/Todo`)


const HomeController = async(req, res, next) => {
    try{
        // fetch todos in mongodb
        const todos = await Todo.find({}).sort({createdAt: 1})


        // different datetime format
        res.locals.moment = moment

        // render the index.ejs file, passing the todos
        res.render(`index`, {title: `todo`, todos: todos})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { HomeController }