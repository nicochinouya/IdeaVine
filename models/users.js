const mongoose = require('mongoose');

// Define the user schema using the mongoose.Schema constructor
const userSchema = new mongoose.Schema({
  // Define the username field with type String, unique, required, and trim properties
  username: { type: String, unique: true, required: true, trim: true },
  
  // Define the email field with type String, required, unique, and match properties
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  
  // Define the thoughts field as an array of ObjectIds referencing the 'Thought' model
  thoughts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Thought' }],
  
  // Define the friends field as an array of ObjectIds referencing the 'User' model
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, {
  // Define the options for converting the schema to JSON and object
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Define a virtual property 'friendCount' using the 'virtual' method of the userSchema
userSchema.virtual('friendCount').get(function () {
  // Return the length of the friends array
  return this.friends.length;
});

// Create a User model using the userSchema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;