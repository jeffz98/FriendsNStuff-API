const router = require('express').Router();
const {
  getTags,
  getSingleTag,
  createTag,
} = require('../../controllers/thoughtController');

// /api/users
router.route('/').get(getTags).post(createTag);

// /api/users/:userId
router.route('/:userId').get(getSingleTag);

module.exports = router;
