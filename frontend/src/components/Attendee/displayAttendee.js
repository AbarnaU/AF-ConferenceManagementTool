import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

import {
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'reactstrap'

class DisplayAttendee extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userdetails: {},
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:4000/attendees/display/' + sessionStorage.userId)
      .then((res) => {
        this.setState({
          userdetails: res.data,
        })
      })
  }
  deleteuser() {
    axios.get('http://localhost:4000/attendees/delete/' + sessionStorage.userId)
    alert('user Deleted')
    window.location.href = '/'
  }

  render() {
    return (
      <center>
        <br></br> <br></br> <br></br>
        <Card style={{ width: '80rem' }}>
          <CardHeader as="h5" style={{ backgroundColor: 'blue' }}></CardHeader>
          <CardTitle>
            <h2>Genaral Details</h2>
          </CardTitle>
          <CardBody>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>Email </h3>
                <p>{this.state.userdetails.email}</p>
              </ListGroupItem>
              <ListGroupItem>
                {' '}
                <h3>Contact Number</h3>
                <p>{this.state.userdetails.contact}</p>
              </ListGroupItem>
              <ListGroupItem>
                {' '}
                <h3>Gender</h3>
                <p>{this.state.userdetails.Gender}</p>
              </ListGroupItem>
              <ListGroupItem>
                {' '}
                <h3>Address</h3>
                <p>{this.state.userdetails.address}</p>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
        <br></br> <br></br> <br></br>
        <Card style={{ width: '80rem' }}>
          <CardHeader style={{ backgroundColor: 'blue' }}>
            {' '}
            <h2>Payment Details</h2>
          </CardHeader>
          <CardTitle>
            <h2>Payment Details</h2>
          </CardTitle>
          <CardBody>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>Card Number</h3>
                <p>{this.state.userdetails.Card_Number}</p>
              </ListGroupItem>
              <ListGroupItem>
                {' '}
                <h3>Cvv</h3>
                <p>{this.state.userdetails.Cvv}</p>
              </ListGroupItem>
              <ListGroupItem>
                {' '}
                <h3>Expiaration Date</h3>
                <p>{this.state.userdetails.ExpireDate}</p>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
        <Row>
          <div style={{ padding: '10px' }}>
            <Button href="/editattendee">Edit profile</Button>
          </div>
          <div style={{ padding: '10px' }}>
            <Button onClick={this.deleteuser}>Delete account</Button>
          </div>
        </Row>
      </center>
    )
  }
}

export default DisplayAttendee
