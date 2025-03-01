const mongoose = require("mongoose");



const dbConnect = () => {
	mongoose.connect("mongodb://localhost:27017/MERN")
		.then((data) => {
			console.log("db connection is established : ", data.connection.host)
		})
		.catch((error) => {
			console.log("error occured while connecting to db : ", error)
		})

}

module.exports = dbConnect