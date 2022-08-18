const router = require('express').Router();
const {
  getSingleUser,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  
} = require('../../controllers/userController');


router.route('/').get(getUser).post(createUser);

router
  .route('/:_id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);



module.exports = router;
