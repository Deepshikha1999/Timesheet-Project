const express = require('express');
const router = express.Router();
const logger = require('./logEdit');
const Login = require('./componentAPIs/Login');
const Signup = require('./componentAPIs/Signup');
const TaskList = require('./componentAPIs/ListOfTasks');
const DeleteTask = require('./componentAPIs/DeleteTasks');
const UpdateTask = require('./componentAPIs/UpdateTasks');
const { create } = require('./componentAPIs/CreateTasks');

router.get('/login',(req,res)=>{
    logger.info("Login User :" + req);
    Login.login(req,res);
})

router.post('/signup',(req,res)=>{
    logger.info("Sign Up User: " + req);
    Signup.signup(req,res);
})

router.post('/createTask',(req,res)=>{
    logger.info("Create Task: " + req);
    create(req,res);
})

router.get('/listTask',(req,res)=>{
    logger.info("Get the list of task: "+ req);
    TaskList.listTheTasks(req,res);
})

router.delete('/deleteTask',(req,res)=>{
    logger.info("Delete task: " + req );
    DeleteTask.deleteTask(req,res);
})

router.patch('/updateTask',(req,res)=>{
    logger.info("Update task: " + req);
    UpdateTask.updateTask(req,res);
})

module.exports = router;
