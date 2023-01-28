import { UserContext } from "../../contexts/user.context";
import { App, Credentials } from "realm-web";
import axios from 'axios';
import { useContext, useState, useEffect } from "react";


export default function UserDashboard(){

const [posts, setPosts] = useState([])
var [email, setEmail] = useState()


 useEffect(() => {
   axios.get("http://localhost:4444/api")
     .then(res => {
       setEmail(res.data.email)
     })
     .catch(err => {
       console.log(err)

     })
 })

 console.log(email)
 return <h1>USER : {email}</h1>
}
