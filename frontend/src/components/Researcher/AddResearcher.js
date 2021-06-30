import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { Card } from 'react-bootstrap'

class AddResearcher extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      name: '',
      email: '',
      password: '',
      Gender: '',
      file: '',
      Card_Number: '',
      selectedFile:null,
      Cvv: '',
      ExpireDate: ''
    }

    //this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    
  }

  onDismiss() {
    this.setState({ visible: false })
  }

  onValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }
  onFileChange = event => {
    this.setState({ selectedFile: event.target.files[0] }); 
  };

 /* onFormSubmit(e) {
    console.log(this.state.selectedFile)
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.preventDefault()
      e.stopPropagation()
    }
    e.preventDefault()

    const name = this.state.name
    const email = this.state.email
    const password = this.state.password
    const gender = this.state.gender
    const file = this.state.selectedFile
    const Card_Number = this.state.Card_Number
    const Cvv = this.state.Cvv
    const ExpireDate = this.state.ExpireDate

    const Researchers = {
      name,
      email,
      password,
      gender,
      file,
      Cvv,
      password,
      ExpireDate,
    }
  
  

  /*axios.post('http://localhost:4000/researchers/addResearcher', Researchers).then(
      (res) => {
        this.setState({
          visible: true,
          name: '',
          email: '',
          password: '',
          gender: '',
          file: '',
          Card_Number: '',
          Cvv: '',
          ExpireDate: '',
        })

        Swal.fire('Done', 'New Resercher Added!', 'success')

        this.props.history.push('/')
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
  */
  onSubmit(e){
    console.log("Hi")
    e.preventDefault();
    const name = this.state.name
    const email = this.state.email
    const password = this.state.password
    const gender = this.state.gender
    const file = this.state.selectedFile
    const Card_Number = this.state.Card_Number
    const Cvv = this.state.Cvv
    const ExpireDate = this.state.ExpireDate
    let Presenter = new FormData() 
    Presenter.append('name', name)
    Presenter.append('email', email)
    Presenter.append('password', password)
    Presenter.append('gender', gender)
    Presenter.append('file', file)
    Presenter.append('Card_Number', Card_Number)
    Presenter.append('Cvv', Cvv)
    Presenter.append('ExpireDate', ExpireDate)
    Presenter.append('FileName', this.state.selectedFile.name)
    
    axios({
        url:'http://localhost:4000/researchers/addResearcher',
        method:"POST",
        headers:{
        },
        data:Presenter
    })

    Swal.fire('Done', 'Registered!', 'success')
    this.props.history.push('/login')
  
  }
  render() {
    return (
      <center>
        <br></br>
       <form onSubmit={this.onSubmit}>
        
          <Card style={{ width: '540px' }}>
            <Card.Header as="h5">
              <b>Researcher Register</b>
            </Card.Header>
            <Card.Body>
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
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={this.onValueChange}
                  value={this.state.password}
                />
                <Form.Text className="text-muted">
                  Your password must be 8-20 characters long, contain letters
                  and numbers, and must not contain spaces, special characters,
                  or emoji.
                </Form.Text>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <select
                  placeholder="select"
                  className="form-control"
                  name="gender"
                  onChange={this.onValueChange}
                  value={this.state.gender}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </Form.Group>

              <Form.Group controlId="formBasicGender">
              <Form.Label>PDF File</Form.Label>
              <div className="form-group">
                        <label>Upload Research Paper</label><br></br>
                        <input type="file" onChange={this.onFileChange} /> 
                    </div>
             </Form.Group>
              </Card.Body>
          </Card>
          <Card style={{ width: '540px' }}>
            <Card.Header as="h5">
              <h4>Enter Credit Card Details</h4>
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
                Register
              </Button>
            </Card.Body>
          </Card>
        </form>
      </center>
    )
  }
}

export default AddResearcher
