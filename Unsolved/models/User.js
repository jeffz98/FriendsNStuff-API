const { Schema, model } = require('mongoose');
const mongoose = require("mongoose");

// Schema to create Post model
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (email) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
        },
      },
      message: "Enter a valid email.",
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `tagCount` that gets the amount of comments per user
userSchema
  .virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our Post model
const User = model('user', userSchema);

module.exports = User;
