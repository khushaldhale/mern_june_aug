
const userSchema = require("../models/user")

exports.register = async (req, res) => {
	try {

		// const fname = req.body.fname ;  avoid this

		const { fname, lname, email, password } = req.body;

		//  validation , whether  the data is received or not 


		if (!fname || !lname || !email || !password) {
			return res.status(400)
				.json({
					success: false,
					message: " kindly provide all details "
				})
		}

		const response = await userSchema.create({ fname, lname, email, password });

		return res.status(200)
			.json({
				success: true,
				message: "user is registered succesully",
				data: response
			})

	}
	catch (error) {
		console.log(error)
		return res.status(500)
			.json({
				success: false,
				message: "Internal error occured"
			})
	}
}