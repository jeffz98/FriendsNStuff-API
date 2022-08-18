const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find({}, (err, thought) => {
      if (thought) {
        console.log(thought);
        return res.status(200).json(thought);
      } else {
        return res.status(500).json(err);
      }
    });
      
        
        
      
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new tag
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        console.log(thought);
        return User.findOneAndUpdate(
          { _id: req.body.thoughtId },
          { $push: { thoughts: thought.thoughtId } },
          { new: true }
        );
      })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'Thought created, but found no user with that ID' })
          : res.json('Created the thought 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
