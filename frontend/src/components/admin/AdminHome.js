import React, {Component} from 'react'
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';

class AdminHome extends Component {

    render() {
        return (
            <section className="card text-center" style={{marginTop:"50px"}}>
                <div class="container card-body light-gray-bg ">
                    <h4 className="card-title">Wellcome to Admin Home</h4>
                   
                        <div class="row">
                            <div class="col-lg-3 col-md-3 admin-icon">
                                <Link to={'/staff/view'}><Button color="danger" style={{width:"140px",height:"140px"}}><span><i className="fa fa-user"/></span> <br/>Staff</Button></Link>
                            </div>
                            <div class="col-lg-3 col-md-3 admin-icon">
                                <Link to={'conference/view'}><Button color="warning" style={{width:"140px",height:"140px"}}><span ><i className="fa fa-calendar"/></span> <br/>Conferences</Button></Link>
                            </div>
                            <div class="col-lg-3 col-md-3 admin-icon">
                                <Link to={''}><Button color="success" style={{width:"140px",height:"140px"}}><span><i className="fa fa-graduation-cap"/></span> <br/>Researchers</Button></Link>
                            </div>
                            <div class="col-lg-3 col-md-3 admin-icon">
                                <Link to={''}><Button color="primary" style={{width:"140px",height:"140px"}}><span ><i className="fa fa-user"/></span> <br/>Attendee</Button></Link>
                            </div>
                        </div>    
                    </div>
            
            </section>
        );
    }
}

export default AdminHome;