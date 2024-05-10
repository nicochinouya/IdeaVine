// Importing the required modules
const { Schema, Types } = require('mongoose');

// Creating a reaction schema
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleDateString()
        },
    },
    {
        // Including getters in the JSON representation of the schema
        toJSON: {
            getters: true,
        },
        // Excluding the 'id' field from the schema
        id: false,
    }
);

// Exporting the reaction schema
module.exports = reactionSchema;
