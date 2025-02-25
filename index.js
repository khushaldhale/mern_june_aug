
const express = require("express");
const app = express();



// middlewares , to accept the data from client 
app.use(express.json())

app.get("/", (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: "server is up and running "
		})
})

//  flow : 1. create the mongodb connection separately 
// 2. create the models then 
// 3. create the controller 
// 4. then map it like below

const { createTask } = require("./controllers/task");
app.post("/tasks", createTask)



const dbConnect = require("./config/dbConnect");
dbConnect()



app.listen(4000, () => {
	console.log("server is listening at : 4000")
})


// steps:
// 1. npm init -y
// 2. install dependencies needed
// 3. create index.js and write basic code
// 4. create a custom modules and start working over that.