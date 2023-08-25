const getAllTeams = async(req, res) => {
    res.send('get all franchises')
}

const getATeam = async(req, res) => {
    res.send('get a franchise')
}

const addNewTeam = async(req, res) => {
    res.send('add a new franchise')
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