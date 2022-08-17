const router = require('express').Router();
const {
  getSingleUser,
  getUser,
  createUser,
  
} = require('../../controllers/userController');


router.route('/').get(getUser).post(createUser);

router.route('/:userId').get(getSingleUser).put();



module.exports = router;
