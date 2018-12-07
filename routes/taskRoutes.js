const express = require('express');
const router = express.Router();
const Task = require('../models/Task')



//API routes
router.get('/tasks', (req, res, next) => {

    Task.find()
        .then((allTheTasks)=>{
            res.json(allTheTasks)
            // since this is an API, we will NOT be doing res.render or res.redirect
            // we will do res.json and then simply have to make sure we grab all the JSON from the react side
        })

        .catch((err)=>{
            res.json(err);
        })
});

router.get('/tasks/details/:id', (req, res, next)=>{

    Task.findById(req.params.id)

        .then((theTask)=>{
            res.json(theTask);
        })
        .catch((err)=>{
            res.json(err);
        })
})

router.post('/tasks/add-new', (req, res, next)=>{

    Task.create({

        title: req.body.theTitle,
        description: req.body.theDescription
    })

        .then((response)=>{
            res.json(response);
        })

        .catch((err)=>{
            res.json(err);
        })

})

router.post('/tasks/edit/:id', (req, res, next)=>{

    Task.findByIdAndUpdate(req.params.id, {

        title: req.body.theTitle,
        description: req.body.theDescription
    })
        .then((response)=>{
            res.json([{message: 'this task has been successfully updated'},
            response ])
        })

        .catch((err)=>{
            res.json(err.message);
        })

})

router.post('/tasks/delete/:id', (req, res, next)=>{

    Task.findByIdAndRemove(req.params.id)
        .then((deletedTask)=>{
            if(deletedTask === null){
                res.json({message: 'Sorry, this task could not be found'})
                return;
            }

            res.json([
                {message: 'task successfully deleted'},
                deletedTask
            ])
        })
        
        .catch((err)=>{
            res.json(err)
        })
})




module.exports = router;