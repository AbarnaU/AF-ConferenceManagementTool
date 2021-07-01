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

class DisplayWorkshopConductor extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userdetails: {},
    }
  }
  componentDidMount() {
    axios
      .get('http://localhost:4001/workshopConductors/display/' + sessionStorage.userId)
      .then((res) => {
        this.setState({
          userdetails: res.data,
        })
      })
  }
  deleteuser() {
    axios.get('http://localhost:4001/workshopConductors/delete/' + sessionStorage.userId)
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
            <h3>Genaral Details</h3>
          </CardTitle>
          <CardBody>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h4>Email </h4>
                <p>{this.state.userdetails.email}</p>
              </ListGroupItem>
              <ListGroupItem>
                {' '}
                <h4>Contact Number</h4>
                <p>{this.state.userdetails.contact}</p>
              </ListGroupItem>
              <ListGroupItem>
                {' '}
                <h4>Gender</h4>
                <p>{this.state.userdetails.Gender}</p>
              </ListGroupItem>
              <ListGroupItem>
                {' '}
                <h4>Address</h4>
                <p>{this.state.userdetails.address}</p>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
        </Card>
        <br></br> <br></br> <br></br>
        
        <Row>
          <div style={{ padding: '10px' }}>
            <Button href="/editWorkshopConductor">Edit profile</Button>
          </div>
          <div style={{ padding: '10px' }}>
            <Button onClick={this.deleteuser}>Delete account</Button>
          </div>
        </Row>
      </center>
    )
  }
}

export default DisplayWorkshopConductor
