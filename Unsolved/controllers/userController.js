const { User } = require('../models');

module.exports = {
  getUser(req, res) {
    User.find()
      // .populate({path: "thought", select: "_id"})
      // .populate("friends")
      // .select("-__V")
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
    User.findOne({ _id: req.params._id })
      // .populate("thoughts")
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No post with that ID' })
          : res.status(200).json(users)
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
    User.findOneAndUpdate({_id: req.params._id}, {$set: req.body})
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  deleteUser() {
    User.findOneAndDelete({_id: req.params._id})
  .then((users) => res.json(users))
  .catch((err) => res.status(500).json(err));
  }
};
