import {Link, useNavigate} from "react-router-dom"
import React from 'react'
import { useAuth } from "../../contexts/user.context"

export default function UserNavBar(){

  return(
    <nav className = "nav">
      <Link to = "/" className = "site_title">
        EasySante
      </Link>

      <ul>
      <CustomLink to="/user-dashboard"> DashBoard </CustomLink>
      <CustomLink to="/user-connect"> Connect </CustomLink>
      <CustomLink to="/user-view-apt"> View Appointments </CustomLink>
      <CustomLink to="/user-book-apt"> Book Appointments </CustomLink>
      <CustomLink to="/user-profile"> Profile </CustomLink>
      </ul>
    </nav>
  )

}

function CustomLink({to, children, ...props}) {
  const path = window.location.pathname
  return(
  <li className = {path === to ? "active" : ""}>
    <Link to={to} {...props}>{children}</Link>
  </li>
  )
}
