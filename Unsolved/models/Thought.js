const { Schema, model, Types } = require('mongoose');
// const mongoose = require("mongoose");
// const reactionSchema = require('Reaction');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
      
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280

    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => timeSince(date)
    }
  },
  
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => timeSince(date)
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      reactionSchema
    ]
      
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);



thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
