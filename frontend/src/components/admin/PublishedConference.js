import React, {Component} from 'react'
import { Button } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';

class PublishedConference extends Component {
    constructor(props) {
        super(props);

        this.state = {
            post: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/post/all')
            .then(response => {
                this.setState({
                    post: response.data.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/post/all')
            .then(response => {
                this.setState({
                    post: response.data.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div style={{marginTop:'15px'}}>
                <div className='container' style={{marginTop:'20px'}}>
                    <h2 className="margin-bottom-10 text-center">Accepted Conferences</h2>
                        <div className="admin-content-widget no-padding">
                            <div className="panel panel-default table-responsive">
                                <table className="table table-striped table-bordered tadmin-user-table">
                                    <thead className='text-center'>
                                        <tr>
                                            <td><a href="" className="admin-sort-by">Name<span className="caret"></span></a></td>
                                            <td><a href="" className="admin-sort-by">About<span className="caret"></span></a></td>
                                            <td><a href="" className="admin-sort-by">Start Date <span className="caret"></span></a></td>
                                            <td><a href="" className="admin-sort-by">End Date<span className="caret"></span></a></td>
                                            <td><a href="" className="admin-sort-by">Venue <span className="caret"></span></a></td>
                                            <td><a href="" className="admin-sort-by">Organizer <span className="caret"></span></a></td>
                                        </tr>
                                    </thead>
                            {
                                this.state.post.map((post, i) => {
                                    if (post.status === true && post.conference!=null)
                                        return (
                                                <tbody>
                                                    <tr className='text-center'>
                                                        <td>{post.conference.name}</td>
                                                        <td>{post.conference.about}</td>
                                                        <td>{post.conference.startdate}</td>		
                                                        <td>{post.conference.enddate}</td>
                                                        <td>{post.conference.venue}</td>
                                                        <td>{post.conference.organizer}</td>
                                                    </tr>
                                                </tbody>               
                                        );
                                    else return null
                                    })
                                }
                            </table>    
                        </div>                          
                    </div> 

                    <div className="text-center">
                        <Link to={'/conference/notification'}><Button color="info">View Notification</Button></Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default PublishedConference;