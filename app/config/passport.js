const localStrategy=require('passport-local').Strategy
const User=require('../models/user')
const bcrypt=require('bcrypt')
 function init(passport){
	passport.use(new localStrategy({ usernameField:'email'},async(email,password,done)=>{
			//login
			//check if email exist
			const user=await User.findOne({email:email})

			if(!user){
				return done(null,false,{message:'No User With These Email'})
			}
			bcrypt.compare(password,user.password).then(match=>{

				if(match){
					return done(null,user,{message:'Logged In Succesfully'})
				}
				return done(null,false,{message:'Wrong Username or password'})
			}).catch(err=>{
				return done(null,false,{message:'Something Went Wrong'})
			})


	}))

	passport.serializeUser((user,done)=>{ //pass id using session
		done(null,user._id)
	})
	passport.deserializeUser((id,done)=>{ // get id if id is okk
		User.findById(id,(err,user)=>{
			done(err,user)
		})

	})
}

module.exports=init