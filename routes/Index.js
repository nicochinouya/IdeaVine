// Importing the required modules
const router = require('express').Router(); 
const apiRoutes = require('./api-routes');

// Setting up the API routes
router.use('/api',apiRoutes);

// Handling the 404 Not Found error
router.use((req, res)=>{
    return res.status(404).send('Not found');
});

// Exporting the router module
module.exports = router;
