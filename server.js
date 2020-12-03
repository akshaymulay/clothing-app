const express=require('express')
require('dotenv').config()//to acces all variables from env file
const app=express() //express act as function
//listen express server with port and callback function
//at the time of production environment port numbers are differents according to there machines
//process.env consist of environment variables
const PORT=process.env.PORT || 3001
const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
const path=require('path')
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('express-flash') //show errors msg
const MongoDbStore=require('connect-mongo')(session)//store session in db
const passport=require('passport')
//db connection
const url='mongodb://localhost:27017/cloth';
mongoose.connect(url,{ useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true});
const connection=mongoose.connection;
connection.once('open',()=>{
	console.log('Database connected...');
}).catch(err=>{
	console.log('connection failed...');
});



//session store
let mongoStore=new MongoDbStore({
	mongooseConnection:connection,
	collection:'sessions'
})
//session configuration
app.use(session({
	secret:process.env.COOKIE_SECRET,
	resave:false,
	store:mongoStore,//by default it saves it in memeory ow its store in db config by us
	saveUninitialized:false,
	cookie:{maxAge:1000*60*60*24} //24hrs
}))

//passport config
const passportInit=require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//app.get is used for request on first hit using res.send
//but we have to render views in it but we are using ejs so we have to include it


//assets
app.use(express.static('public'))
app.use(express.urlencoded({extended:false})) //recieve form data
app.use(express.json())

//global value
app.use((req,res,next)=>{
	res.locals.session=req.session
	res.locals.user=req.user
	next()

})
//set template engine
app.use(expressLayout)
//tell our views
app.set('views',path.join(__dirname,'/resources/views'))
//set view engine
app.set('view engine','ejs')
require('./routes/web')(app)




app.listen(PORT,()=>{
	console.log(`listening on port ${PORT}`)
})