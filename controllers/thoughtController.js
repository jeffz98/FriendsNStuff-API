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
    }).select('-__v');
   
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId }).select('-__v')
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
          { _id: req.body.userId },
          { $push: { thoughts: thought.thoughtId } },
          { new: true }
        );
  })
  .then((user) => {
    !user
          ? res.status(404).json({ message: 'No user with that thought' })
          : res.json(user)
  })
  .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params._thoughtId})
    .then((thought) => {
      !thought
      ? res.status(404).json({ message: 'No thought with that id' })
      : User.findOneAndUpdate(
        { thoughts: req.params.thoughtId},
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
       )
    })
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with that id' })
          : res.json(user)
  })
  .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params._thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought
        ? res.status(404).json({ message: 'No thought with that id' })
        : res.json(thought)
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  createReaction(req, res) {
    console.log(req.params.thoughtId);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: {
          reactions: req.body,
        },
      },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        console.log(thought);
        !thought
          ? res.status(404).json({ message: 'No thought with that id' })
          : res.json(thought)
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  deleteReaction(req, res) {
    console.log(req.params.thoughtId, req.params.reactionId);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
  
};
