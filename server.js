const express=require('express')
const app=express() //express act as function
//listen express server with port and callback function
//at the time of production environment port numbers are differents according to there machines
//process.env consist of environment variables
const PORT=process.env.PORT || 3001
const ejs=require('ejs')
const expressLayout=require('express-ejs-layouts')
const path=require('path')

//app.get is used for request on first hit using res.send
//but we have to render views in it but we are using ejs so we have to include it


app.get('/',(req,res)=>{
res.render('home')
})

//set template engine
app.use(expressLayout)
//tell our views
app.set('views',path.join(__dirname,'/resources/views'))
//set view engine
app.set('view engine','ejs')




app.listen(PORT,()=>{
	console.log(`listening on port ${PORT}`)
})