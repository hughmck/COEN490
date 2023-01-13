import { Container } from "react-bootstrap"
import { Button } from '@mui/material'
import { useContext } from 'react';
import { UserProvider, UserContext } from '../../contexts/user.context';
import { useNavigate} from "react-router-dom"

export default function LogOut(){

  const navigate = useNavigate()
  const { logOutUser } = useContext(UserContext);
  var status = 'status', storage = window.localStorage;


  // This function is called when the user clicks the "Logout" button.
  const logOut = async () => {
    try {
      const loggedOut = await logOutUser();
      storage.setItem(status, '')
      navigate("/")
      window.location.reload();
      if (loggedOut) {
        window.location.reload(true);
      }
    } catch (error) {
      alert(error)

  }
}

return(
  <Button variant="contained" onClick={logOut}>Logout</Button>
)
}
