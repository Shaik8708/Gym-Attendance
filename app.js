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

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
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
routes.post('/post', (req, res) => {
    res.send('Post API')
})

//Get all Method
routes.get('/getAll', (req, res) => {
    res.send('Basan')
})

//Get by ID Method
routes.get('/getOne/:id', (req, res) => {
    res.send('Get by ID API')
})

//Update by ID Method
routes.put('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
routes.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})
