import {Form, Button, Card, Alert} from 'react-bootstrap'
import React, { useRef, useState } from "react"
import '../../style/sign-up.css'
import { useAuth } from '../../contexts/AuthContext'
import {Link, useNavigate} from "react-router-dom"
import jQuery from 'jquery'

export default function SignUpForm(){

  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e){

    e.preventDefault()
    var status = 'status', storage = window.localStorage;

    if(passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Passwords Do Not Match')

    }

    try{
      setError('')
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
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

      jQuery(window).load(function() {
        sessionStorage.setItem('status','loggedIn')
      });
    }catch{
      setError('Failed To Create Account')
    }
    setLoading(false)
  }
  return(
    <>
    <Card>
      <Card.Body>
        <h2 className ="text-center mb-4">Sign Up</h2>
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
          <Form.Group id = "password-confirm">
            <Form.Label>Password Confirmation</Form.Label>
            <Form.Control type = "password" ref={passwordConfirmRef} required/>
          </Form.Group>
          <Button disabled = {loading} className="w-100" type="submit">Sign up </Button>
        </Form>
      </Card.Body>
    </Card>

    <div className = "w-100 text-center mt-2">
      Already have an account ?
      <Link to="/sign-in">
        SignIn
      </Link>
    </div>
    </>
  )
}
