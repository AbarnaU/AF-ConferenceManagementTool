import React, {Component} from 'react'
import axios from "axios";

class Download extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/editor/file/')
            .then(response => {
                this.setState({
                    files: response.data.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/editor/file/')
            .then(response => {
                this.setState({
                    files: response.data.data,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <div className="conference text-center">
                    <h3>Templates</h3>
                </div>
                
                {
                    this.state.files.map((file) => {
                            return (
                                <div class="topic-listing col-md-12">
                                    <div class="topic-info">
                                        <div class="single_plan__block mb-30">
                                            <div class="plan-content-box plan-content-box__wight__bg">
                                                <div class="topic-date">
                                                    <h3 classname="plan-content-box1"><span> {file.file_name}</span></h3>
                                                </div> 

                                                <div className="plan-content-box2 pb-5">
                                                    <a id="assigned_doc" className="form-control alert-link outline-none shadow-none mr-3" 
                                                    href={'http://localhost:4000/'+file.file_url}download>
                                                    {file.file_name + '.' + file.file_ext}
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                    })
                }
            </div>
        );
    }
}

export default Download;