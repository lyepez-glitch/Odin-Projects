import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";



const Cart = ({items})=>{

 console.log('cart items',items)
 let total = 0;
 items.forEach((item)=>{
   if(item.add){
     total += (item.price * item.count);
   }
 })

console.log('total',total)


  return(
    <>
    <a href="http://127.0.0.1:5174/">Home</a>
    <div>This is the cart. Pay here!</div>
    <div>Total:${total.toFixed(2)}</div>
    </>
  )
}
export default Cart;