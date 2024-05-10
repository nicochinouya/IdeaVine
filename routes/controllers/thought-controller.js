const { Thought, User, Reaction } = require('../models');
const {Types} = require('mongoose');

// Define the ThoughtController object, which contains methods for handling various API requests related to thoughts
/**
 * Controller for handling CRUD operations related to thoughts.
 * @namespace ThoughtController
 */
const ThoughtController = {
    /**
     * Handler for the "get all thoughts" API endpoint.
     * @async
     * @function getAllThoughts
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /**
     * Handler for the "get thought by ID" API endpoint.
     * @async
     * @function getThoughtsById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async getThoughtsById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /**
     * Handler for the "create thought" API endpoint.
     * @async
     * @function createThought
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(201).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /**
     * Handler for the "delete thought" API endpoint.
     * @async
     * @function deleteThought
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /**
     * Handler for the "update thought by ID" API endpoint.
     * @async
     * @function updateThoughtById
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async updateThoughtById(req, res) {
        try {
            const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
                new: true,
            });
            if (!thought) {
                res.status(404).json({ message: 'Thought not found' });
            } else {
                res.json(thought);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    /**
     * Handler for the "create reaction" API endpoint.
     * @async
     * @function createReaction
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found' });
        } catch (e) {
            res.status(500).json(e);
        }
    },

    /**
     * Handler for the "delete reaction" API endpoint.
     * @async
     * @function deleteReaction
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Promise<void>} - A promise that resolves when the operation is complete.
     */
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            thought ? res.json(thought) : res.status(404).json({ message: 'Thought not found' });
        } catch (e) {
            res.status(500).json(e);
        }
    },
};
// Export ThoughtController
module.exports = ThoughtController;
