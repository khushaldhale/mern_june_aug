
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