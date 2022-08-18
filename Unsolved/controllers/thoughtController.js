// const { Thoughts, User } = require('../models');

// module.exports = {
//   getThoughts(req, res) {
//     Thoughts.find({}, (err, thought) => {
//       if (thought) {
//         console.log(thoughts);
//         return res.status(200).json(thought);
//       } else {
//         return res.status(500).json(err);
//       }
//     });
      
        
        
      
//   },
//   getSingleThought(req, res) {
//     Thoughts.findOne({ _id: req.params._id })
//       .then((thought) =>
//         !tag
//           ? res.status(404).json({ message: 'No thought with that ID' })
//           : res.json(thought)
//       )
//       .catch((err) => res.status(500).json(err));
//   },
//   // create a new tag
//   createThought(req, res) {
//     Thoughts.create(req.body)
//       .then((thought) => {
//         console.log(thought);
//         return User.findOneAndUpdate(
//           { _id: req.body._id },
//           { $push: { thoughts: thought._id } },
//           { new: true }
//         );
//       })
//       .then((thought) =>
//         !thought
//           ? res
//               .status(404)
//               .json({ message: 'Thought created, but found no user with that ID' })
//           : res.json('Created the thought 🎉')
//       )
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },
// };
