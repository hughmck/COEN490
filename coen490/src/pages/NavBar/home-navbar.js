import {Link} from "react-router-dom"
import '../../style/home-navbar.css'
import logo from '../../Digital-Identity/logo-2.png'
export default function HomeNavBar(){

  return(
    <nav className = "nav">
      <Link to = "/">
         <img src={logo} width="100" height="fill" />
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
