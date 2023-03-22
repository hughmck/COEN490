import { Button, TextField } from "@mui/material";
import { MDBContainer } from "mdb-react-ui-kit";
import { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
//import './sign-up.css';



const Signup = () => {


 const { emailPasswordSignup } = useContext(UserContext);
 const navigate = useNavigate();
 const location = useLocation();

 // As explained in the Login page.
  const [form, setForm] = useState({ email: ""});
  const [newform, setNewForm] = useState({ firstname: "", lastname: "", phone: "", password: "" });
  const [showSecondForm, setShowSecondForm] = useState(false);
  const [isProfessionForm, setIsProfessionForm] = useState(false);
  const [professionForm, setProfessionForm] = useState({ firstname: "", lastname: "",profession: "", specialty: "", city: "",  password: "" });

  const onFormInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const onNewFormInputChange = (e) => {
    const { name, value } = e.target;
    setNewForm((prevNewForm) => ({ ...prevNewForm, [name]: value }));
  };

  const onProfessionFormInputChange = (e) => {
    const { name, value } = e.target;
    setProfessionForm((prevProfessionForm) => ({ ...prevProfessionForm, [name]: value }));
  };

  var password;
  const onSubmitFirstForm = (e) => {
    e.preventDefault();
    if (form.email.slice(form.email.indexOf('@'),form.email.length) === "@easysante.com") {
    setShowSecondForm(true);
    setIsProfessionForm(true);

  } else {
    setShowSecondForm(true);
    setIsProfessionForm(false);
  }

  };

  const onSubmitSecondForm = (e) => {
    e.preventDefault();
      if (form.email.slice(form.email.indexOf('@'),form.email.length) === "@easysante.com"){
        password = professionForm.password;
      }
      else{
        password = newform.password;
      }
    onSubmit();
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
    "firstname": newform.firstname,
    "lastname": newform.lastname,
    "phone": newform.phone,
    "city": newform.city,
    "dataHCP" : true,
    "dataDash" : true,
    "dataEasy" : true,
    "avatar" : "default.jpg"
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
   "firstname": professionForm.firstname,
   "lastname": professionForm.lastname,
   "profession": professionForm.profession,
   "specialty": professionForm.specialty,
   "city": professionForm.city
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




 // As explained in the Login page.
 const onSubmit = async () => {
   try {
     const user = await emailPasswordSignup(email, password);
     if (user) {
       redirectNow();
     }
   } catch (error) {
     alert(error);
   }
 };

 return (
  <>
  <MDBContainer class="signup-form">
    {showSecondForm ? (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "auto",
        }}
        onSubmit={onSubmitSecondForm}
      >
        <h1>Signup</h1>
        {isProfessionForm ? (
          <>
          <TextField
            label="First"
            type="text"
            variant="outlined"
            name="firstname"
            value={professionForm.firstname}
            onInput={onProfessionFormInputChange}
            style={{ marginBottom: "1rem" }}
          />
          <TextField
            label="Last"
            type="text"
            variant="outlined"
            name="lastname"
            value={professionForm.lastname}
            onInput={onProfessionFormInputChange}
            style={{ marginBottom: "1rem" }}
          />
            <TextField
              label="Profession"
              type="text"
              variant="outlined"
              name="profession"
              value={professionForm.profession}
              onInput={onProfessionFormInputChange}
              style={{ marginBottom: "1rem" }}
            />

            <TextField
              label="Specialty"
              type="text"
              variant="outlined"
              name="specialty"
              value={professionForm.specialty}
              onInput={onProfessionFormInputChange}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              label="City"
              type="text"
              variant="outlined"
              name="city"
              value={professionForm.city}
              onInput={onProfessionFormInputChange}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={professionForm.password}
              onInput={onProfessionFormInputChange}
              style={{ marginBottom: "1rem" }}
            />
          </>
        ) : (
          <>
            <TextField
              label="First"
              type="text"
              variant="outlined"
              name="firstname"
              value={newform.firstname}
              onInput={onNewFormInputChange}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Last"
              type="text"
              variant="outlined"
              name="lastname"
              value={newform.lastname}
              onInput={onNewFormInputChange}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Phone"
              type="text"
              variant="outlined"
              name="phone"
              value={newform.phone}
              onInput={onNewFormInputChange}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              label="City"
              type="text"
              variant="outlined"
              name="city"
              value={newform.city}
              onInput={onNewFormInputChange}
              style={{ marginBottom: "1rem" }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              name="password"
              value={newform.password}
              onInput={onNewFormInputChange}
              style={{ marginBottom: "1rem" }}
            />
          </>
        )}
        <Button variant="contained" color="primary" type="submit">
          Sign Up
        </Button>
      </form>
    ) : (
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "300px",
          margin: "auto",
        }}
        onSubmit={onSubmitFirstForm}
      >
        <h1>Signup</h1>

        <TextField
          label="Email"
          type="email"
          variant="outlined"
          name="email"
          value={form.email}
          onInput={onFormInputChange}
          style={{ marginBottom: "1rem", backgroundColor: "white" }}
        />
        <Button variant="contained" color="primary" type="submit">
          Continue
        </Button>
        <p>
          Have an account already? <Link to="/login">Login</Link>
        </p>
      </form>
    )}
    </MDBContainer>
  </>
);
}

export default Signup;
