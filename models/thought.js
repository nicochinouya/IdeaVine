// Importing the mongoose library
const mongoose = require('mongoose');

// Reaction schema
const reactionSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
        auto: true
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => createdAtVal.toDateString()
    }
}, {
    toJSON: { getters: true }
});

// Thought schema
const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => createdAtVal.toDateString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
}, {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true }
});

// Virtual property to get the reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// Creating the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

// Exporting the Thought model
module.exports = Thought;
