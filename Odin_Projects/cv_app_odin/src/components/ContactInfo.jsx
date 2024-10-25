

function ContactInfo({person,setContactInfo}){
  function handleSubmit(e){
    e.preventDefault();

    console.log('data',e.target)
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    console.log('Form data:', formJson);
    setContactInfo(formJson);
  }
  function handleName(e){
    setContactInfo({...person,name:e.target.value})
  }
  function handleEmail(e){
    setContactInfo({...person,email:e.target.value})
  }
  function handlePhone(e){
    setContactInfo({...person,phone:e.target.value})
  }

  return (
    <>
    <form method="post" onSubmit={handleSubmit}>
      <label for="name">Enter Name:</label>
      <input onChange = {handleName} value= {person.name} type="text"id="name"name="name"></input>
      <label for="email">Enter Email:</label>
      <input onChange = {handleEmail} value= {person.email} type="text" id="email" name="email"></input>
      <label for="phone">Enter Phone:</label>
      <input onChange = {handlePhone} value= {person.phone} type="text" id="phone"name="phone"></input>


    </form>


    </>
  )
}
export default ContactInfo