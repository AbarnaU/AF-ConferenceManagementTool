import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'

class EditAttendee extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      contact: '',
      name: '',
      email: '',
      Gender: 'male',
      password: '',
      address: '',
      Card_Number: '',
      Cvv: '',
      ExpireDate: '',
    }

    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  onDismiss() {
    this.setState({ visible: false })
  }

  onValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  componentDidMount() {
    axios
      .get('http://localhost:4000/attendees/edit/' + sessionStorage.userId)
      .then((res) => {
        this.setState({
          name: res.data.name,
          email: res.data.email,
          password: res.data.password,
          address: res.data.address,
          Gender: res.data.Gender,
          contact: res.data.contact,
          Card_Number: res.data.Card_Number,
          Cvv: res.data.Cvv,
          ExpireDate: res.data.ExpireDate,
        })
      })
  }
  onFormSubmit(e) {
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    e.preventDefault()

    const name = this.state.name
    const address = this.state.address
    const Gender = this.state.Gender
    const email = this.state.email
    const password = this.state.password
    const Card_Number = this.state.Card_Number
    const Cvv = this.state.Cvv
    const ExpireDate = this.state.ExpireDate
    const contact = this.state.contact

    const Atendees = {
      name,
      address,
      Gender,
      Card_Number,
      email,
      Cvv,
      password,
      ExpireDate,
      contact,
    }

    axios
      .post(
        'http://localhost:4000/attendees/update/' + sessionStorage.userId,
        Atendees,
      )
      .then(
        (res) => {
          this.setState({
            visible: true,
            contact: '',
            name: '',
            email: '',
            Gender: '',
            password: '',
            address: '',
            Card_Number: '',
            Cvv: '',
            ExpireDate: '',
          })

          Swal.fire('Done', 'Attendee Updated!', 'success')

          this.props.history.push('/displayattendee')
        },
        (err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href>Why do I have this issue?</a>',
          })
        },
      )
  }
  render() {
    return (
      <center>
        <br></br>
        <Form onSubmit={this.onFormSubmit}>
          <Card style={{ width: '540px' }}>
            <Card.Header as="h5">
              <b>Edit Attendee!</b>
            </Card.Header>
            <Card.Body>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={this.onValueChange}
                  value={this.state.email}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  aria-describedby="passwordHelpBlock"
                  required
                  type="hidden"
                  placeholder="Password"
                  name="password"
                  onChange={this.onValueChange}
                  value={this.state.password}
                />
              </Form.Group>
              <Form.Group controlId="formBasicFullnamed">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Full Name"
                  name="name"
                  onChange={this.onValueChange}
                  value={this.state.name}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Mobile</Form.Label>

                <Form.Control
                  type="number"
                  required
                  placeholder="Mobile"
                  name="contact"
                  onChange={this.onValueChange}
                  value={this.state.contact}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Address"
                  name="address"
                  onChange={this.onValueChange}
                  value={this.state.address}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <select
                  placeholder="select"
                  className="form-control"
                  name="Gender"
                  onChange={this.onValueChange}
                  value={this.state.Gender}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </Form.Group>
            </Card.Body>
          </Card>
          <Card style={{ width: '540px' }}>
            <Card.Header as="h5">
              <h4>Edit Credit Card Details</h4>
            </Card.Header>
            <Card.Body>
              <Form.Group controlId="formBasicDOB">
                <Form.Label>Expire Date</Form.Label>
                <Form.Control
                  required
                  type="date"
                  placeholder="Expire Date"
                  name="ExpireDate"
                  onChange={this.onValueChange}
                  value={this.state.ExpireDate}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicAddress">
                <Form.Label>Cvv</Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Cvv"
                  name="Cvv"
                  onChange={this.onValueChange}
                  value={this.state.Cvv}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicAddress">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="number"
                  required
                  placeholder="Card Number"
                  name="Card_Number"
                  onChange={this.onValueChange}
                  value={this.state.Card_Number}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Button
                variant="primary"
                style={{ height: '35px', width: '400px' }}
                type="submit"
              >
                Update
              </Button>
            </Card.Body>
          </Card>
        </Form>
      </center>
    )
  }
}

export default EditAttendee
