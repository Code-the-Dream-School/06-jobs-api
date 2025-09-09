const express = require('express')
const router = express.Router()

const {
    getAllFriends,
    getFriend,
    createFriend,
    updateFriend,
    deleteFriend
} = require('../controllers/friends')

router.route('/').post(createFriend).get(getAllFriends)
router.route('/:id').get(getFriend).delete(deleteFriend).patch(updateFriend)

module.exports = router