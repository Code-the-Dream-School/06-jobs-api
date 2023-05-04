const mongoose = require('mongoose');

const JobsSchema = mongoose.Schema(
    {
        company: {
            type: String,
            required:[true, 'Please provide company name'],
            maxLength: 50
        },
        position: {
            type: String,
            required:[true, 'Please provide position name'],
            maxLength: 100
        },
        status: {
            type: String,
            enum: ['Interview', 'Declined', 'Pending'],
            default: 'Pending'
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User', // which model are we referencing
            required: [true, 'Please provide a user']
        }
    }, {timestamps: true}
)

module.exports = mongoose.model('Jobs', JobsSchema)