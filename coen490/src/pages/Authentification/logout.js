import {Form, Button, Card, Alert} from 'react-bootstrap'
import React, { useRef, useState } from "react"
import { useAuth } from '../../contexts/AuthContext'
import {Link, useNavigate} from "react-router-dom"
import jQuery from 'jquery'


export default function LogOut(){

  const { logout } = useAuth()
  const navigate = useNavigate()
  var status = 'status', storage = window.localStorage;

  async function handleClick(e){

  e.preventDefault()

  try {
    await logout()
    storage.setItem(status, '')
    navigate("/")
    window.location.reload();

  }catch{
      //message failed to logout
  }

  }


  return (
     <button onClick = {handleClick} > LogOut </button>

)
}
