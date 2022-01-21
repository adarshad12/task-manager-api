// CRUD :: create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient // to initialise connection..... to give acess to the functions to perform CRUD operations
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Adarsh',
    //     age: 21
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops) //ops is an array of document
    // })
    // db.collection('users').insertMany([{
    //             name: 'Rohit',
    //             age: 21
    //         }, {
    //             name: 'Adarsh',
    //             age: 21
    //         }],
    //         (error, result) => {
    //             if (error) {
    //                 return console.log('Unable to insert documents !')
    //             }
    //             // const result_ = result
    //             console.log('ok', result)
    //         })
    // console.log(result)

    // db.collection('tasks').insertMany([{
    //         description: 'I have completed notes app',
    //         completed: true
    //     },
    //     {
    //         description: 'I have also completed weather-app',
    //         completed: true
    //     },
    //     {
    //         description: 'I have completed task app too',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         console.log('Unable to insert documents!')
    //     }
    //     console.log('result is:-', result)
    // })

    // ***finds***


    // db.collection('users').findOne({ _id: new ObjectID("61e2b8ea164ecf9dce71d96c") }, (error, user) => {
    //     if (error) {
    //         return console.log('unsable to fetch')
    //     }

    //     console.log(user)
    // })


    // returns a pointer(cursor) to that data in that database
    // db.collection('tasks').find({ completed: true }).toArray((error, user) => {
    //     console.log(user)
    // })

    // db.collection('tasks').find({ completed: true }).count((error, count) => {
    //     console.log(count)
    // })

    //***update***

    // const updatePromise = db.collection('users').updateOne({
    //     _id: new ObjectID("61e2b8ea164ecf9dce71d96c")
    // }, {
    //     $set: {
    //         name: 'Anand'
    //     }
    // })

    // updatePromise.then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateOne({
    //     name: 'Mintu'
    // }, {
    //     // $set: {
    //     //     name: 'Anand'
    //     // }
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').updateMany({
    //     name: 'Adarsh'
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    //***delete***

    // db.collection('users').deleteMany({
    //     age: 26
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    // db.collection('users').deleteOne({
    //     _id: new ObjectID("61e2ca7e68cbf2d920bb5222")
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })


})