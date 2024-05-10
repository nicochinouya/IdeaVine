const { User } = require('../models');

/**
 * Controller for managing user-related operations.
 * @namespace UserController
 */
const UserController = {
    /**
     * Get all users.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    getAllUsers(req, res) {
        // Retrieve all users from the database
        User.find({})
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    /**
     * Get a user by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    getUserById(req, res) {
        // Retrieve a user by their ID from the database
        User.findById(req.params.userId)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },
    
    /**
     * Create a new user.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    createUser(req, res) {
        // Create a new user in the database
        User.create(req.body)
            .then(userData => res.json(userData))
            .catch(err => res.status(500).json(err));
    },

    /**
     * Update a user by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    updateUserById(req, res) {
        // Update a user by their ID in the database
        User.findOneAndUpdate(req.params.id, req.body, { new: true })
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },

    /**
     * Delete a user by ID.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    deleteUserById(req, res) {
        // Delete a user by their ID from the database
        User.findOneAndDelete(req.params.id)
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json({ message: 'User deleted successfully' });
            })
            .catch(err => res.status(500).json(err));
    },

    /**
     * Add a friend to a user's friend list.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    addFriend(req, res) {
        // Add a friend to a user's friend list in the database
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId || req.params.friendId} },
            { new: true }
        )
            .then(userData => {
                if (!userData) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.json(userData);
            })
            .catch(err => res.status(500).json(err));
    },

    /**
     * Remove a friend from a user's friend list.
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     */
    removeFriend({ params }, res) {
        // Remove a friend from a user's friend list in the database
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId } },
            { new: true }
        )
            .then((dbUserData) => {
                if (!dbUserData) {
                    return res.status(404).json({ message: "No user with this id!" });
                }
                // Check if friend was removed
                const removed = !dbUserData.friends.includes(params.friendId);
                // Return response with appropriate message
                if (removed) {
                    res.json({ message: "Friend removed successfully!", dbUserData });
                } else {
                    res.json(dbUserData);
                }
            })
            .catch((err) => res.status(400).json(err));
    },
};


// Export UserController
module.exports = UserController;
