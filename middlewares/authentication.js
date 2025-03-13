const jwt = require("jsonwebtoken")



exports.authentication = async (req, res, next) => {

	try {

		const token = req.cookies.token;

		console.log("token is : ", token)

		if (!token) {
			return res.status(400)
				.json({
					success: false,
					message: " kindly login yourself"
				})
		}

		// here two things can happen , 
		//  if  valid token: then verify method return payload
		// token invalid: then it returns undefined or null 
		const payload = jwt.verify(token, "khushal123#321")

		console.log("payload is : ", payload)
		if (!payload) {
			return res.status(400)
				.json({
					success: false,
					message: "Token is invalid, kindly login again  "
				})
		}
		req.payload = payload;
		console.log("payload is : ", req.payload)

		next();



	}
	catch (errror) {
		console.log("error occured", errror)
	}

}