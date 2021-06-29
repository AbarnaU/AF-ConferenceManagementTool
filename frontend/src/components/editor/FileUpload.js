import React, {Component} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2';
import $ from 'jquery';

class FileUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            link_name: '',
            file_name: '',
            file_url: '',
            file_ext: '',
            file: ''
        };
    }

    componentDidMount() {
        $(".custom-file-input").on("change", function () {
            let fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
        });
    }

    fileUploadHandler = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    };

    onTypeFileHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    };

    handleAddSubmit = (e) => {
        e.preventDefault();

            const fd = new FormData();
            fd.append("file", this.state.file);

            if (this.state.file.size <= 10 * 1024 * 1024) {
                    axios.post('http://localhost:4000/editor/file/upload-file', fd, {
                        onUploadProgress: progressEvent => {
                            console.log('Upload Progress : ' + Math.round((progressEvent.loaded / progressEvent.total) * 100));
                        }
                    })
                        .then(res => {
                            if (res.data.status !== 400) {
                                let file = this.state.file.name.split(".");
                                let fileName = file[0].charAt(0).toUpperCase() + file[0].slice(1);
                                let extension = file[1];

                                const newFile = {
                                    file_name: fileName,
                                    link_name: this.state.link_name,
                                    file_url: res.data.file_url,
                                    file_ext: extension
                                };

                                axios.post('http://localhost:4000/editor/file/', newFile)
                                    .then(res => {
                                        Swal.fire('File Added Successfully', '', 'success');
                                        this.props.history.push('/home')   
                                    })
                                    .catch(err => {
                                        Swal.fire('Oops...', 'File Upload Failed', 'error');
                                        console.log(err.message)
                                    });
                                }     
                            });
                        }       
                    }
    render() {
        return (
            <div className="card mt-3">
                <form id="form" onSubmit={this.handleAddSubmit}>
                    <div className="form-inline card-header">
                        <h5 className="mt-2">Add Files</h5>
                    </div>
                    
                    <div className="form-group mx-sm-2 ml-2 mr-2">
                        <label className="alert-link ml-1">File Link Name:</label>
                        <div className="ml-auto">
                            <input type="text" className="form-control"
                                   onChange={this.onTypeFileHandler}
                                   id="link_name"
                                   placeholder="Link Name"
                                   required/>
                        </div>
                    </div>

                    <div className="form-group mx-sm-2 ml-2 mr-2">
                        <label className="alert-link ml-1">Upload Document:
                            <small> (Max:10MB)</small>
                        </label>
                        <div className="custom-file">
                            <input type="file"
                                   className="custom-file-input"
                                   onChange={this.fileUploadHandler}
                                   id="input_File"
                                   required/>
                            <label className="custom-file-label form-control">Choose file</label>
                        </div>
                    </div>
                    <div className="col text-center mb-3">
                        <button id="add_material" className="btn btn-primary">
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FileUpload;
