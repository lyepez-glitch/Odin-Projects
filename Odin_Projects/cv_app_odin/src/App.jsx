import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContactInfo from './components/ContactInfo.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import DisplayedContent from './components/DisplayedContent.jsx'
import './styles/style.css'
function App() {

  const [contactInfo,setContactInfo] = useState({name:'',email:'',phone:''})
  const [education,setEducation] = useState({school:'',major:'',date:''})
  const [experience,setExperience] = useState({company:'',position:'',duties:'',dateFrom:'',dateTo:''})
  const [edit,setEdit] = useState(true);
  function handleClick(){
    setEdit(false);
  }
  return (
    <>



      {edit?(
        <>
        <h2>Contact Info:</h2>
        <ContactInfo setContactInfo = {setContactInfo} person={contactInfo}/>
        <h2>Education:</h2>
        <Education setEducation = {setEducation} person={education}/>
        <h2>Experience:</h2>
        <Experience setExperience = {setExperience} person={experience}/>
        <button onClick = {handleClick}>Submit form</button>

        </>

      )

      :(
        <>
        <DisplayedContent contactInfo={contactInfo} experience={experience} education={education} setEdit = {setEdit} edit={edit}/>

        </>
        )



      }




    </>
  )
}

export default App
