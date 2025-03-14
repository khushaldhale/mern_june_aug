
const express = require("express");
const app = express();
const { authentication } = require("./middlewares/authentication")


// middlewares , to accept the data from client 
app.use(express.json())

// so u need cookie parser whenever u hve to accept cookies 
// npm i cookie-parser

// cookies are imported
const cookies = require("cookie-parser");
app.use(cookies()) // middleware for the cookies are attached 

const serverCheck = (req, res) => {
	return res.status(200)

		.json({
			success: true,
			message: "server is up and running "
		})
}
// middlewares : custom , logging , authentication , authorization 



app.get("/",
	// middleware
	(req, res, next) => {
		console.log("hello from server")
		// calling to the next middleware or function or controller via next (0)
		next()
	}
	, serverCheck)



// testing of auth module

app.get("/token/auth", authentication, (req, res) => {

	console.log("payload in my controller is : ", req.payload.email, req.payload._id)
	return res.status(200)
		.json({
			success: true,
			message: "This is actual controller"
		})
})


//  flow : 1. create the mongodb connection separately 
// 2. create the models then 
// 3. create the controller 
// 4. then map it like below

// const { createTask, getAllTask, deleteTask, updateTask } = require("./controllers/task");
// app.post("/tasks", createTask)
// app.get("/tasks", getAllTask)
// app.delete("/tasks/:id", deleteTask)
// app.put("/tasks/:id", updateTask)

// it is not recommmneded to export somethig from index.js 
//  if it is needded then u can do that , but try to avoid 

const taskRoutes = require("./routes/taskRoutes");

// mapping of the routes with the server application 
// mapping ofn the routes
app.use("/api/v1/tasks", taskRoutes)
// http://localhost:4000/

const authRoutes = require("./routes/authRoutes")
app.use("/api/v1/auth", authRoutes)



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