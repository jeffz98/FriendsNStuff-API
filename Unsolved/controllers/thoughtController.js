const { Thoughts, User } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => {
        console.log(thoughts);
        res.status(200).json(thoughts)
      })
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Tags.findOne({ _id: req.params._id })
      .then((thought) =>
        !tag
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new tag
  createThought(req, res) {
    Tags.create(req.body)
      .then((tag) => {
        return Post.findOneAndUpdate(
          { _id: req.body.postId },
          { $addToSet: { tags: tag._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'Tag created, but found no post with that ID' })
          : res.json('Created the tag 🎉')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
