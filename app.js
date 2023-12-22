let express = require('express')
let mongoose = require('mongoose')
const routes = require('./routes/routes');
const gymUser = require('./models/gymUser');   
const gymmerHistory = require('./models/gymmerHistory');   
const gymOwner = require('./models/owner');   
require('dotenv').config();

const mongoString = process.env.DATABASE_URL

let app = express();

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}))

mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true })
const database = mongoose.connection
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
}).listen(3000)

app.use('/api', routes)


//!APIs for owners------------------------------------------------------------------------------- START
//Post Method //! 1
routes.post('/owner/post', async (req, res) => {
    const data = new gymOwner({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method //! 2
routes.get('/owner/getAll', async (req, res) => {
    try {
        const data = await gymOwner.find();
        res.json(data)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method //! 3
routes.get('/owner/search/:email', async (req, res) => {
    try {
        const data = await gymOwner.findOne(req.params)
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method //! 4
routes.put('/owner/update/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const updatedData = req.body;
        const result = await gymOwner.findOneAndUpdate({email: email}, updatedData, {useFindAndModify: false})
        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method //! 5
routes.delete('/owner/delete/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const data = await gymOwner.findOneAndDelete({email: email})
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//!APIs for owners------------------------------------------------------------------------------- END

//!APIs for GYM HISTORY------------------------------------------------------------------------------- START

routes.get('/history/getAll', async (req, res) => {
    try {
        const data = await gymmerHistory.find();
        res.json(data)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

routes.post('/history/post', async (req, res) => {
    const data = new gymmerHistory({
        name: req.body.name,
        gymmerId: req.body.gymmerId,
        time: new Date()
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

routes.get('/history/search/:name', async (req, res) => {
    try {
        const data = await gymmerHistory.find({name : {$regex : ".*"+req.params.name+".*" ,$options:"i"}})
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
























routes.post('/gymUser/post', async (req, res) => {
    const data = new gymUser({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        age: req.body.age,
        dob: req.body.dob,
        gender: req.body.gender,
        address: req.body.address,
        membershipStart: req.body.membershipStart,
        membershipEnd: req.body.membershipEnd,
        isSubscribed: req.body.isSubscribed,
    })
    console.log(req.body,'data');
    try {
        const dataToSave = await data.save()
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
