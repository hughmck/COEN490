import { Link } from "react-router-dom";

export default function HomeNavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary"
    >
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
