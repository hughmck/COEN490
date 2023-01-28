import axios from 'axios';
import { useContext, useState, useEffect } from "react";

export default function HCPDashboard(){
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
  return <h1>HCP : {email}</h1>
}
