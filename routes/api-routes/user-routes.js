// Import the required modules
const express = require('express');
const router = express.Router();
const {
  getAllUsers, // Function to get all users
  getUserById, // Function to get user by ID
  createUser, // Function to create a new user
  updateUserById, // Function to update user by ID
  deleteUserById, // Function to delete user by ID
  addFriend, // Function to add a friend
  removeFriend, // Function to remove a friend
} = require('../../controllers/user-controller');

// Define the routes

// GET and POST all users
router.route('/').get(getAllUsers).post(createUser);

// GET user by ID, PUT update user by ID, and DELETE user by ID
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

// POST add friend and DELETE remove friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Export the router
module.exports = router;