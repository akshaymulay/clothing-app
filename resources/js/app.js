import axios from 'axios';
import Noty from 'noty';
import { initAdmin } from './admin'
import moment from 'moment';
let addToCart=document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')

function updateCart(item){
	axios.post('/update-cart',item).then(res=>{
		cartCounter.innerText=res.data.totalQty
			new Noty({
	    text: 'Item Added To Cart',
	    type:'success',
	    timeout:1000,
	    progressBar:false,
	    layout:'topLeft'
	}).show();
	}).catch(err=>{
		new Noty({
	    text: 'Something Went Wrong',
	    type:'error',
	    timeout:1000,
	    progressBar:false,
	    layout:'topLeft'
	}).show();
	})
}

addToCart.forEach((btn)=>{
	btn.addEventListener('click',(e)=>{
		let item=JSON.parse(btn.dataset.item) //to acces data value dataset used
		updateCart(item)
		
	})
})

//Remove Alert Message delay
const alertMsg=document.querySelector('#succes-alert')
if(alertMsg){
	setTimeout(()=>{
		alertMsg.remove()
	},2000)
}


initAdmin()

//Change Order Status
let statuses=document.querySelectorAll('.status_line')
let hiddenInput=document.querySelector('#hiddenInput')
let order=hiddenInput?hiddenInput.value:null
order=JSON.parse(order)
let time=document.createElement('small')
function updateStatus(order){
statuses.forEach((status)=>{
	status.classList.remove('step-completed')
	status.classList.remove('current')
})
	let stepCompleted=true;
	statuses.forEach((status)=>{
		let dataProp=status.dataset.status
		if(stepCompleted){
			status.classList.add('step-completed')
		}

		if(dataProp===order.status){
			stepCompleted=false
			time.innerText=moment(order.updatedAt).format('hh:mm A')
			status.appendChild(time)
			if(status.nextElementSibling){
				status.nextElementSibling.classList.add('current')
			}
			
		}

	})


}

updateStatus(order)