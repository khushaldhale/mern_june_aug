
const taskSchema = require("../models/task")

// ./ siblings , ../ parent , / child


//  controllers  are nothing but the functions containing api logic

//  work: 1.receive a data from client and dump it in db

//  every db operation is asynchronous , thats why  we are making function async 

exports.createTask = async (req, res) => {

	//1. extract the data sent from clinet from req object 

	const task_name = req.body.task_name;
	const task_desc = req.body.task_desc;


	// 2. dump it in db, collection

	//  import the model or collection as we have to work with the collection
	//  we have to dump  a data

	// create: insert the document in the collection
	// create method wants object , that object will be dumped in the collection
	// it return the document which is inserted in the collection
	const response = await taskSchema.create({ task_name: task_name, task_desc: task_desc });

	return res.status(200)
		.json(
			{
				success: true,
				message: "task is created succesfully",
				data: response
			}
		)


}


exports.getAllTask = () => {

}
