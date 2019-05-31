const express = require('express');
const projectRoutes = express.Router();
const db = require('../helpers/projectModel');

// CRUD for main routes /api/projects
//---------------------------------------------------------------------------------//

projectRoutes.post('/', (req, res) => {
    res.send("PAST THE POST");
});

//---------------------------------------------------------------------------------//

projectRoutes.get('/', (req, res) => {

});

//---------------------------------------------------------------------------------//

projectRoutes.put('/', (req, res) => {

});

//---------------------------------------------------------------------------------//

projectRoutes.delete('/', (req, res) => {

});

//---------------------------------------------------------------------------------//

// The `projectModel.js` helper includes an extra method called `getProjectActions()` that takes a _project id_ as 
// it's only argument and returns a list of all the _actions_ for the _project_. so /1/actions from /:id/actions

//---------------------------------------------------------------------------------//

projectRoutes.get('/', (req, res) => {

});

//---------------------------------------------------------------------------------//



module.exports = projectRoutes;