import React, { Component } from 'react';
import Swal from 'sweetalert2'
import {connect} from 'react-redux';
import axios from 'axios'
import '../user.css'
class Allevents extends Component {
    constructor(props) {
        super(props);
        this.state={
            title:'',
            cost:'',
            req:'',
            location:'',
            fromdate:'',
            todate:'',
            description:'',
            imageArray: [],
            body: '',
            posts: [],
            uid:this.props.user.uid
        }
    }
    title(e){
        this.setState({
            title:e.target.value
        })
    }
    cost(e){
        this.setState({
            cost:e.target.value
        })
    }

    req(e){
        this.setState({
            req:e.target.value
        })
    }

    location(e){
        this.setState({
            location:e.target.value
        })
    }

    fromdate(e){
        this.setState({
            fromdate:e.target.value
        })
    }

    todate(e){
        this.setState({
            todate:e.target.value
        })
    }

    description(e){
        this.setState({
            description:e.target.value
        })
    }

    handleFileChange(e){
      
        const files = Array.from(e.target.files);

        const promises = files.map(file => {
            return (new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
                
            }))
        });

        Promise.all(promises).then(images => {
            this.setState({
                imageArray: images,
            })
        }, error => { console.error(error); });
    
        if (this.props.onChange !== undefined) {
            this.props.onChange(e);
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        // this.postData();
        if(this.state.title != '' && this.state.cost != '' && this.state.req 
        != '' && this.state.location != '' && this.state.fromdate != '' && this.state.todate !='' ){
            const formData = new FormData();
            this.state.imageArray.forEach((image_file) => {
                formData.append('file[]', image_file);
            });
            formData.append('body', this.state.body);
            // for (let pair of formData.entries()) {
            //     console.log(pair[0]+ ', ' + pair[1]);
            // }
            if(this.state.imageArray.length == 0){ 
                formData.append('imageflag', 0);
            }else{
                formData.append('imageflag', 1);
            }
            const senderdata={
                title:this.state.title,
                cost:this.state.cost,
                req:this.state.req,
                location:this.state.location,
                fromdate:this.state.fromdate,
                todate:this.state.todate,
                uid:this.state.uid,
                description:this.state.description
            }

            formData.append('access_token',window.localStorage.getItem('key1'));
            formData.append('title',this.state.title);
            formData.append('cost',this.state.cost);
            formData.append('req',this.state.req);
            formData.append('location',this.state.location);
            formData.append('fromdate',this.state.fromdate);
            formData.append('todate',this.state.todate);
            formData.append('uid',this.state.uid);
            console.log(this.state.imageArray.length);
                axios.post('/api/add_event', formData)
                .then(response => {
                    console.log(response)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Image Uploaded Successfully',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    this.props.history.push('/profile/AllEvents');                   
            });
            
            this.setState({
                body: ''
            });
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please Fill All the Required Fields ',
                showConfirmButton: false,
                timer: 1000
            })
        }
       
    }


    render() {
        return (
            <div className="container mt-3">
                <div  className="card content-card">
                    <p id="header-title">Events</p>
                    <p id="header-sub-title">Information about what's happening in your family's life.</p>

                    <div className="eventsclass">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <div className="form-group">
                                <label className="control-label">Title</label>
                                <input onChange={this.title.bind(this)} type="text" name="title"  className="form-control events-input" placeholder="">
                                </input>

                            </div>

                            <div className="form-group">
                                <label className="control-label">Cost</label>
                                <input onChange={this.cost.bind(this)} type="text" name="title"  className="form-control events-input" placeholder="">
                                </input>

                            </div>
                            <div className="form-group">
                                <label className="control-label">Requirement</label>
                                <input onChange={this.req.bind(this)} type="text" name="title"  className="form-control events-input" placeholder="">
                                </input>

                            </div>
                            <div className="form-group">
                                <label className="control-label">Location</label>
                                <input onChange={this.location.bind(this)} type="text" name="title"  className="form-control events-input" placeholder="">
                                </input>

                            </div>

                            <div className="form-group">
                                <label className="control-label">From</label>
                              
                                    <div>
                
                                            <div >
                                                <input onChange={this.fromdate.bind(this)} type="date"  name="birthday" className="form-control events-input">
                                                </input>
                                            </div>
                                    </div>


                      
                            </div>

                            <div className="form-group">
                                <label className="control-label">To</label>
                            
                                    <div>
                                            <div className="react-datepicker__input-container">
                                                <input onChange={this.todate.bind(this)} type="date" id="birthday" name="birthday" className="form-control events-input">
                                                </input>
                                            </div>
                                    </div>


                             
                            </div>

                            <div className="form-group">
                                <label className="control-label">Image (Optional)</label>
                                <input type="file" style={{width:'100%'}} placeholder="Upload Image"  onChange={this.handleFileChange.bind(this)} />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Description (Optional)</label>
                                <textarea  onChange={this.description.bind(this)} name="description" className="form-control events-textarea" rows="5" id="comment">
                                </textarea>
                            </div>

                            <div className="form-group">
                                <button onClick={this.handleSubmit.bind(this)} className="btn btn-default btn-block events-btn">Add</button>
                            </div>

                            <br />

                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Allevents);