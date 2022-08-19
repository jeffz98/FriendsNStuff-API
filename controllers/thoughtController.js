const { Thought, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find().select('-__v')
    .then(thoughts => res.json(thoughts))
    .catch(err => res.status(500).json(err))
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
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        )
  })
  .then((user) => {
    !user
          ? res.status(404).json({ message: 'No user with that thought' })
          : res.json(user)
  })
  .catch((err) => res.status(500).json(err));
  },
  deleteThought(req, res) {
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then(thought => {
      return (User.findOneAndUpdate(
        {thoughts: req.params.thoughtId},
        {$pull: {thoughts: req.params.thoughtId}},
        {
            runValidators: true,
            new: true
        }
    ))
    })
    .then(user => !user 
      ? res.status(404).json({message: "No user with that thought found"})
      : res.json(user)
  )
  .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
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
        $addToSet: {
          reactions: req.body,
        },
      },
      { runValidators: true, new: true }
    ).select('-__v')
      .then((thought) => {
        console.log(thought);
        !thought
          ? res.status(404).json({ message: 'No thought with that id' })
          : res.json({message: "Successfully created reaction"})
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
    ).select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that id" })
          : res.json({message: "Successfully deleted reaction"})
      )
      .catch((err) => res.status(500).json(err));
  }
  
};
