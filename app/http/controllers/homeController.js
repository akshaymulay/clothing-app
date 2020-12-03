const Item=require('../../models/item')
function homeController(){
	return{
		async index(req,res){
			const items=await Item.find()
			res.render('home',{items:items})
			
		}
	}
}

module.exports=homeController

//model is imported here then fire query on that mmodel varaible with then 
//sending the result in the form og key