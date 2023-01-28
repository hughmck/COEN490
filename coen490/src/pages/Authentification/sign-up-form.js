import { Button, TextField } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

const Signup = () => {


 const navigate = useNavigate();
 const location = useLocation();

 // As explained in the Login page.
 const { emailPasswordSignup } = useContext(UserContext);
 const [form, setForm] = useState({
   email: "",
   password: ""
 });


 // As explained in the Login page.
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };



 // As explained in the Login page.
 var status = 'status', storage = window.localStorage;
 var email = form.email;

 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   if(form.email.slice(form.email.indexOf('@'),form.email.length) === "@easysante.com")
      {

          saveHCP(email);
          storage.setItem(status,'HCP')
          navigate(redirectTo ? redirectTo : "/HCP-dahboard");
          window.location.reload();
      }
      else {

          saveUser(email);
          storage.setItem(status,'user')
          navigate(redirectTo ? redirectTo : "/user-dashboard");
          window.location.reload();
      }
 }

 //send user to back-end.
 function saveUser(email){
   let databody = {
    "email": email,
    "name": "AntoineS"
   }
   console.log('test')
   fetch('http://localhost:4444/sign-up/user', {
        method: 'POST',
        body: JSON.stringify(databody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => console.log("data sent to BackEnd"));

}

//send HCP to back-end.
function saveHCP(email){
  let databody = {
   "email": email,
   "name": "TESTBOOK",
   "reason": "work",
   "type": "meeting"
  }

  fetch('http://localhost:4444/sign-up/HCP', {
       method: 'POST',
       body: JSON.stringify(databody),
       headers: {
           'Content-Type': 'application/json'
       },
   })
   .then(res => res.json())
   .then(data => console.log(data));

}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

 // As explained in the Login page.
 const onSubmit = async () => {
   try {
     const user = await emailPasswordSignup(form.email, form.password);
     if (user) {

       redirectNow();
     }
   } catch (error) {
     alert(error);
   }
 };

 return <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
   <h1>Signup</h1>

   <TextField
     label="Email"
     type="email"
     variant="outlined"
     name="email"
     value={form.email}
     onInput={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <TextField
     label="Password"
     type="password"
     variant="outlined"
     name="password"
     value={form.password}
     onInput={onFormInputChange}
     style={{ marginBottom: "1rem" }}
   />
   <Button variant="contained" color="primary" onClick={onSubmit}>
     Signup
   </Button>
   <p>Have an account already? <Link to="/login">Login</Link></p>
 </form>
}

export default Signup;
