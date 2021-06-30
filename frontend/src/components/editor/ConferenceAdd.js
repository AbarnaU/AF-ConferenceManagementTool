import React,{Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import AdminList from './AdminList'

class ConferenceAdd extends Component{

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            name:'',
            about:'',
            startdate:'',
            enddate:'',
            venue:'',
            organizer:'',
            staffs:[],
            checkedStaffs:[]
        };

        this.onFormSubmit= this.onFormSubmit.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.onDismiss = this.onDismiss.bind(this);
        this.fillStaff= this.fillStaff.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/staffs/')
            .then(
                staffs=>this.setState({staffs:staffs.data})
            )

            console.log(this.state.staffs.length)
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    checkStaff(id,bool){

        let staffs = this.state.checkedStaffs;

        if(bool)
            staffs.push(id)

        else
            staffs.splice(id,1);

        this.setState({
            checkedStaffs:staffs
        },()=>{
            console.log(this.state.checkedStaffs)
        })


    }

    fillStaff(){
        return this.state.staffs.map((staff)=>{
            return(
                <AdminList key={staff._id} staff={staff} passValue={this.checkStaff.bind(this)}/>
            )
        })
    }

    onValueChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onFormSubmit(e){
        //this.setState({pending:true})
        e.preventDefault();

        const name = this.state.name;
        const about = this.state.about;
        const startdate = this.state.startdate;
        const enddate = this.state.enddate;
        const venue = this.state.venue;
        const organizer = this.state.organizer;
        const staffs = this.state.checkedStaffs

        const conference={
            name,
            about,
            startdate,
            enddate,
            venue,
            organizer,
            staffs
        }
        axios.post('http://localhost:4000/editor/conference/add',conference)
            .then(
                (res)=>{
                    staffs.map(staff => {
                        const adminNotifications = {
                            conference: res.data.DATA._id,
                            staff: staff
                        };

                        axios.post('http://localhost:4000/admin/notifications/', adminNotifications)
                            .then(res => console.log(res.data))
                            .catch(err => console.log(err))

                    });

                    this.setState({
                        visible:true,
                        name:'',
                        about:'',
                        startdate:'',
                        enddate:'',
                        venue:'',
                        organizer:'',
                        checkedStaffs:[]});

                    Swal.fire(
                        'Good job!',
                        'Conference Successfully Added!',
                        'success'
                        )

                    this.props.history.push('/conference/view')
                },
                (err)=>{
                    console.log(err)

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
                <main role="main" style={{marginTop:'10px'}}>
                    <section className="jumbotron text-center" >
                        <div className="container">
                                <div className="col-md-12 text-center">
                                    <h4 className="pb-4">Add New Conference</h4>
                                <form id='staffForm' onSubmit={this.onFormSubmit}>
                                    <div className="row form-group">
                                        <div className="col-lg-6 col-md-6 form-group">
                                            <label>Conference Name</label>
                                            <input
                                                name="name"
                                                placeholder="Conference Name"
                                                className="form-control"
                                                required="required"
                                                type="text"
                                                onChange={this.onValueChange}
                                                value={this.state.name} />
                                        </div>
                                        <div className="col-lg-6 col-md-6 form-group">
                                            <label>About</label>
                                            <textarea
                                                    className="form-control"
                                                    name="about"
                                                    rows="1"
                                                    placeholder="About"
                                                    onChange={this.onValueChange}
                                                    value={this.state.about}/>
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-lg-6 col-md-6 form-group">
                                            <label>Start Date</label>
                                                <input
                                                    name="startdate"
                                                    placeholder="Start Date"
                                                    className="form-control"
                                                    required="required"
                                                    type="date"
                                                    onChange={this.onValueChange}
                                                    value={this.state.startdate} />
                                        </div>
                                        <div className="col-lg-6 col-md-6 form-group">
                                            <label>End Date</label>
                                                <input
                                                    name="enddate"
                                                    placeholder="End Date"
                                                    className="form-control"
                                                    required="required"
                                                    type="date"
                                                    onChange={this.onValueChange}
                                                    value={this.state.enddate} />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div class="col-lg-6 col-md-6 form-group">
                                            <label>Venue</label>
                                                <input
                                                    name="venue"
                                                    placeholder="Conference Venue"
                                                    className="form-control"
                                                    required="required"
                                                    type="text"
                                                    onChange={this.onValueChange}
                                                    value={this.state.venue} />
                                        </div>
                                        <div className="col-lg-6 col-md-6 form-group">
                                            <label >Organizer</label>
                                                <input
                                                    name="organizer"
                                                    placeholder="Organizer"
                                                    className="form-control"
                                                    required="required"
                                                    type="text"
                                                    onChange={this.onValueChange}
                                                    value={this.state.organizer} />
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-center">
                                        <h5 className="pb-4">Assign To</h5>
                                        <div className="admin-content-widget no-padding">
                                            <div className="panel panel-default table-responsive">
                                                <table className="table table-striped table-bordered tadmin-user-table">
                                                    <thead className='text-center'>
                                                        <tr>
                                                            <th scope="col">Admin Name</th>
                                                            <th scope="col">Role</th>
                                                            <th scope="col" colSpan='2'></th>
                                                        </tr>
                                                    </thead>
                                                        {this.fillStaff()}
                                                </table>
                                            </div>
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

export default ConferenceAdd;