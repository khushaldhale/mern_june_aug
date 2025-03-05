const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
	{
		// fname: String 

		// type: specify the datatype of field 
		fname: {
			type: String,
			required: true
		},

		lname: {
			type: String,
			required: true
		},

		email: {
			type: String,
			required: true
		},

		password: {
			type: String,
			required: true
		},

		tasks: [
			//  it wll be storing array 
			{
				//  mongodb object id datatype 
				type: mongoose.Schema.Types.ObjectId,
				//  which collection or table u are referencing too 
				ref: "task",
				required: true

			}
		],


		// hobbies: []  //   so  u can dump here , number , boolean , string

		// hobbies: [{ type: Number, req }], // { type: String, required:true  }  , here u are specifying 
		//  the dataypes which is allowed in array 





	}
)

module.exports = mongoose.model("user", userSchema)