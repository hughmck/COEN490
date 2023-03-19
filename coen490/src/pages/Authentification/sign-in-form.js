import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import jQuery from 'jquery'

const Login = () => {
 const navigate = useNavigate();
 const location = useLocation();


 const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);

 const [form, setForm] = useState({
   email: "",
   password: ""
 });


 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };


 var status = 'status', storage = window.localStorage;
 var email = form.email;

 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   if(form.email.slice(form.email.indexOf('@'),form.email.length) === "@easysante.com")
      {
          saveHCP(email)
          storage.setItem(status,'HCP')
          navigate(redirectTo ? redirectTo : "/HCP-dahboard");
          window.location.reload();
      }
      else {
          saveUser(email)
          storage.setItem(status,'user')
          navigate(redirectTo ? redirectTo : "/user-dashboard");
          window.location.reload();
      }
 }

 //send HCP to back-end.
 function saveHCP(email){
   let databody = {
    "email": email
   }

   fetch('http://localhost:4444/sign-in/HCP', {
        method: 'POST',
        body: JSON.stringify(databody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => console.log(data));

 }

 //send user to back-end.
 function saveUser(email){
   let databody = {
    "email": email,
    "name": "TEST"
   }

   fetch('http://localhost:4444/sign-in/user', {
        method: 'POST',
        body: JSON.stringify(databody),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(data => console.log(data));

 }


 const loadUser = async () => {
   if (!user) {

     const fetchedUser = await fetchUser();
     if (fetchedUser) {

       redirectNow();
     }
   }
 }


 useEffect(() => {
   loadUser();
 }, []);





 const onSubmit = async (event) => {
   try {

     const user = await emailPasswordLogin(form.email, form.password);
     if (user) {
       redirectNow();
     }
   } catch (error) {
       if (error.statusCode === 401) {
          alert("Invalid username/password. Try again!");
      } else {
          alert(error);
          console.log(error);
      }

   }
 };

 return <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>
   <h1>Login</h1>
   <TextField
     label="Email"
     type="email"
     variant="outlined"
     name="email"
     value={form.email}
     onChange={onFormInputChange}
     style={{ marginBottom: "1rem", backgroundColor: "white" }}
   />
   <TextField
     label="Password"
     type="password"
     variant="outlined"
     name="password"
     value={form.password}
     onChange={onFormInputChange}
     style={{ marginBottom: "1rem", backgroundColor: "white"}}
   />
   <Button variant="contained" color="primary" onClick={onSubmit}>
     Login
   </Button>
   <p>Don't have an account? <Link to="/signup">Signup</Link></p>
 </form>
}

export default Login;
