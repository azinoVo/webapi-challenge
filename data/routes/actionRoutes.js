const express = require('express');
const actionRoutes = express.Router();
const db = require('../helpers/actionModel');
const dbProject = require('../helpers/projectModel');

// CRUD for main routes /api/actions
// Actions require project_id (params), description, notes --- completed is optional
// Post an action for a specific Project ID
//---------------------------------------------------------------------------------//

actionRoutes.post('/:id', checkProjectID, checkAction, (req, res) => {
    const {id} = req.params;
    const {description, notes} = req.body;
    const action = {
        project_id: id,
        description: description,
        notes: notes
    }

    db.insert(action)
    .then(action => {
        res.status(201).json({message: "Action Added.", action});
    })
    .catch(err => {
        res.status(500).json({message: "Error posting action.", err})
    })

});

// Get all actions
//---------------------------------------------------------------------------------//

actionRoutes.get('/', (req, res) => {

    db.get()
    .then(actions => {
        res.status(200).json({message: "GET SUCCESS", actions});
    })
    .catch(err => {
        res.status(404).json({message: "Error getting action.", err});
    })

});

// Update an action using the action ID
//---------------------------------------------------------------------------------//

actionRoutes.put('/:actionID', checkActionID, checkAction, (req, res) => {
    const {actionID} = req.params;
    const {description, notes} = req.body;
    const action = {
        description: description,
        notes: notes
    }

    db.update(actionID, action)
    .then(action => {
        res.status(200).json({message: "Update Successful.", action})
    })
    .catch(err => {
        res.status(500).json({message: "Error updating action.", err});
    })

});

// Delete an action using the action ID
//---------------------------------------------------------------------------------//

actionRoutes.delete('/:actionID', checkActionID, (req, res) => {
    const {actionID} = req.params;

    db.remove(actionID)
    .then(count => {
        res.status(200).json({message: "Destruction inevitable.", count});
    })
    .catch(err => {
        res.status(500).json({message: "Error destroying project.", err});
    })

});

//---------------------------------------------------------------------------------//

// Middleware
// Checks if the ID in params exists in database

function checkProjectID (req, res, next) {
    const {id} = req.params;

    dbProject.get(id)
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

//---------------------------------------------------------------------------------//

// Checks if the ID in params exists in database

function checkActionID (req, res, next) {
    const {actionID} = req.params;

    db.get(actionID)
    .then(action => {
        if (!action) {
            res.status(404).json({message: "No action exist with that ID."});
        } else {
            next();
        }
    })
    .catch(err => {
        res.status(500).json({message: "That ID does not exist", err})
    })
}

//---------------------------------------------------------------------------------//

// Check if user have required inputs

function checkAction (req, res, next) {
    const {description, notes} = req.body;

    if (!description || !notes) {
        res.status(400).json({message: "Description or Notes missing, please provide."});
    } else {
        next();
    }
}

//---------------------------------------------------------------------------------//

module.exports = actionRoutes;