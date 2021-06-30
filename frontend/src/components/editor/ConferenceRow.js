import React,{Component} from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2'

class ConferenceRow extends Component{

    constructor(props){
        super(props);

        this.state={
            conference:props.conference
        }

        this.onDelete=this.onDelete.bind(this);
    }

    onDelete(){
        axios.get('http://localhost:4000/editor/conference/delete/'+this.state.conference._id)
            .then(
                res => {
                    Swal.fire(
                        'Done',
                        'Conference Removed !',
                        'success'
                        )
                }
            )
    }

    render(){
        return(
            <tr className='text-center'>
                  	<td>{this.state.conference.name}</td>
                    <td>{this.state.conference.about}</td>
                    <td>{this.state.conference.startdate}</td>		
                    <td>{this.state.conference.enddate}</td>
                    <td>{this.state.conference.venue}</td>
                    <td>{this.state.conference.organizer}</td>
                    <td><Link to={'/conference/edit/'+this.state.conference._id}><Button color="info">Edit</Button></Link></td>   
                    <td><Button color='danger' onClick={this.onDelete}>Delete</Button></td>       
        	</tr>
        )
    }

}

export default ConferenceRow;