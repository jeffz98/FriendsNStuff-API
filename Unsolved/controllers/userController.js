const { User, Thought } = require('../models');

module.exports = {
  getUser(req, res) {
    User.find()
      .select('-__v')
      .then((users) => {
        console.log(users);
        return res.status(200).json(users);
      })
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      // .populate({path: "thoughts", select: "_id"})
      .populate("thoughts")
      .populate("friends")
      .select('-__v')
      // .populate("thoughts")
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(users)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new post
  createUser(req, res) {
    User.create(req.body)
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  updateUser(req, res) {
    User.findOneAndUpdate(
      {_id: req.params.userId}, 
      {$set: req.body},
      { runValidators: true, new: true })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  deleteUser(req, res) {
    User.findOneAndDelete({_id: req.params.userId})
    // .then((user) =>
    //   !user
    //     ? res.status(404).json({ message: 'No user with that ID' })
    //     : Thought.deleteMany({ _id: { $in: user.friends } })
    // )
    .then(() => res.json({ message: 'User and thoughts deleted!' }))
    .catch((err) => res.status(500).json(err));
  }
};
