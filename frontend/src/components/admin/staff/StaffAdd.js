import React,{Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

class StaffAdd extends Component{

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

        this.generatePassword=this.generatePassword.bind(this);
    }

    componentDidMount(){
        this.generatePassword()
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    generatePassword = () => {
        let password = "",
            letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890",
            length = 6;
        for(let pass = 0; pass < length; pass++) {
            password += letters[Math.floor(Math.random() * letters.length)];
        }
        this.setState(state => ({
          password: password
        }));
    }

    showPassword(){
        var pass = document.getElementById("password");
        pass.type="text";
    }

    hidePassword(){
        var pass = document.getElementById("password");
        pass.type="password";
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

        axios.post('http://localhost:4000/staffs/add',staff)
            .then(
                (res)=>{
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
                        'New Staff Added!',
                        'success'
                        )

                    this.props.history.push('/staff/view');

                },
                (err)=>{
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                        footer: '<a href>Why do I have this issue?</a>'
                      })
                }

            )

    }

    render(){
        return(
            <div className="container" >
                <main role="main" style={{marginTop:'40px'}}>
                    <section className="jumbotron text-center" >
                        <div className="container">
                                <div className="col-md-12 text-center">
                                    <h4 className="pb-4">Add New Staff Member</h4>
                                <form id='staffForm' onSubmit={this.onFormSubmit}>
                                    <div className="row form-group">
                                        <div className="col-lg-6 col-md-6 form-group">                  
                                            <label>Staff Name</label>
                                            <input
                                                type="text" 
                                                className="form-control" 
                                                name="name"  
                                                placeholder="Staff Name" 
                                                onChange={this.onValueChange}
                                                value={this.state.name}/>                  
                                        </div>
                                        <div className="col-lg-6 col-md-6 form-group">                  
                                            <label>Email</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                name="email" 
                                                placeholder="Email"
                                                onChange={this.onValueChange}
                                                value={this.state.email}/>                  
                                        </div> 
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-lg-6 col-md-6 form-group">                  
                                            <label>Password</label>
                                            <input 
                                                type="password" 
                                                className="form-control"
                                                name="password" 
                                                id="password"
                                                placeholder="Password"
                                                onChange={this.onValueChange}
                                                value={this.state.password}
                                                onMouseOver={this.showPassword.bind(this)}
                                                onMouseOut={this.hidePassword.bind(this)} 
                                                readOnly/>                  
                                        </div> 
                                        <div className="col-lg-6 col-md-6 form-group">                  
                                            <label>Role</label>
                                            <select name="role" className="form-control" onChange={this.onValueChange}>
                                                <option selected>Select Role</option>
                                                <option>Editor</option>
                                                <option>Admin</option>
                                                <option>Reviewer</option>
                                            </select>
                                        </div> 
                                    </div>
                                    <div className="row form-group">
                                        <div class="col-lg-6 col-md-6 form-group">                                  
                                            <label>Contact Number</label>
                                            <input 
                                                type="text" 
                                                className="form-control"
                                                name="contact" 
                                                placeholder="Contact Number"
                                                onChange={this.onValueChange}
                                                value={this.state.contact}/>   
                                        </div>
                                        <div className="col-lg-6 col-md-6 form-group">                  
                                            <label >Address</label>
                                            <textarea 
                                                    className="form-control" 
                                                    name="address" 
                                                    rows="1"
                                                    placeholder="Address"
                                                    onChange={this.onValueChange}
                                                    value={this.state.address}/>                 
                                        </div>  
                                    </div>             
                                    <div className="form-group text-center">
                                        <button type="submit"className="admin-blue-button">Add</button>
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

export default StaffAdd;