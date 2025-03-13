
const taskSchema = require("../models/task");
const userSchema = require("../models/user");

// ./ siblings , ../ parent , / child


//  controllers  are nothing but the functions containing api logic

//  work: 1.receive a data from client and dump it in db

//  every db operation is asynchronous , thats why  we are making function async 

exports.createTask = async (req, res) => {

	//1. extract the data sent from clinet from req object 

	const task_name = req.body.task_name;
	const task_desc = req.body.task_desc;

	const user_id = req.payload._id

	// 2. dump it in db, collection

	//  import the model or collection as we have to work with the collection
	//  we have to dump  a data

	// create: insert the document in the collection
	// create method wants object , that object will be dumped in the collection
	// it return the document which is inserted in the collection
	const response = await taskSchema.create({ task_name: task_name, task_desc: task_desc });


	// Another phase

	//  task is created and map it with user schema
	const user = await userSchema.findByIdAndUpdate(user_id, { $push: { tasks: response._id } }, { new: true })

	return res.status(200)
		.json(
			{
				success: true,
				message: "task is created succesfully",
				data: response
			}
		)


}


exports.getAllTask = async (req, res) => {

	// const response = await taskSchema.find({});


	const user_id = req.payload._id;

	const response = await userSchema.findById(user_id).populate("tasks")

	return res.status(200)
		.json({
			success: true,
			message: "all tasks are fetched succesfully",
			data: response.tasks
		})

}



//    if  any errror occurs then  the programs is terminated and server stops working 
//  so no more reqest will be handled 

//  so we have to habdle the errors with the help of exception handling 

exports.deleteTask = async (req, res) => {

	//  wrap the code inside the try and catch 

	try {

		// for  dynamic paramters , we are getting data not from body
		//  but from url itself
		const task_id = req.params.id

		const user_email = req.payload.email;
		// directly provide id or {_id: task_id}
		// below  ways is recommneded
		const response = await taskSchema.findByIdAndDelete(task_id);
		//  task is deleted from task collection

		//  but we have to remove the reference also  fromuser collection , docuemnt 

		//  find the document and remove reference from it 
		const user = await userSchema.findOneAndUpdate({ email: user_email }, { $pull: { tasks: task_id } }, { new: true })


		return res.status(200)
			.json({
				success: true,
				message: "task is deleted succesfully",
				data: response
			})


	}
	catch (error) {
		console.log(error)

		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured from server"
			})

		//  sending response from here 
		//  only when the error is occured 

	}


}



exports.updateTask = async (req, res) => {
	try {

		const task_id = req.params.id
		const task_name = req.body.task_name;
		const task_desc = req.body.task_desc;
		//  even thorugh the task is updated in db still findbyidAdnUpdate method return the old document 

		// {new:true} : means the document is returned which is upadted 
		const response = await taskSchema.findByIdAndUpdate(task_id, { task_name, task_desc }, { new: true });

		return res.status(200)
			.json({
				success: true,
				message: "task is updated succesfully",
				data: response
			})

	}
	catch (error) {
		console.log(error)

		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured from server"
			})

	}

}