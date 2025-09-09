const mongoose = require('mongoose')

const FriendSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide friend name'],
        maxLength: 50
    },
    birbName: {
        type: String,
        required: [true, 'Please provide birb name']
    },
    favoriteCOlor: {
        type: String,
        enum: [
            'red',
            'orange',
            'yellow',
            'green',
            'blue',
            'purple',
            'pink',
            'brown',
            'white',
            'gray',
            'black'
        ],
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user']
    }
}, {timestamps: true})

module.exports = mongoose.model('Friends', FriendSchema)