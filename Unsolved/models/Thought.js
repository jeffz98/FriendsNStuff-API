const { Schema, model } = require('mongoose');

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

    },
    username: {
      type: String,
      required: true
    },
    reactions: {
      
    }
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
