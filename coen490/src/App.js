import './style/App.css';

import Home from "./pages/home"

import HomeNavBar from "./pages/NavBar/home-navbar"
import UserNavBar from "./pages/NavBar/user-navbar"
import WhichNav from "./pages/NavBar/whichNavBar"

import SignIn from "./pages/Authentification/sign-in"
import SignUp from "./pages/Authentification/sign-up"
import ForgotP from "./pages/Authentification/forgot-password"
import Error404 from "./pages/Authentification/error404"

import UserDashboard from './pages/USER/user-dashboard'
import UserConnect from './pages/USER/user-connect'
import UserBookApt from './pages/USER/user-book-apts'
import UserViewApt from './pages/USER/user-view-apts'
import UserProfile from './pages/USER/user-profile'

import HCPDashboard from './pages/HCP/HCP-dashboard'
import HCPConnect from './pages/HCP/HCP-connect'
import HCPViewApt from './pages/HCP/HCP-view-apt'
import HCPPatientList from './pages/HCP/HCP-patient-list'
import HCPProfile from './pages/HCP/HCP-profile'

import {Route, Routes, Navigate, useNavigate} from "react-router-dom"
import { initializeApp } from 'firebase/app'

function App() {

  var status = 'status', storage = window.localStorage;
  const navigate = useNavigate()
  //need to add isAuth
  const PrivateRouteUser = ({children}) => {

    if (localStorage.getItem('status')=== '')
    {
        //storage.setItem(status,'none');
        return <Navigate to="/sign-in" />;

    }
    if(localStorage.getItem('status') === 'HCP'){

      return <Navigate to="/error404" />;
    }
    else {

        return children;
    }


    };

    const PrivateRouteHCP = ({children }) => {
      if (localStorage.getItem('status') === '')
      {
          //storage.setItem(status,'none');
          return <Navigate to="/sign-in" />;
      }
      if(localStorage.getItem('status') === 'user'){

        return <Navigate to="/error404" />;
      }
      else {
          return children;
      }
          //storage.setItem(status,'none')

      };



      const AlreadyAuthHome = ({children }) => {
        switch(localStorage.getItem('status')) {
          case 'user':
              return <Navigate to="/user-dashboard" />;
            break;
          case 'HCP':
              return <Navigate to="/HCP-dashboard" />;
            break;
          default:
            return children
      }
        };


    return(
    <>
      <WhichNav />
      <div className = "container">
        <Routes>
          <Route path = "/" element = {<AlreadyAuthHome> <Home /> </AlreadyAuthHome>} />

          <Route path = "/sign-in" element = {<AlreadyAuthHome> <SignIn /> </AlreadyAuthHome>} />
          <Route path = "/sign-up" element = {<AlreadyAuthHome> <SignUp /> </AlreadyAuthHome>} />
          <Route path ="/forgot-password" element = {<AlreadyAuthHome> <ForgotP /> </AlreadyAuthHome>} />

          <Route path = "/user-DashBoard" element = {<PrivateRouteUser> <UserDashboard /> </PrivateRouteUser>} />
          <Route path ="/user-connect" element = {<PrivateRouteUser> <UserConnect /> </PrivateRouteUser>} />
          <Route path ="/user-view-apt" element = {<PrivateRouteUser> <UserViewApt /> </PrivateRouteUser>} />
          <Route path ="/user-book-apt" element = {<PrivateRouteUser> <UserBookApt /> </PrivateRouteUser>} />
          <Route path ="/user-profile" element = {<PrivateRouteUser> <UserProfile /> </PrivateRouteUser>} />


          <Route path = "/HCP-DashBoard" element = {<PrivateRouteHCP> <HCPDashboard /> </PrivateRouteHCP>} />
          <Route path = "/HCP-connect" element = {<PrivateRouteHCP> <HCPConnect /> </PrivateRouteHCP>} />
          <Route path = "/HCP-view-apt" element = {<PrivateRouteHCP> <HCPViewApt /> </PrivateRouteHCP>} />
          <Route path = "/HCP-patient-list" element = {<PrivateRouteHCP> <HCPPatientList /> </PrivateRouteHCP>} />
          <Route path = "/HCP-profile" element = {<PrivateRouteHCP> <HCPProfile /> </PrivateRouteHCP>} />

          <Route path = "/error404" element = {<Error404 />} />
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </div>
    </>
  )

}

export default App;
