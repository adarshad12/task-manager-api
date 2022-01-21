const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const { findByIdAndUpdate } = require('./models/user')
const { isValidObjectId } = require('mongoose')

const app = express()
const port = process.env.PORT

// file uploads in multer

const multer = require('multer')
const upload = multer({
    dest: 'images', //creates images directory
    limits: {
        fileSize: 1000000 //1 mb
    },
    //creating some validation on file extension
    fileFilter(req, file, cb) {
        // if (!file.originalname.endsWith('.pdf')) {
        //     return cb(new Error('Please upload a PDF'))
        // }
        if (!file.originalname.match(/\.(doc|docx)$/)) {
            return cb(new Error('Please upload a Word Document'))
        }

        cb(undefined, true) //accept the file
    }

})

app.post('/upload', upload.single('upload'), (req, res) => {
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})




app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
    // app.use((req, res, next) => {
    //     if (req.method === 'GET') {
    //         res.status(503).send('This site is under maintainence, please try again later')
    //     } else {
    //         next()
    //     }
    // })


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const pet = {
//     name: 'billi'
// }

// pet.toJSON = function() {
//     return {}
// }

// console.log(JSON.stringify(pet))

// const bcrypt = require('bcryptjs')
//     // const jwt = require('jsonwebtoken')

// const myFunc = async() => {
//     const password = 'Adarsh123'
//     const hashedpassword = await bcrypt.hash(password, 8)

//     // console.log(password)
//     console.log(hashedpassword)

//     const isMatch = await bcrypt.compare('Adarsh123', hashedpassword)
//     console.log(isMatch)
// }

//     // const token = jwt.sign({ _id: 'adarsh123' }, 'kohli', { expiresIn: '2 days' })
//     // console.log(token)
//     // const verify = jwt.verify(token, 'kohli')
//     // console.log(verify)
// }
// myFunc()


// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async() => {
//     // const task = await Task.findById('61e845c18b73472e4bb89c8f')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('61e845305239792bf1146ee2')
//     await user.populate('mytasks').execPopulate()
//     console.log(user.mytasks)
// }

// main()