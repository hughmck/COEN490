import { Link } from "react-router-dom";

export default function HCPNavBar() { 
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={process.env.PUBLIC_URL + '/logo-back.jpg'} alt="logo" className="d-inline-block align-text-top me-2" style={{height: "2rem"}} />
          EasySante
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <CustomLink to="/HCP-dashboard" className="nav-link"> DashBoard </CustomLink>
            <CustomLink to="/HCP-connect" className="nav-link"> Connect </CustomLink>
            <CustomLink to="/HCP-patient-list" className="nav-link"> Patient Info </CustomLink>
            <CustomLink to="/HCP-profile" className="nav-link"> View Profile </CustomLink>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function CustomLink({to, children, ...props}) {
  const path = window.location.pathname
  return (
    <li className={path === to ? "nav-item active" : "nav-item"}>
      <Link to={to} {...props}>{children}</Link>
    </li>
  )
}
