function cartController(){
	return{
		index(req,res){
			res.render('customers/cart')
		},
		update(req,res){

//for the first time creating cart with basic object structure
			if(!req.session.cart){//to access session
				req.session.cart={
					items:{},
					totalQty:0,
					totalPrice:0
				}
				

			}
				let cart=req.session.cart

				//check if elements added to cart or not
				if(!cart.items[req.body._id]){
					cart.items[req.body._id]={
						item:req.body,
						qty:1
					}
					cart.totalQty=cart.totalQty+1
					cart.totalPrice=cart.totalPrice+req.body.price

				} else{//if item is present
					cart.items[req.body._id].qty=cart.items[req.body._id].qty+1
					cart.totalQty=cart.totalQty+1
					cart.totalPrice=cart.totalPrice+req.body.price
				}

			return res.json({totalQty:req.session.cart.totalQty})
		}
	}
}

module.exports=cartController