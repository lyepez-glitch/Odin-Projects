function Education({person,setEducation}){
  function handleSubmit(e){
    e.preventDefault();

    console.log('data',e.target)
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log('Form data:', formJson);
    setEducation(formJson);
  }
  function handleSchool(e){
    setEducation({...person,school:e.target.value})
  }
  function handleMajor(e){
    setEducation({...person,major:e.target.value})
  }
  function handleDate(e){
    setEducation({...person,date:e.target.value})
  }
  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <label for="school">Enter School:</label>
        <input onChange = {handleSchool} value= {person.school} type="text" id="name"name="name"></input>
        <label for="major">Enter Major:</label>
        <input onChange = {handleMajor} value= {person.major} type="text" id="major" name="major"></input>
        <label for="date">Enter Date:</label>
        <input onChange = {handleDate} value= {person.date} type="text" id="date"name="date"></input>


      </form>
    </>
  )

}
export default Education;