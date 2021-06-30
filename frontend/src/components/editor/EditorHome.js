import React, {Component} from 'react'
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom';

class EditorHome extends Component {

    render() {
        return (
            <section className="card text-center" style={{marginTop:"50px"}}>
                <div class="container card-body light-gray-bg ">
                    <h4 className="card-title">Wellcome to Editor Home</h4>
                   
                        <div class="row">
                            <div class="col-lg-3 col-md-3 admin-icon">
                                <Link to={'/conference/view'}><Button color="secondary" style={{width:"140px",height:"140px"}}><span><i className="fa fa-eye"/></span> <br/>View Conference</Button></Link>
                            </div>
                            <div class="col-lg-3 col-md-3 admin-icon">
                                <Link to={'/conference/add'}><Button color="info" style={{width:"140px",height:"140px"}}><span ><i className="fa fa-plus"/></span> <br/> Add Conferences</Button></Link>
                            </div>
                            <div class="col-lg-3 col-md-3 admin-icon">
                                <Link to={'/conference/status'}><Button color="success" style={{width:"140px",height:"140px"}}><span><i className="fa fa-hourglass-start"/></span> <br/>Conference Status</Button></Link>
                            </div>
                            <div class="col-lg-3 col-md-3 admin-icon">
                                <Link to={'/file/upload'}><Button color="danger" style={{width:"140px",height:"140px"}}><span ><i className="fa fa-file"/></span> <br/>Templete Upload</Button></Link>
                            </div>
                        </div>    
                    </div>
            
            </section>
        );
    }
}

export default EditorHome;