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
    "avatar" : "data:image/jpeg;base64,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"
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
