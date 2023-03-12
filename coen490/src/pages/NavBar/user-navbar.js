import { Link } from "react-router-dom";

export default function UserNavBar() {
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
            <CustomLink to="/user-dashboard" className="nav-link"> DashBoard </CustomLink>
            <CustomLink to="/user-connect" className="nav-link"> Connect </CustomLink>
            <CustomLink to="/user-view-apt" className="nav-link"> View Appointments </CustomLink>
            <CustomLink to="/user-book-apt" className="nav-link"> Book Appointments </CustomLink>
            <CustomLink to="/user-profile" className="nav-link"> Profile </CustomLink>
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
