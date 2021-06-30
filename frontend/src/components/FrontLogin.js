import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

class UserLogin extends Component {
  constructor(props) {
    super(props)

    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeUserType = this.onChangeUserType.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)

    this.state = {
      email: '',
      password: '',
      userType: 'UserType',
    }
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    })
  }

  onChangeUserType(e) {
    this.setState({
      userType: e.target.value,
    })
  }

  validateType() {
    let isValid = true
    console.log('validating type')

    if (this.state.userType === 'UserType') {
      Swal.fire('Oops...', 'Please Select User Type', 'error')
      isValid = false
    }

    return isValid
  }

  handleLoginSubmit(e) {
    e.preventDefault()

    const user = {
      email: this.state.email,
      password: this.state.password,
    }

    if (this.validateType()) {
      if (this.state.userType === 'attendee') {
        axios
          .post('http://localhost:4000/attendees/login', user, {
            loading: true,
          })
          .then((response) => {
            if (response.data.result) {
              Swal.fire('Done', 'Login sucessfully !', 'success').then(
                (result) => {
                  if (result.value) {
                    sessionStorage.setItem('userId', response.data.data._id)
                    sessionStorage.setItem(
                      'loggedUser',
                      response.data.data.email,
                    )
                    sessionStorage.setItem('userType', 'attendee')
                    console.log(sessionStorage.userId)
                    // window.location.assign('/home')
                  }
                },
              )
            } else {
              Swal.fire('Oops...', 'Invalid Password or User Id', 'error')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  render() {
    return (
      <div className="container" style={{ paddingTop: '70px' }}>
        <div class="admin-content-widget admin-login-widget light-gray-bg ">
          <header class="text-center">
            <h1>ICAF User Login</h1>
          </header>
          <form class="admin-login-form" onSubmit={this.handleLoginSubmit}>
            <div class="form-group">
              <div class="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user" />
                  </span>
                </div>
                <select
                  className="form-control"
                  onChange={this.onChangeUserType}
                  placeholder="Select User Type"
                >
                  <option value="attendee">Attendee</option>
                  <option value="workshopconducter">workshop Conducter</option>
                  <option value="researcher">Researcher</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-envelope-o" />
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                />
              </div>
            </div>
            <div class="form-group">
              <div class="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-key" />
                  </span>
                </div>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                />
              </div>
            </div>

            <div class="form-group text-center">
              <button type="submit" class="admin-blue-button width-30">
                Login
              </button>
            </div>

            <div className="text-center mt-3">
              <label className="ml-5 mb-3 text-muted">
                Don't have an account ?
              </label>
              <Link to="/register" className="alert-link mr-5">
                {' '}
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default UserLogin
