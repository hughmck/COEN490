import {Form, Button, Card, Alert} from 'react-bootstrap'
import React, { useRef, useState } from "react"
import '../../style/sign-in.css'
import { useAuth } from '../../contexts/AuthContext'
import {Link, useNavigate} from "react-router-dom"
import jQuery from 'jquery'

export default function LogInForm(){

  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e){

    e.preventDefault()
    var status = 'status', storage = window.localStorage;
    try{

      setError('')
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)

      if(emailRef.current.value.slice(emailRef.current.value.indexOf('@'),emailRef.current.value.length) === "@easysante.com")
      {
          storage.setItem(status,'HCP')
          navigate("/HCP-dashboard")
          window.location.reload();
      }
      else {
          storage.setItem(status,'user')
          navigate("/user-dashboard")
          window.location.reload();
      }



    }catch{
      setError("Email or Password Incorrect")
    }
    setLoading(false)
  }
  return(
    <>
    <Card>
      <Card.Body>
        <h2 className ="text-center mb-4">Log In</h2>
        {error && <Alert varient = "danger"> {error} </Alert>}
        <Form onSubmit = {handleSubmit}>
          <Form.Group id = "email">
            <Form.Label>Email</Form.Label>
            <Form.Control type = "email" ref={emailRef} required/>
          </Form.Group>
          <Form.Group id = "password">
            <Form.Label>Password</Form.Label>
            <Form.Control type = "password" ref={passwordRef} required/>
          </Form.Group>
          <Button disabled = {loading} className="w-100" type="submit">
            Log In
          </Button>
        </Form>
        <div className = "w-100 text-center mt-2">
          <Link to ="/forgot-password"> Forgot Password ? </Link>
        </div>
      </Card.Body>
    </Card>

    <div className = "w-100 text-center mt-2">
      Don't Have An Account ?
      <Link to="/sign-up">
        Sign Up!
      </Link>
    </div>
    </>
  )
}
