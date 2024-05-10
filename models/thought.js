// Importing required modules
const { Schema, model } = require('mongoose'); 
const reactionSchema = require('./Reaction');

// Defining the thought schema
const thoughtSchema = new Schema(
    {
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlenght: 280,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).toLocaleString(),
        },
        username:{
            type: String,  
            required: true,
        },
        reactions:[reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

// Defining a virtual property to get the reaction count
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

// Creating the Thought model
const Thought = model('Thought',thoughtSchema)

// Exporting the Thought model
module.exports = Thought
