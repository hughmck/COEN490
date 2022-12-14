import SignUpForm from "./sign-up-form"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../../contexts/AuthContext"

export default function SignUp(){

  return (
  <AuthProvider>
    <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "100vh" }}>
      <div className = "w-100" style ={{ maxWidth: "400px"}}>
        <SignUpForm />
      </div>
    </Container>
  </AuthProvider>
  )
}
