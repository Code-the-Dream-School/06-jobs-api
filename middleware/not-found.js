const notFound = (req, res) => res.status(404).sent('Route does not exist')

module.exports = notFound
