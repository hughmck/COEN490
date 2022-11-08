import './App.css';
import NavBar from "./navbar"
import SignIn from "./pages/sign-in"
import SignUp from "./pages/sign-up"
import UserW from "./pages/USER/user"
import Home from "./pages/home"
import {Route, Routes} from "react-router-dom"
import { initializeApp } from 'firebase/app'

function App() {

    return(
    <>
      <NavBar />
      <div className = "container">
        <Routes>
          <Route path = "/" element = {<Home />} />
          <Route path = "/sign-in" element = {<SignIn />} />
          <Route path = "/sign-up" element = {<SignUp />} />
          <Route path = "/user-dashboard" element = {<UserW />} />
        </Routes>
      </div>
    </>
  )

}

export default App;
