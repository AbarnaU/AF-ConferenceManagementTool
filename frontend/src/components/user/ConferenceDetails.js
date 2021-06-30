import React,{Component} from 'react';
import axios from 'axios';
import { Alert} from 'reactstrap';
import Swal from 'sweetalert2'

class ConferenceDetails extends Component{

    constructor(props) {
        super(props);
        
        this.state = { 
            conferences:[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:4000/user/conference/view/'+this.props.match.params.name)
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

    render(){
        return(
            <div className="container" >
                <main role="main" style={{marginTop:'60px'}}>
                    <section className="jumbotron" >
                        <div className="container">
                            <div className="col-md-12">
                                <h3 className="text-center pb-4">{this.state.name}</h3>
                                <p>{this.state.about}</p>
                                <div className="d-flex">
                                    <div className="d-flex col-md-6">
                                        <div class="p-2">Start :- </div>
                                        <div class="p-2">{this.state.startdate}</div>
                                    </div>
                                    <div className="d-flex  col-md-6">
                                        <div class="p-2">End :- </div>
                                        <div class="p-2">{this.state.enddate}</div>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <div className="d-flex col-md-6">
                                        <div class="p-2">Venue :- </div>
                                        <div class="p-2">{this.state.venue}</div>
                                    </div>
                                    <div className="d-flex col-md-6">
                                        <div class="p-2">Organizer :- </div>
                                        <div class="p-2">{this.state.organizer}</div>
                                    </div> 
                                </div>         
                            </div>
                        </div>
                    </section>  
                </main>
            </div>
        );
    }
}

export default ConferenceDetails;