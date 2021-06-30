import React,{Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

class StaffEdit extends Component{

    constructor(props) {
        super(props);
        
        this.state = { 
            visible: false,
            name:'',
            email:'',
            password:'',
            role:'',
            contact:'',
            address:''

        };

        this.onFormSubmit= this.onFormSubmit.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/staffs/edit/'+this.props.match.params.id)
            .then(
                staff =>{
                    this.setState({
                        name:staff.data.name,
                        email:staff.data.email,
                        password:staff.data.password,
                        role:staff.data.role,
                        contact:staff.data.contact,
                        address:staff.data.address
                    })
                }
            )
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    onValueChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onFormSubmit(e){
        e.preventDefault();

        const name = this.state.name;
        const email = this.state.email;
        const password = this.state.password;
        const role = this.state.role;
        const contact = this.state.contact;
        const address = this.state.address;

        const staff={
            name,
            email,
            password,
            role,
            contact,
            address
        }

        axios.post('http://localhost:4000/staffs/update/'+this.props.match.params.id,staff)
            .then(
                res=>{
                    console.log(res.data)
                    this.setState({
                        visible:true,
                        name:'',
                        email:'',
                        password:'',
                        role:'',
                        contact:'',
                        address:''});

                        Swal.fire(
                            'Done',
                            'Staff Details Updated!',
                            'success'
                            ) 
                        this.props.history.push('/staff/view');
                },
                err=>console.log(err)
            )        
    }

    render(){
        return(
            <div className="container" >
                <main role="main" style={{marginTop:'40px'}}>
                    <section className="jumbotron text-center" >
                        <div className="container">
                                <div className="col-md-12 text-center">
                                    <h4 className="pb-4">Edit Staff Member</h4>
                                <form id='staffForm' onSubmit={this.onFormSubmit}>
                                    <div className="row form-group">    
                                        <div className="col-lg-6 col-md-6 form-group">                  
                                            <label>Staff Name</label>
                                            <input
                                                type="text" 
                                                className="form-control" 
                                                name="name"  
                                                onChange={this.onValueChange}
                                                value={this.state.name}/>                  
                                        </div>
                                        <div className="col-lg-6 col-md-6 form-group">                  
                                            <label>Email</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                name="email" 
                                                onChange={this.onValueChange}
                                                value={this.state.email}/>                  
                                        </div> 
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-lg-6 col-md-6 form-group">                  
                                            <label>Role</label>
                                            <select name="role" className="form-control" onChange={this.onValueChange} value={this.state.role}>
                                                <option>-Choose Role-</option>
                                                <option>Editor</option>
                                                <option>Admin</option>
                                                <option>Reviewer</option>
                                            </select>
                                        </div> 
                                        <div class="col-lg-6 col-md-6 form-group">                                  
                                            <label>Contact Number</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                name="contact" 
                                                onChange={this.onValueChange}
                                                value={this.state.contact}/>   
                                        </div>
                                    </div>
                                    <div className="row form-group admin-textarea">
                                        <div className="col-lg-6 col-md-6 form-group">                  
                                            <label >Address</label>
                                            <textarea 
                                                    className="form-control" 
                                                    name="address" 
                                                    rows="1"
                                                    onChange={this.onValueChange}
                                                    value={this.state.address}/>                 
                                        </div>  
                                    </div>             
                                    <div className="form-group text-center">
                                        <button type="submit" className="admin-blue-button">Update</button>
                                    </div>   
                                </form>                            
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        );
    }
}

export default StaffEdit;