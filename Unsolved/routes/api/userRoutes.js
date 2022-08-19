const router = require('express').Router();
const {
  getSingleUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
  
} = require('../../controllers/userController.js');


router.route('/').get(getUser).post(createUser);

router.route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

router.route("/:userId/friends/:friendsId")
.post(addFriend)
.delete(deleteFriend);



module.exports = router;
