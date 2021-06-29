import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  onLogout = (e) => {
    e.preventDefault()
    sessionStorage.clear()
    localStorage.clear()
    this.props.history.push('/')
  }

  render() {
    const afterLogin = (
      <div className="mt-2 mt-md-0">
        <Link to="/profile">
          <label className="btn-link alert-link text-white pr-2">
            {' '}
            {sessionStorage.getItem('loggedUser') + '  '}{' '}
          </label>
        </Link>
        <Link to="/">
          <input
            type="button"
            className="btn btn-outline-light my-2 my-sm-0"
            onClick={this.onLogout}
            value="Logout"
          />
        </Link>
      </div>
    )

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-info">
        <Link to="" className="navbar-brand">
          ICAF
        </Link>
        <div className="collapse navbar-collapse" id="collapse-navbar">
          {sessionStorage.getItem('userType') === 'editor' ? (
            <ul className="navbar-nav text-justify mr-auto">
              <li className="navbar-item ">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>
          ) : sessionStorage.getItem('userType') === 'reviewer' ? (
            <ul className="navbar-nav text-justify mr-auto">
              <li className="navbar-item ">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>
          ) : sessionStorage.getItem('userType') === 'admin' ? (
            <ul className="navbar-nav text-justify mr-auto">
              <li className="navbar-item ">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
            </ul>
          ) : null}
          {sessionStorage.loggedUser ? afterLogin : null}
        </div>
      </nav>
    )
  }
}

export default Navbar
