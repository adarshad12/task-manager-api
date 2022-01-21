const mongoose = require('mongoose') //is helps to model our application.
    // and can be used for validation purposes
    // const validator = require('validator')


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw Error('Email is invalid!!!')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw Error('Age must be positive')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (value.includes("password")) {
//                 throw Error('you cannot set your password as "password"')
//             }
//             if (value.length < 6) {
//                 throw Error('Password must be greater than 6')
//             }
//         }
//     }

// })



// const me = new User({
//     name: ' Adarsh  Anand   ',
//     age: 21,
//     email: 'adarshanand1202@gmail.com',
//     password: 'msdkohli'
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     }
// })

// const tsk = new Task({
//     description: 'I have completed notes-app',
//     completed: true,
// })

// tsk.save().then(() => {
//     console.log(tsk)
// }).catch((error) => {
//     console.log(error)
// })