import {Link} from "react-router-dom"


export default function HomeNavBar(){

  return(
    <nav className = "nav">
      <Link to = "/" className = "site_title">
        EasySante
      </Link>

      <ul>
      <CustomLink to="/HCP-dashboard"> DashBoard </CustomLink>
      <CustomLink to="/HCP-connect"> Connect </CustomLink>
      <CustomLink to="/HCP-view-apt"> Appointments </CustomLink>
      <CustomLink to="/HCP-patient-list"> Patient Info </CustomLink>
      <CustomLink to="/HCP-profile"> View Profile </CustomLink>
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
