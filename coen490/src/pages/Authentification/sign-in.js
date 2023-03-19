import LogIn from "./sign-in-form"
import { Container } from "react-bootstrap"
import { UserProvider } from "../../contexts/user.context"
import '../../style/home.css';


export default function SignIn(){


  return (
    <main className="hero-section">
    <div className="hero-content">
      <nav className="navbar" style={{marginLeft: "20px", width: "1740px" }}>
        <h1 className="nav-logo">EasySante</h1>
        <ul className="nav-links">
          <a href="/sign-up">Sign Up</a>
          <a href="/sign-in">Sign In</a>
        </ul>
      </nav>
    <UserProvider>
      <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "100vh" }}>
        <div className = "w-100" style ={{ maxWidth: "400px"}}>
          <LogIn />
        </div>
      </Container>
    </UserProvider>
    </div>
    </main>
)
}
