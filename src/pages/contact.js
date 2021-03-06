import React, {Component} from 'react'
import Page from '../components/page'
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from 'reactstrap'

export default class Contact extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      message: '',
      response: null,
      sending: false
    }
  }

  formSubmitted (event) {
    event.preventDefault()
    this.setState({sending: true})
    fetch('https://xp88goliw6.execute-api.us-east-1.amazonaws.com/prod/contact_form', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        description: this.state.message,
      }),
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          response: {
            type: 'primary',
            message: 'Thank you for reaching out! I will be in touch soon.'
          },
          sending: false
        })
      })
      .catch(err => {
        this.setState({
          response: {
            type: 'danger',
            message: err.message
          },
          sending: false
        })
      })
    return false
  }

  render () {
    return (
      <Page slug='contact' title='Contact'>
        <Container>
          <h1>Contact</h1>
          { this.state.response && (<Alert color={this.state.response.type}>{this.state.response.message}</Alert>)}
          <Form onSubmit={(event) => this.formSubmitted(event)}>
            <FormGroup>
              <Label for='name'>Name</Label>
              <Input type='text' name='name' value={this.state.name} onChange={(event) => this.setState({name: event.target.value})} required />
            </FormGroup>
            <FormGroup>
              <Label for='email'>Email</Label>
              <Input type='text' name='email' value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} required />
            </FormGroup>
            <FormGroup>
              <Label for='message'>Message</Label>
              <Input type='textarea' name='message' rows="8" value={this.state.message} onChange={(event) => this.setState({message: event.target.value})} />
            </FormGroup>
            <Button>Contact Me{this.state.sending && ' (Processing)'}</Button>
          </Form>
        </Container>
      </Page>
    )
  }
}
