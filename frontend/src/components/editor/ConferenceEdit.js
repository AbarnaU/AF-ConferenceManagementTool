import React,{Component} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

class ConferenceEdit extends Component{

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
            staffs:[]

        };

        this.onFormSubmit= this.onFormSubmit.bind(this);
        this.onValueChange = this.onValueChange.bind(this);

        this.onDismiss = this.onDismiss.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:4000/editor/conference/edit/'+this.props.match.params.id)
            .then(
                conference =>{
                    this.setState({
                        name:conference.data.name,
                        about:conference.data.about,
                        startdate:conference.data.startdate,
                        enddate:conference.data.enddate,
                        venue:conference.data.venue,
                        organizer:conference.data.organizer
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
        const about = this.state.about;
        const startdate = this.state.startdate;
        const enddate = this.state.enddate;
        const venue = this.state.venue;
        const organizer = this.state.organizer;

        const conference={
            name,
            about,
            startdate,
            enddate,
            venue,
            organizer
        }

        axios.post('http://localhost:4000/editor/conference/update/'+this.props.match.params.id,conference)
            .then(
                res=>{
                    console.log(res.data)
                    this.setState({
                        visible:true,
                        name:'',
                        about:'',
                        startdate:'',
                        enddate:'',
                        venue:'',
                        organizer:''});

                        Swal.fire(
                            'Done',
                            'Conference Details Updated!',
                            'success'
                            ) 
                        this.props.history.push('/conference/view');
                },
                err=>console.log(err)
            )        
    }

    render(){
        return(
            <div className="container" >
            <main role="main" style={{marginTop:'10px'}}>
                <section className="jumbotron text-center" >
                    <div className="container">
                            <div className="col-md-12 text-center">
                                <h4 className="pb-4">Edit Conference</h4>
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
                                <div className="form-group text-center">
                                    <button type="submit"className="admin-blue-button">Update</button>
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

export default ConferenceEdit;