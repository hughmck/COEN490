import { Container } from "react-bootstrap"
import { Button } from '@mui/material'
import  LogOut  from '../Authentification/logout';
import { UserProvider } from '../../contexts/user.context';

export default function HCPProfile(){


  return (
    <>
    <UserProvider>
      <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "100vh" }}>
        <LogOut />
      </Container>
    </UserProvider>

    </>
  )

}
