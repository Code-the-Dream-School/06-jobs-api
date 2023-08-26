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
    yearFounded: {
        type: Number, // Add this line to specify the number type
        required: [true, 'Please provide the year founded']
    },
    teamOwner: {
        type:String,
        required: [true, 'Please provide team Owner' ]
    },

    championshipYears: {
        type: [Number, String],
        required: [true, "Please provide championship years, if none use N/A"]
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required:[true, 'Please provide user']
    }

}, {timestamps:true})

module.exports = mongoose.model('Team', teamSchema)