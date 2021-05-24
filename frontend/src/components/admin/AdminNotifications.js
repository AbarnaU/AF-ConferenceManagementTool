import React, {Component} from 'react';
import axios from "axios";
import Swal from "sweetalert2";

class AdminNotifications extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/admin/notifications/admin/' + sessionStorage.getItem('userId'))
            .then(response => {
                this.setState({
                    notifications: response.data.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/admin/notifications/admin/' + sessionStorage.getItem('userId'))
            .then(response => {
                this.setState({
                    notifications: response.data.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onClickDeclineHandler = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Decline it!',
            cancelButtonText: 'Cancel'

        }).then((result) => {
            if (result.value) {

                axios.delete('http://localhost:4000/admin/notifications/' + id)
                    .then(res => {
                        console.log(res.data);
                        Swal.fire(
                            'Done',
                            'Conference Successfully Rejected!',
                            'warning'
                            )
                    this.props.history.push('/conference/view') 
                    })
                    .catch(err => console.log(err.message));
                    
            }
        });

    };

    onClickAcceptHandler = (notificationId) => {

       axios.put('http://localhost:4000/admin/notifications/' + notificationId, {
            status: true
        }).then(res => {
             console.log(res.data);
             Swal.fire(
                'Done',
                'Conference Successfully Published!',
                'success'
                )
             this.props.history.push('/conference/view')     
        }).catch(err => console.log(err.message));
    };

    render() {
        return (
            <div>
                {
                    this.state.notifications.map((notification, i) => {
                        if (notification.status === false && notification.conference!=null )
                            return (
                                <div className="alert alert-secondary" style={{marginTop:'20px'}} key={i}>
                                    <label className="mt-1">Do you like to Publish {notification.conference.name} event to the site?</label>
                                    <input type="button" value="Decline"
                                           onClick={() => this.onClickDeclineHandler(notification._id)}
                                           className="float-right btn btn-danger"/>
                                    <input type="button" value="Accept"
                                           onClick={() => this.onClickAcceptHandler(notification._id)}
                                           className="float-right btn btn-secondary mr-3"/>
                                </div>
                            );
                        else
                            return null;
                    })
                }
            </div>
        );
    }
}

export default AdminNotifications;