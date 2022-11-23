import {Link,useNavigate} from "react-router-dom"
import '../../style/Authentification/error404.css'

export default function Error404(){

    const navigate = useNavigate()
    var status = 'status', storage = window.localStorage;

    async function handleClick(e){
    e.preventDefault()

    switch(localStorage.getItem('status')) {
      case 'user':
        navigate('/user-dashboard')
        break;
      case 'HCP':
        navigate('HCP-dashboard')
        break;
      default:
        navigate("/sign-in")
  }

  }

  return(
    <>
    <h3> Beep Boop, you do not have the credentials </h3>
    <button className = "error-dashboard" onClick = {handleClick} > Get me back where I'm allowed </button>
    </>
  )
}
