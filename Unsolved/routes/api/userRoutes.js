const router = require('express').Router();
const {
  getSingleUser,
  getUser,
  createUser,
  
} = require('../../controllers/userController');


router.route('/').get(getUser).post(createUser);

router.route('/:_id').get(getSingleUser).put();



module.exports = router;
