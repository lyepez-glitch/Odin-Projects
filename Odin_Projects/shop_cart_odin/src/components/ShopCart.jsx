import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import axios from 'axios';
import Cart from './Cart';
import Home from './Home';
const ShopCart = () =>{

  const [items,setItems,renderCart,setCart] = useOutletContext();

  useEffect(()=>{
    fetch('https://fakestoreapi.com/products',{mode:"cors"})
            .then(res=>res.json())
            .then(json=>{
              console.log(json);
              setItems(json);
            })
  },[])
  function handleSubmit(items){
    setCart(true);
  }
  function handleChange(e){
    const {placeholder,value} = e.target;
    const updatedItems = items.map(item=>item.title===placeholder?{...item, count: parseInt(value) || 0}:item);


    setItems(updatedItems)
  }
  function handleIncrement(item){

    const updatedItems = items.map(i=>i.title===item.title?{...i, count: (i.count || 0) + 1}:i);


    setItems(updatedItems)
  }
  function handleDecrement(item){

    const updatedItems = items.map(i=>i.title===item.title?{...i, count: (i.count || 0) - 1}:i);


    setItems(updatedItems)
  }
  function addToCart(item){
    const updatedItems = items.map(i=>i.title===item.title?{...i, add: true} :i);


    setItems(updatedItems)
  }
  return (
    <div>
      {renderCart?(<Cart items = {items}/>):
      (<><button onClick={()=>handleSubmit()}>Checkout And Pay</button>
      <h1>Hello, this is the shopping cart.</h1>
      <div>
        {
          items.map((item)=>(
            <div key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p>{item.category}</p>
              <label>
              How many?:
              <input placeholder={item.title}onChange={handleChange}type="text" name={item.title} value={item.count || '0'} />
            </label>
            <button onClick={()=>handleIncrement(item)}>+</button>
            <button onClick={()=>handleDecrement(item)}>-</button>
              <button onClick = {()=>addToCart(item)}>Add to Cart</button>
            </div>
          ))
        }

      </div></>)
      }



    </div>
  )
}

export default ShopCart;