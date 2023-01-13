import LogIn from "./sign-in-form"
import { Container } from "react-bootstrap"
import { UserProvider } from "../../contexts/user.context"

export default function SignIn(){


  return (
    <UserProvider>
      <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "100vh" }}>
        <div className = "w-100" style ={{ maxWidth: "400px"}}>
          <LogIn />
        </div>
      </Container>
    </UserProvider>
)
}
