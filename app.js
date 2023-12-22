let express = require('express')
let bodyParser = require('body-parser')
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

mongoose.connect(mongoString)
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

//Post Method
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

//Get all Method
routes.get('/owner/getAll', async (req, res) => {
    try {
        const data = await gymOwner.find();
        res.json(data)
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
routes.get('/owner/search/:email', async (req, res) => {
    console.log(req.params, 'data');
    try {
        const data = await gymOwner.findOne(req.params)
        res.json(data)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
routes.put('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
routes.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
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
        isSubscribe: req.body.isSubscribe,
    })
    console.log(req.body,'data');
    try {
        const dataToSave = await data.save()
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
