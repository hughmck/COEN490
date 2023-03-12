import { Link } from "react-router-dom";

export default function HomeNavBar() {

  const navLinkStyle = {
    color: "white",
    textDecoration: "none",
    padding: "0.5rem 1rem",
  };

  const activeNavLinkStyle = {
    color: "white",
    textDecoration: "underline",
    fontWeight: "bold",
  };

  const logoStyle = {
    height: "2rem",
    marginRight: "1rem",
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary"
      style={{ marginBottom: "1rem" }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={process.env.PUBLIC_URL + '/logo-back.jpg'} alt="logo" className="d-inline-block align-text-top me-2" style={logoStyle} />
          EasySante
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <CustomLink to="/sign-in" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
              Sign In
            </CustomLink>
            <CustomLink to="/sign-up" style={navLinkStyle} activeStyle={activeNavLinkStyle}>
              Sign Up
            </CustomLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const path = window.location.pathname;
  return (
    <li className={path === to ? "nav-item active" : "nav-item"}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
