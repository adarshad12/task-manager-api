const express = require('express')
const { model } = require('mongoose')
const Task = require('../models/task')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth')


router.post('/tasks', auth, async(req, res) => {
    // console.log(req.body)
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(404).send(e)
    }
    // res.send('testing!!')
})


// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10  -- pagination
router.get('/tasks', auth, async(req, res) => {
    // const _id = req.params.id
    const match = {}
    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        // method - 1
        // const task = await Task.find({ owner: req.user._id })
        // method - 2
        await req.user.populate({
            path: 'mytasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

        // console.log(req.user.mytasks)
        res.send(req.user.mytasks)
    } catch (e) {
        console.log(e)
        res.status(404).send()
    }
})

router.get('/tasks/:id', auth, async(req, res) => {
    const _id = req.params.id
    try {
        // const task = await Task.findById(id)
        const task = await Task.findOne({ _id, owner: req.user._id })

        if (!task) {
            return res.status(404).send(e)
        }
        res.send(task)
    } catch (e) {
        res.status(404).send()
    }
})

router.patch('/tasks/:id', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperations = updates.every((update) => {
        return allowedUpdates.includes(update)
    })

    if (!isValidOperations) {
        return res.status(400).send({ error: 'invalid Updates' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
            // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            // const task = await Task.findById(req.params.id)

        if (!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => {
            task[update] = req.body[update]
        })

        await task.save()
        res.send(task)

    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async(req, res) => {
    try {
        const task = await Task.findByIdAndDelete({ _id: req.params.id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }
})

module.exports = router