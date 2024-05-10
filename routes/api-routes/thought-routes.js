// Import the necessary dependencies and controllers
const router = require('express').Router();
const {
    getAllThoughts, // Function to get all thoughts
    getThoughtById, // Function to get a thought by its ID
    createThought, // Function to create a new thought
    deleteThought, // Function to delete a thought
    updateThoughtById, // Function to update a thought by its ID
    createReaction, // Function to create a reaction to a thought
    deleteReaction, // Function to delete a reaction to a thought
} = require('../../controllers/thought-controller');

// Define the routes for GET and POST all Thoughts
router.route('/').get(getAllThoughts).post(createThought);

// Define the routes for GET, PUT and DELETE Thoughts
router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThought);

// Define the route for POST reaction to a Thought
router.route('/:thoughtId/reactions').post(createReaction);

// Define the route for DELETE reaction to a Thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// Export the router
module.exports = router;