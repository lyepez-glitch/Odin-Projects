import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
const Home = () =>{
const [name,setName] = useState("Home");
const [items,setItems] = useState([]);
const [renderCart,setCart] = useState(false);
function handleClick(e){
  setName(e.target.textContent)
}
return(
  <div>
    {
    !renderCart && (

      <div>
        <h1>Hello, this is the home page.</h1>
        <Nav handleClick={handleClick} name = {name} items={items}/>

        <h1>About</h1>
        <img id="logo" src="./src/imgs/logo.jpg"></img>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi qui error repellat sed sunt ea, consequuntur, ipsam, temporibus nostrum inventore blanditiis reprehenderit vitae enim quas a suscipit omnis alias. Laudantium!
        <img id="company" src="./src/imgs/company.jpg"></img>

        </p>

      </div>
    )

  }
  <Outlet context={[items,setItems,renderCart,setCart]}/>
  </div>


)


}

export default Home;