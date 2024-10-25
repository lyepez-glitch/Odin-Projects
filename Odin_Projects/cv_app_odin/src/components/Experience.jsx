


function Experience({person,setExperience}){
  function handleSubmit(e){
    e.preventDefault();

    console.log('data',e.target)
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log('Form data:', formJson);
    setExperience(formJson);
  }
  function handleCompany(e){
    setExperience({...person,company:e.target.value})
  }
  function handlePosition(e){
    setExperience({...person, position:e.target.value})
  }
  function handleDuties(e){
    setExperience({...person,duties:e.target.value})
  }
  function handleDateFrom(e){
    setExperience({...person,dateFrom:e.target.value})
  }
  function handleDateTo(e){
    setExperience({...person,dateTo:e.target.value})
  }


  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <label for="company">Enter Company:</label>
        <input onChange = {handleCompany} value= {person.company} type="text" id="company"name="company"></input>
        <label for="position">Enter Position:</label>
        <input onChange = {handlePosition} value= {person.position} type="text" id="position" name="position"></input>
        <label for="duties">Enter Duties:</label>
        <input onChange = {handleDuties} value= {person.duties} type="text" id="duties"name="duties"></input>
        <label for="dateFrom">Enter Date From:</label>
        <input onChange = {handleDateFrom} value= {person.dateFrom} type="text" id="dateFrom" name="dateFrom"></input>
        <label for="dateTo">Enter Date To:</label>
        <input onChange = {handleDateTo} value= {person.dateTo} type="text" id="dateTo" name="dateTo"></input>


      </form>
    </>
  )

}

export default Experience;