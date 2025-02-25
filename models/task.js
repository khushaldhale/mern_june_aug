const mongoose = require("mongoose");




//  schema is created and stored in a variable
const taskSchema = new mongoose.Schema(
	{
		//  specify the fields of the collection and respective datatype
		task_name: String,
		task_desc: String,

	}
)

// model created and exported , so that we can use that
//  db , plurals
module.exports = mongoose.model("task", taskSchema)