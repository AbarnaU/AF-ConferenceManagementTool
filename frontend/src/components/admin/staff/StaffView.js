import React,{Component} from 'react';
import axios from 'axios';
import { Alert,UncontrolledAlert,Button } from 'reactstrap';
import {Link} from 'react-router-dom';

import StaffRow from './StaffRow';


class StaffView extends Component{

    constructor(props){
        super(props);

        this.state={
            staffs:[]
        }

        this.fillTable=this.fillTable.bind(this);
        this.checkData= this.checkData.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/staffs/')
            .then(
                staffs=>{
                    this.setState({staffs:staffs.data})
                } 
            )
    }

    componentWillUpdate(){
        axios.get('http://localhost:4000/staffs/')
            .then(
                staffs=>this.setState({staffs:staffs.data})
            )
    }

    fillTable(){

        return this.state.staffs.map(staff=>{
            return <StaffRow key={staff._id} staff={staff}/>
        })
    }

    checkData(){
        if(this.state.staffs.length>0){

            return(
                <div className='container' style={{marginTop:'20px'}}>
                    <h2 className="margin-bottom-10 text-center">View Staffs</h2>
                    <br/>
                    <div className="admin-content-widget no-padding">
                        <div className="panel panel-default table-responsive">
                        <table className="table table-striped table-bordered tadmin-user-table">
                            <thead className='text-center'>
                            <tr>
                                <td><a href="" className="admin-sort-by">Name<span className="caret"></span></a></td>
                                <td><a href="" className="admin-sort-by">Email<span className="caret"></span></a></td>
                                <td><a href="" className="admin-sort-by">Role <span className="caret"></span></a></td>
                                <td><a href="" className="admin-sort-by">Contact Number<span className="caret"></span></a></td>
                                <td><a href="" className="admin-sort-by">Address <span className="caret"></span></a></td>
                                <td><a href="" className="admin-sort-by">Edit</a></td>
                                <td>Delete</td>
                            </tr>
                            </thead>
                         <tbody>
                            {this.fillTable()}
                        </tbody>
                    </table>    
                    </div> 
                     <div className="text-center">
                        <Link to={'/staff/add'} style={{marginRight:'20px'}}><Button color="info">Add Staff</Button></Link>
                    </div>                       
                </div> 
              </div>
            )

        }
        else{
            return(
                <div className='container' style={{marginTop:'100px'}}>
                    <UncontrolledAlert color="danger">
                        <h4 className="alert-heading">No Staff Data Available</h4>
                    </UncontrolledAlert>
                    <br></br>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <Link to='/staff/add'><Button color="primary">Add Staff</Button></Link>
                    </div>
                </div>
            )
        }
    }

    render(){
        return this.checkData()
    }


}

export default StaffView;