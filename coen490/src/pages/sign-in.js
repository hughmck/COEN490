import UserW from "./USER/user.js"
import HCPW from "./HCP/hcp.js"
import LogInForm from "./sign-in-form"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"

export default function SignIn(){


  return (
    <AuthProvider>
      <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "100vh" }}>
        <div className = "w-100" style ={{ maxWidth: "400px"}}>
          <LogInForm />
        </div>
      </Container>
    </AuthProvider>
)
}
