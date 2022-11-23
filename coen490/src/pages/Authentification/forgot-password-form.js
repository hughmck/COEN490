import {Form, Button, Card, Alert} from 'react-bootstrap'
import React, { useRef, useState } from "react"
import { useAuth } from '../../contexts/AuthContext'
import {Link, useNavigate} from "react-router-dom"

export default function ForgotPForm(){

  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e){

    e.preventDefault()

    try{
      setError('')
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your email for instructions')
    }catch{
      setError('Email is Incorrect')
    }
    setLoading(false)
  }
  return(
    <>
    <Card>
      <Card.Body>
        <h2 className ="text-center mb-4">Reset Account Password</h2>
        {error && <Alert varient = "danger"> {error} </Alert>}
        {message && <Alert varient = "sucess"> {message} </Alert>}
        <Form onSubmit = {handleSubmit}>
          <Form.Group id = "email">
            <Form.Label>Email</Form.Label>
            <Form.Control type = "email" ref={emailRef} required/>
          </Form.Group>
          <Button disabled = {loading} className="w-100" type="submit">
            Reset Password
          </Button>
        </Form>
        <div className = "w-100 text-center mt-2">
          <Link to ="/sign-in"> Login </Link>
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
