const express = require('express')
const { model } = require('mongoose')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeMail, sendCancellationMail } = require('../emails/account')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')


// resource creation endpoints

//sign up 
router.post('/users', async(req, res) => {
    // console.log(req.body)
    const user = new User(req.body)
    sendWelcomeMail(user.email, user.name)
        // using async await method
    try {
        await user.save()

        const token = await user.userauthToken() //to verify the user after signup
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(404).send(e)
    }

    // user.save().then(() => {
    //         res.send(user)
    //     }).catch((e) => {
    //         res.status(400)
    //         res.send(e)
    //     })
    // res.send('testing!!')
})

//login in
router.post('/users/login', async(req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.userauthToken() //to verify user before login

        // res.send({ user: user.getPublicprofile(), token })
        res.send({ user, token })

    } catch (e) {
        // console.log(e)
        res.status(404).send()
    }
})

// ---uploading profile picture---
const upload = multer({
    limits: {
        fileSize: 1000000 //1 mb 
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpeg|png|jpg)$/)) {
            return cb(new Error('Please user jpeg or jpg or png files'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async(req, res) => {

    // ---**storing binary image**---
    // req.user.avatar = req.file.buffer

    const buffer = await sharp(req.file.buffer).resize({ width: 300, height: 300 }).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

// ---deletimg profile picture---
router.delete('/users/me/avatar', auth, async(req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.status(200).send(req.user)
})

//---viewing profile picture---
router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(400).send()
    }
})

// --user loging out ---
router.post('/users/logout', auth, async(req, res) => {
    // in order to logout of only 1 device apart from logging out from all devices
    // we need to target these specific token that was used when they authenticared right here

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        // console.log(e)
        res.status(500).send()
    }

})

// ---logout from all devices---

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.status(200).send()
    } catch (e) {
        res.status(500).send()
    }
})

//---view profile---
router.get('/users/me', auth, async(req, res) => {
    res.send(req.user)

    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(404).send()
    // }
    // User.find({}).then((user) => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(404).send()
    // })
})

// router.get('/users/:id', async(req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById(_id)
//         if (!user) {
//             return res.status(404).send(e)
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(404).send()
//     }
// User.findById(_id).then((user) => {
//     if (!user) {
//         return res.status(404).send()
//     }
//     res.send(user)
// }).catch((e) => {
//     res.status(404).send()
// })
// })


// ---update user profile---
router.patch('/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'age']
    const isValidOperations = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperations) {
        return res.status(400).send({ error: 'invalid Updates' })
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
            // if (!user) {
            //     return res.status(404).send()
            // }
        res.send(req.user)

    } catch (e) {
        res.status(400).send()
    }
})

//---delete user profile---
router.delete('/users/me', auth, async(req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.users._id)
        // if (!user) {
        //     return res.status(404).send()
        // }

        await req.user.remove()
        sendCancellationMail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router