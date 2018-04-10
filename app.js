var express = require("express");
var app = express();
var port = 3000;
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// container specific configuration
//mongoose.connect("mongodb://127.0.0.1:27017/demo");
mongoose.connect("mongodb://0.0.0.0:27017/node-demo");
// mongoose.connect("mongodb://localhost:27017/node-demo");


// converts data from the <body> into JSON for storage into db
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// constraints the model must abide by
var nameSchema = new mongoose.Schema({
	firstName: String,
	lastName: String
});

// the model
var User = mongoose.model("User", nameSchema);

// basic function for testing server functionaility
// app.use("/", (req, res) => {
// 	res.send("Hello World");
// });

// root endpoint
app.use("/", (req, res) => {
	res.sendFile(__dirname + "/index.html");
});

// REST endpoint for form
app.post("/addname", (req, res) => {
	var myData = new User(req.body);
	console.log(myData);
	// if the data was saved to the data-base, let the user know.
	// else, return a failed status and the error message
	myData.save()
		.then(item => {
			res.send("Your name has been successfully added.");
		})
		.catch(err => {
			res.status(400).send("Something went wrong, we're unable to save your information at this time.");
		});
});

app.listen(port, () => {
	console.log("Server listening on port " + 3000);
});