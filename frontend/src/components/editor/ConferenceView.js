import React,{Component} from 'react';
import axios from 'axios';
import {UncontrolledAlert,Button } from 'reactstrap';
import {Link} from 'react-router-dom';

import ConferenceRow from './ConferenceRow';


class ConferenceView extends Component{

    constructor(props){
        super(props);

        this.state={
            conferences:[]
        }

        this.fillTable=this.fillTable.bind(this);
        this.checkData= this.checkData.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/editor/conference/')
            .then(
                conferences=>{
                    this.setState({conferences:conferences.data})
                } 
            )
    }

    componentWillUpdate(){
        axios.get('http://localhost:4000/editor/conference/')
            .then(
                conferences=>this.setState({conferences:conferences.data})
            )
    }

    fillTable(){

        return this.state.conferences.map(conference=>{
            return <ConferenceRow key={conference._id} conference={conference}/>
        })
    }

    checkData(){
        if(this.state.conferences.length>0){

            return(
                <div className='container' style={{marginTop:'20px'}}>
                    <h2 className="margin-bottom-10 text-center">View Conferences</h2>
                    <br/>
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
                                <td><a href="" className="admin-sort-by">Edit</a></td>
                                <td>Delete</td>
                            </tr>
                            </thead>
                         <tbody>
                            {this.fillTable()}
                        </tbody>
                    </table>  
                    </div>                          
                </div> 
                <div className="text-center">
                    <Link to={'/conference/add'} style={{marginRight:'20px'}}><Button color="info">Add Conference</Button></Link>
                    <Link to={'/conference/status'}><Button color="info">View Status</Button></Link>
                </div>
              </div>
            )

        }
        else{
            return(
                <div className='container' style={{marginTop:'100px'}}>
                    <UncontrolledAlert color="danger">
                        <h4 className="alert-heading">No Conference Data Available</h4>
                    </UncontrolledAlert>
                    <br></br>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Link to='/conference/add'><Button color="primary">Add Conference</Button></Link>
                    </div>
                </div>
            )
        }
    }

    render(){
        return this.checkData()
    }


}

export default ConferenceView;