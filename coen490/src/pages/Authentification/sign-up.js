import SignUp from "./sign-up-form"
import { Container } from "react-bootstrap"
import { UserProvider } from "../../contexts/user.context"

export default function Register(){

  return (
  <UserProvider>
    <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "100vh" }}>
      <div className = "w-100" style ={{ maxWidth: "400px"}}>
        <SignUp />
      </div>
    </Container>
  </UserProvider>
  )
}
