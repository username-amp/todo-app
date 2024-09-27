const express = require(`express`)
const router = express.Router() // router sub route
const moment = require(`moment`)
const Todo = require(`../models/Todo`)
const todo = require(`../controllers/todo`)




// get route  
// home
router.get(`/`, todo.homeController)



//add todo page
router.get(`/add-todo`, todo.addTodoFormController)




// update todo page
router.get(`/update-todo/:id`, todo.updateTodoFormController)



// delete todo page
router.get(`/delete-todo/:id`, todo.deleteTodoPageContoller);




// add todo post methorouter
router.post(`/add-todo`, todo.addTodoController)

// update todo post method
router.post(`/update-todo/:id`, todo.updateTodoPostMethod)


//delete todo POST method
router.post(`/delete-todo/:id`, todo.deleteTodoPostMethod)
 

module.exports = router

