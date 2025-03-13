
const userSchema = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


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

		//  password hashing : bcrypt 
		//  data that u have to hash, number of rounds 
		//  it is  a promise  so always await
		const hashedPassword = await bcrypt.hash(password, 10)

		const is_existing = await userSchema.findOne({ email });

		console.log(is_existing)

		if (is_existing) {

			return res.status(400)
				.json({
					success: false,
					message: 'you are already registered ,  kindy login'
				})

		}
		const response = await userSchema.create({ fname, lname, email, password: hashedPassword });

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


exports.login = async (req, res) => {
	try {

		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400)
				.json({
					success: false,
					message: " kindly provide all credentials "
				})
		}

		const is_existing = await userSchema.findOne({ email });

		if (!is_existing) {
			return res.status(400)
				.json({
					success: false,
					message: "you are not registered yet, kindly register first  "
				})
		}


		//  password matching 
		//  if not hashed then it had to be simple 
		//  as we have hashed it then we have to  compare it or match it via bcrypt 

		//  it return boolean values , if matched then true else  false 

		console.log("resonse : ", await bcrypt.compare(password, is_existing.password))
		if (await bcrypt.compare(password, is_existing.password)) {
			//  generate  a token
			//   it is not promise , ity is sync code 
			//  two para: payload, signature 
			const token = jwt.sign(
				{
					//   here u can provide both  username / email and password
					//  but it is always recommedned to provide data which is requied for aut
					//  authentication and authorization only 
					//  the key which is unique in document , which  can be used for authentication
					//  confidentual data should  not be provided , if hacker hacks then it willl causse a problem


					email: email,
					_id: is_existing._id
					//  email , _id
				},

				//  signature  for hashing 
				"khushal123#321", {
				//  set an expiry of token
				expiresIn: "5m"
			}
			)


			//  sending response as a cookie

			//  cookie name, cookie value,  options
			res.cookie("token", token, {
				//  localstorage: it can be accesiible via js also

				httpOnly: true, //  now cookies is accessible via httpp only 
				// httpOnly:false,   now cookies can be acccessible via js and http both , 


				// set an  expiry for the cokkis

				expires: new Date(Date.now() + 1000 * 60 * 5)

			})
				.status(200)
				.json({
					success: true,
					message: "user is logged in succefully ",
					data: is_existing
				})



		} else {
			return res.status(400)
				.json({
					success: false,
					message: "password is  incorrect "
				})
		}

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



exports.logout = async (req, res) => {
	try {

		// remove the token,
		// insted u override + remove the token 

		return res.cookie("token", null, {
			httpOnly: true,
			expires: new Date(Date.now())
		})
			.status(200)
			.json({
				success: true,
				message: 'user is logged out succesfully '
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