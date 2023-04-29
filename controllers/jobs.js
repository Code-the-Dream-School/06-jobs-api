const getAllJobs = async (req, res) => {
    res.send("get all jobs")
}

const getJob = async (req, res) => {
    res.send("get a job")
}

const createJob = async (req, res) => {
    res.send("create a job")
}

const updateJob = async (req, res) => {
    res.send("update a job")
}

const deleteJob = async (req, res) => {
    res.send("delete a jobs")
}

module.exports = {
    getAllJobs, getJob, createJob, updateJob, deleteJob
}