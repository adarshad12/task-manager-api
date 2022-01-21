const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('./user')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'

    }

}, {
    timestamps: true
})

// taskSchema.virtual('user_', {
//     ref: 'User',
//     localField: 'owner',
//     foreignField: '_id'
// })

const Task = mongoose.model('Task', taskSchema)


module.exports = Task