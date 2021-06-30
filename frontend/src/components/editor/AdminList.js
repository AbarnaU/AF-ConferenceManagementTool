import React,{Component} from 'react';

class AdminList extends Component{

    constructor(props){
        super(props);

        this.state={
            staff:props.staff
        }

        this.checkStaff= this.checkStaff.bind(this);
        this.checkAdmin=this.checkAdmin.bind(this);
    }

    checkStaff(){
        var check = document.getElementById(this.state.staff._id);
        console.log(check.checked)

        this.props.passValue(this.state.staff._id,check.checked)
    }

    checkAdmin(){
        if(this.state.staff.role==="Admin"){
                return(
                    <tr className='text-center'>

                        <td>{this.state.staff.name}</td>
                        <td>{this.state.staff.role}</td>
                        <input type="checkbox"style={{marginTop:'16px'}} id={this.state.staff._id} onClick={this.checkStaff}/>
                    </tr>
                )
        }
    }

    render(){
        
            return(
                <tbody>
                      {this.checkAdmin()}  
                </tbody>
                
            )
    }


}

export default AdminList;