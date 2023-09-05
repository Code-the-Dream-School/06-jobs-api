const Team = require("../models/teams");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const teams = require("../models/teams");

const getAllTeams = async (req, res) => {
  const teams = await Team.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ teams, count: teams.length });
};

const getATeam = async (req, res) => {
  const {
    user: { userId },
    params: { id: teamId },
  } = req;

  const team = await Team.findOne({
    _id: teamId,
    createdBy: userId,
  });
  if (!team) {
    throw new NotFoundError(`No team found with ${teamId}`);
  }
  res.status(StatusCodes.OK).json({ team });
};

const addNewTeam = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const team = await Team.create(req.body);
  res.status(StatusCodes.CREATED).json({ team, count: teams.length });
};

const updateTeam = async (req, res) => {
  const {
    body: { franchise, location },
    user: { userId },
    params: { id: teamId },
  } = req;

  if (franchise === "" || location === "") {
    throw new BadRequestError("Franchise or Location fields cannot be empty");
  }

  const team = await Team.findByIdAndUpdate(
    { _id: teamId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!team) {
    throw new NotFoundError(`No team found with ${teamId}`);
  }

  res.status(StatusCodes.OK).json({ team });
};

const deleteTeam = async (req, res) => {
  const {
    user: { name, userId },
    params: { id: teamId },
  } = req;
  
  const team = await Team.findByIdAndRemove({ _id: teamId, createdBy: userId });
  if (!team) {
    throw new NotFoundError(`No team found with id ${teamId}`);
  }
  res.status(StatusCodes.OK).send(`${teamId} has been deleted from ${name}'s database`);
};

module.exports = {
  getAllTeams,
  getATeam,
  addNewTeam,
  updateTeam,
  deleteTeam,
};
