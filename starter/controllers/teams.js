const Team = require('../models/teams')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getAllTeams = async(req, res) => {
    res.send('get all franchises')
}

const getATeam = async(req, res) => {
    res.send('get a franchise')
}

const addNewTeam = async(req, res) => {
    req.body.createdBy = req.user.userId
    const team = await Team.create(req.body)
   res.status(StatusCodes.CREATED).json({team})
}

const updateTeam = async(req, res) => {
    res.send('update franchises')
}

const deleteTeam = async(req, res) => {
    res.send('delete a franchise')
}


module.exports = {
    getAllTeams,
    getATeam,
    addNewTeam,
    updateTeam,
    deleteTeam,
}