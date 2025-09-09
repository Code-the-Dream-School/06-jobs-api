const Friend = require('../models/Friend')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllFriends = async (req, res) => {
    res.send('get all friends')
}

const getFriend = async (req, res) => {
  res.send('get friend')
}

const createFriend = async (req, res) => {
  req.body.createdBy = req.user.userId
  const friend = await Friend.create(req.body)
  res.status(StatusCodes.CREATED).json({ friend })
}

const updateFriend = async (req, res) => {
  res.send('update friend')
}

const deleteFriend = async (req, res) => {
  res.send('delete friend')
}

module.exports = {
    getAllFriends,
    getFriend,
    createFriend,
    updateFriend,
    deleteFriend
}