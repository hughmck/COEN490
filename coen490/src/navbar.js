import {Link} from "react-router-dom"


export default function NavBar(){

  return(
    <nav className = "nav">
      <Link to = "/" className = "site_title">
        EasySante
      </Link>

      <ul>
      <CustomLink to="/sign-in"> SignIn </CustomLink>
      <CustomLink to="/sign-up"> SignUp </CustomLink>
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
