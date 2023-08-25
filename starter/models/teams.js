const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
    franchise:{
        type:String,
        required:[true, 'Please provide name of franchise'],
        maxlength:50
    },
    location:{
        type:String,
        required:[true,'Please provide team location'],
        maxlength:50
    },
    status:{
        type:String,
        enum: ['Winning Franchise', 'Losing Franchise', 'Struggling Playoff Team']
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, 'Please provide user']
    }

}, {timestamps:true})

module.exports = mongoose.model('Team', teamSchema)