let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const path = require('path')
const routes = require("./routes/routes");
const gymUser = require("./models/gymUser");
const gymmerHistory = require("./models/gymmerHistory");
const gymOwner = require("./models/owner");
require("dotenv").config();

const mongoString = process.env.DATABASE_URL;

let app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use("/api", routes);

app.get('/', (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html')
})

//!APIs for owners------------------------------------------------------------------------------- START
//Post Method //! 1
app.post("/owner/post", async (req, res) => {
  const data = new gymOwner({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get all Method //! 2
app.get("/owner/getAll", async (req, res) => {
  try {
    console.log('qwe');
    const data = await gymOwner.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method //! 3
app.get("/owner/search/:email", async (req, res) => {
  try {
    const data = await gymOwner.findOne(req.params);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method //! 4
app.put("/owner/update/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body;
    const result = await gymOwner.findOneAndUpdate(
      { email: email },
      updatedData,
      { useFindAndModify: false }
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete by ID Method //! 5
app.delete("/owner/delete/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const data = await gymOwner.findOneAndDelete({ email: email });
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//API'S for GYMUSER--------

//!APIs for owners------------------------------------------------------------------------------- END

//!APIs for GYM HISTORY------------------------------------------------------------------------------- START

app.get("/history/getAll", async (req, res) => {
  try {
    const data = await gymmerHistory.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/history/post", async (req, res) => {``
  const data = new gymmerHistory({
    name: req.body.name,
    gymmerId: req.body.gymmerId,
    time: Math.floor(new Date().getTime()/1000),
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/history/search/:name", async (req, res) => {
  try {
    const data = await gymmerHistory.find({
      name: { $regex: ".*" + req.params.name + ".*", $options: "i" },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//PostApi
app.post("/gymUser/post", async (req, res) => {
  try {
    // Generate a random 6-digit alphanumeric user ID
    const userId = generateUserId();
    const data = new gymUser({
      gymmerId: userId,
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
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Function to generate a random 6-digit alphanumeric user ID
function generateUserId() {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let userId = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    userId += characters.charAt(randomIndex);
  }

  return userId;
}

//GetAllApi
app.get("/gymUser/getAll", async (req, res) => {
  try {
    const data = await gymUser.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get by gymmerId api
app.get("/gymUser/:gymmerId", async (req, res) => {
  const userId = req.params.gymmerId;
  try {
    const data = await gymUser.findOne({ gymmerId: userId });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/gymUser/update/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body;
    const result = await gymUser.findOneAndUpdate(
      { email: email },
      updatedData,
      { useFindAndModify: false }
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get By NameApi(searchAPI)

app.get("/gymUser/search/:name", async (req, res) => {
  try {
    // const data = await gymUser.find({name: req.params.name})
    const data = await gymUser.find({
      name: { $regex: ".*" + req.params.name + ".*", $options: "i" },
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by active or inactive
app.get("/gymUser", async (req, res) => {
  // localhost:3000/gymUser?status=inactive&name=basanagouda
  try {
    // Get filters from query parameters
    const { startDate, endDate, status, name } = req.query;

    // Build query based on filters
    const query = {};
    if (startDate && endDate) {
      query.membershipStart = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Check if a specific status is selected
    if (status === "active") {
      query.isSubscribed = true;
    } else if (status === "inactive") {
      query.isSubscribed = false;
    }

    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive name search
    }

    // Fetch data based on the query
    const data = await gymUser.find(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('*', function(req, res){
    res.redirect('/404.html'); // Assuming your 404 page is located in the 'public' directory
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
