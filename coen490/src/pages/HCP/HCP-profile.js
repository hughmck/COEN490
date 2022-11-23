import { Container } from "react-bootstrap"
import { AuthProvider } from "../../contexts/AuthContext"
import LogOut from '../Authentification/logout'

export default function HCPProfile(){


  return (
    <AuthProvider>
      <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "100vh" }}>
        <div className = "w-100" style ={{ maxWidth: "400px"}}>
          <LogOut />
        </div>
      </Container>
    </AuthProvider>
)
}
