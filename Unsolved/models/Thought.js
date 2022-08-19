const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
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
      get: (date) => moment(date).format("MMM Do, YYYY [at] h:mm a")
    }
  },
  {
    toJSON: {
      getters: true,
    },
  }
  
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
      get: (date) => moment(date).format("MMM Do, YYYY [at] h:mm a")
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
      getters: true,
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
