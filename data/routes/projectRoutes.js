const express = require('express');
const projectRoutes = express.Router();
const db = require('../helpers/projectModel');

// CRUD for main routes /api/projects
// required are name, description within an object
// POST a project given a name and description, completed (Boolean) is optional
//---------------------------------------------------------------------------------//
projectRoutes.post('/', (req, res) => {
    const {name, description} = req.body;
    const project = {
        name: req.body.name,
        description: req.body.description
    }

    if (!name || !description) {
        res.status(400).json({message: "Name or Description is missing, please provide."});
    } else {
        db.insert(project)
        .then(project => {
            res.status(201).json({message: "Creation Successful", project});
        })
        .catch(err => {
            res.status(500).json({message: "Error adding project."})
        })
    }
});

// Get all projects from database
//---------------------------------------------------------------------------------//

projectRoutes.get('/', (req, res) => {

    db.get()
    .then(projects => {
        res.status(200).json({message: "Get Success.", projects})
    })
    .catch(err => {
        res.status(404).json({message: "Get Failure.", err})
    })
});

// Updates the project with specific ID
//---------------------------------------------------------------------------------//

projectRoutes.put('/:id', checkProjectID, (req, res) => {
    res.send("MADE IT PAST MIDDLEWARE INTO PUT")
});

// Destroy the project with specific ID
//---------------------------------------------------------------------------------//

projectRoutes.delete('/:id', checkProjectID, (req, res) => {

});

//---------------------------------------------------------------------------------//

// The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as 
// it's only argument and returns a list of all the _actions_ for the _project_. so /1/actions from /:id/actions

//---------------------------------------------------------------------------------//

projectRoutes.get('/:id/actions', checkProjectID, (req, res) => {

});

//---------------------------------------------------------------------------------//

// Middleware

function checkProjectID (req, res, next) {
    const {id} = req.params;

    db.get(id)
    .then(project => {
        if (!project) {
            res.status(404).json({message: "There's no project with that ID. Tried You."});
        } else {
            next();
        }
    })
    .catch(err => {
        res.status(500).json({message: "Error getting project.", err})
    })
}

module.exports = projectRoutes;