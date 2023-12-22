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
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
routes.get('/owner/getAll', async (req, res) => {
    try {
        const data = await gymOwner.find();
        res.json(data)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
routes.get('/owner/search/:email', async (req, res) => {
    try {
        const data = await gymOwner.findOne(req.params)
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
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

//ALL USERS API'S

//PostApi
routes.post('/gymUser/post', async (req, res) => {
    try {

          // Generate a random 6-digit alphanumeric user ID
          const userId = generateUserId();
          console.log(userId,'userId');
    const data = new gymUser({
        gymmerId:userId,
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
        const dataToSave = await data.save()
        res.status(200).json(dataToSave)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Function to generate a random 6-digit alphanumeric user ID
function generateUserId() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let userId = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        userId += characters.charAt(randomIndex);
    }

    return userId;
}


//get by gymmerId api
routes.get('/gymUser/:gymmerId', async (req, res) => {
    const userId = req.params.gymmerId;
    console.log(userId);
    try {
        const data = await gymUser.findOne({gymmerId: userId})
        console.log(data);
        res.json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    // try {

        // try {
        //     const data = await gymOwner.findOne(req.params)
        //     res.json(data)
        // } catch (error) {
        //     res.status(500).json({ message: error.message })
        // }

        // if (!userData) {
        //     res.status(404).json({ message: 'User not found' });
        //     return;
        // }

        // // Respond with the user data, including the userId
        // res.status(200).json({ ...userData._doc, userId });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'Internal Server Error' });
    // }
});


//GetApi
routes.get('/gymUser/getAll', async (req, res) => {
    try {
        const data = await gymUser.find();
        res.json(data)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get By NameApi
//Get by ID Method
routes.get('/gymUser/search/:email', async (req, res) => {
    try {
        const data = await gymUser.find({email: req.params.email})
        console.log(data, req.params.email);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by daterange api
routes.get('/gymUser', async (req, res) => {
    // localhost:3000/api/gymUser?status=inactive&name=basanagouda
    try {
        // Get filters from query parameters
        const { startDate, endDate, status, name } = req.query;

        // Build query based on filters
        const query = {};
        if (startDate && endDate) {
            query.membershipStart = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }

        // Check if a specific status is selected
        if (status === 'active') {
            query.isSubscribed = true;
        } else if (status === 'inactive') {
            query.isSubscribed = false;
        }
        
        if (name) {
            query.name = { $regex: new RegExp(name, 'i') }; // Case-insensitive name search
            console.log(name,'query.name');
          }

        // Fetch data based on the query
        const data = await gymUser.find(query);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


