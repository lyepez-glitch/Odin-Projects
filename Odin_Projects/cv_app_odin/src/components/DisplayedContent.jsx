function DisplayedContent({education,experience,contactInfo,edit,setEdit}){
  const contactInfoKeys = Object.keys(contactInfo)
  const educationKeys = Object.keys(education)
  const experienceKeys = Object.keys(experience);
  function handleClick(){
    setEdit(true);
  }
  return(

    <>

          <h2>Contact Info:</h2>
      <ul>
          {
          contactInfoKeys.map((key)=>(
            <li key = {key}>{key}:{contactInfo[key]}</li>

            ))
            }

        </ul>

        <h2>Education:</h2>

        <ul>
          {
          educationKeys.map((key)=>(
            <li key = {key}>{key}:{education[key]}</li>
            ))
            }

        </ul>
        <h2>Experience:</h2>

        <ul>
          {
          experienceKeys.map((key)=>(
            <li key = {key}>{key}:{experience[key]}</li>
            ))
            }

        </ul>
        <button onClick={handleClick}>Edit</button>
    </>
  )
}

export default DisplayedContent