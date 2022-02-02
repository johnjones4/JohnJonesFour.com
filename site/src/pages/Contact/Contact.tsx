import React, { FormEvent, useEffect, useState } from 'react'
import { Alert, Button, Container, Form, FormGroup, Input, Label } from 'reactstrap'
import Page from '../../components/Page/Page'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const [alert, setAlert] = useState('')
  const [nonce, setNonce] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>): boolean => {
    e.preventDefault()
    setAlert('')
    setResponse('')
    const submit = async () => {
      try {
        const payload = {
          name, email, subject, message, nonce
        }
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'content-type': 'application/json'
          }
        })
        try {
          const result = await response.json()
          if (result && result.ok) {
            setResponse('Thank you for contacting me! I will reply shortly.')
          } else if (result && result.message) {
            setAlert(result.message)
          } else {
            setAlert(await response.text())
          }
        } catch (e) {
          setAlert(await response.text())
        }
      } catch (err) {
        setAlert(`${err}`)
      }
    }
    submit()
    return false
  }

  const getNonce = async () => {
    try {
      const response = await fetch('/api/get-nonce')
      const { nonce } = await response.json()
      setNonce(nonce)
    } catch (err) {
      setAlert(`${err}`)
    }
  }

  useEffect(() => {
    setInterval(() => getNonce(), 30000)
    getNonce()
  }, [])

  return (
    <Page slug='contact' title='Contact'>
      <Container className='container-content'>
        <h1>Contact</h1>
        { alert && (
          <Alert color="danger">
            {alert}
          </Alert>
        ) }
        { response ? (
          <Alert color="primary">
            {response}
          </Alert>
        ) : (
          <Form onSubmit={e => handleSubmit(e)}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input required id='name' name='name' placeholder='Name' type='text' value={name} onChange={e => setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input required id='email' name='email' placeholder='name@email.com' type='email' value={email} onChange={e => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for='subject'>Subject</Label>
              <Input required id='subject' name='subject' placeholder='Subject' type='text' value={subject} onChange={e => setSubject(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for='message'>Message</Label>
              <Input required id='message' name='message' placeholder='Message' type='textarea' value={message} onChange={e => setMessage(e.target.value)} />
            </FormGroup>
            <Button type='submit'>Send</Button>
          </Form>
        )}
      </Container>
    </Page>
  )
}

export default Contact
