// Importing the User and thought models from their respective files
const User = require('./User');
const thought = require('./thought');
// Exporting the User and thought models as a single module for easy access in other parts of the application
module.exports = {thought, User};
