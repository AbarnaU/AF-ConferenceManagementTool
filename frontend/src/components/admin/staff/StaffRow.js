import React,{Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'

class StaffRow extends Component{

    constructor(props){
        super(props);

        this.state={
            staff:props.staff
        }

        this.onDelete=this.onDelete.bind(this);
    }

    onDelete(){
        axios.get('http://localhost:4000/staffs/delete/'+this.state.staff._id)
            .then(
                
                res => {
                    Swal.fire(
                        'Done',
                        'Staff Removed !',
                        'success'
                        )
                }
            )
    }

    render(){
        return(
            <tr className='text-center'>
                  	<td>{this.state.staff.name}</td>
                    <td>{this.state.staff.email}</td>
                    <td>{this.state.staff.role}</td>		
                    <td>{this.state.staff.contact}</td>
                    <td>{this.state.staff.address}</td>
                    <td><Link to={'/staff/edit/'+this.state.staff._id}><Button color="info">Edit</Button></Link></td>   
                    <td><Button color='danger' onClick={this.onDelete}>Delete</Button></td>       
        	</tr>
        )
    }

}

export default StaffRow;