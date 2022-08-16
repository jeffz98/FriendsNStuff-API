const { User } = require('../models');

module.exports = {
  getUser(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((users) =>
        !users
          ? res.status(404).json({ message: 'No post with that ID' })
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
    User.findOneAndUpdate({_id: req.params.userId}, {$set: req.body} )
  },
  deleteUser() {
    
  }
};
