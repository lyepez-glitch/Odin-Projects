import React from 'react';
import { Link } from "react-router-dom";
const Nav = ({name,handleClick,items}) =>{
  console.log('items',items)
  return(
    <>
    <nav>
        <ul>
          <li>
          {
              name=== 'Home'?(<Link onClick={handleClick} to="ShopCart">Shop Cart</Link>): name === 'Shop Cart'?(
                <>
              <a onClick={handleClick} href="http://127.0.0.1:5174/">Home</a>
              <div>Count: {items.length}</div>
                </>
              ):<Link onClick={handleClick} to="/">Home</Link>

          }

          </li>
        </ul>
      </nav>
    </>
  )
}
export default Nav;