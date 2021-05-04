import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import {Modal} from 'react-bootstrap'
import '../user.css'
import Axios from 'axios';
import { img_base } from '../../Configs/Env';

class AllEvents extends Component {
    constructor(props) {
        super(props);
        this.state={
            today_events:[],
            tomorrow_events:[],
            upcoming_events:[],
            today_norecords:false,
            tomorrow_norecords:false,
            upcoming_norecord:false,
            display_modal:false,
            e_title:'',
            e_location:'',
            e_date:'',
            e_description:'',
            e_req:'',
            e_image_url:'',
            e_cost:''
        }
    }
    
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/allevents',senderdata).then(res=>{
            console.log(res);
            this.setState({
                today_events:res.data.today_events,
                tomorrow_events:res.data.tomorrow_events,
                upcoming_events:res.data.upcoming_events,
                today_norecords:res.data.today_events.length == 0 ? true : false ,
                tomorrow_norecords:res.data.tomorrow_events.length == 0 ? true : false ,
                upcoming_norecord:res.data.upcoming_events.length == 0 ? true : false ,
            })
        })
    }

    today_e_readmore(id){
    
        this.state.today_events.map((data,index)=>{
            if(index == id){
                this.setState({
                    e_title:data.title,
                    e_req:data.requirement,
                    e_location:data.location,
                    e_cost:data.cost,
                    e_image_url:data.image,
                    e_date:data.date,
                    e_description:data.description,
                    display_modal:true
                })
            }
        })
       
    }
    tomorro_e_readmore(id){
    
        this.state.tomorrow_events.map((data,index)=>{
            if(index == id){
                this.setState({
                    e_title:data.title,
                    e_req:data.requirement,
                    e_location:data.location,
                    e_cost:data.cost,
                    e_image_url:data.image,
                    e_date:data.date,
                    e_description:data.description,
                    display_modal:true
                })
            }
        })
       
    }
    upcoming_e_readmore(id){
    
        this.state.upcoming_events.map((data,index)=>{
            if(index == id){
                this.setState({
                    e_title:data.title,
                    e_req:data.requirement,
                    e_location:data.location, 
                    e_cost:data.cost,
                    e_image_url:data.image,
                    e_date:data.date,
                    e_description:data.description,
                    display_modal:true
                })
            }
        })
       
    }
    hide_modal(){
        this.setState({
            display_modal:false
        })
    }
    render() {
        return (
            <div>
                <div className="container mt-5">
                    <div id="allevents" className="card content-card">
                        <p id="header-title">Events</p>
                        <p id="header-sub-title">Information about what's happening in your family's life.</p>
                       
                        <div className="col-md-12">
                            <Link className="btn btn-default events-btn1" to="/profile/AddEvent">Add New</Link>
                            <div className="container-fluid">
                                <p id="title1" className="mt-2">Today</p>
                                <div className="table-responsive">
                                    <table  className="table table-striped" >
                                        <thead>
                                            <tr style={{borderTop:'0px'}}>
                                                <th >Image</th>
                                                <th>Title</th>
                                                <th>Cost</th>
                                                <th>Requirement</th>
                                                <th>Location</th>
                                                <th>Date</th>
                                                <th>Description</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.today_events.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td className="table-img">
                                                                <img src={img_base+data.image}></img>
                                                            </td>
                                                            <td>{data.title}</td>
                                                            <td>{data.cost}</td>
                                                            <td>{data.requirement}</td>
                                                            <td>{data.location}</td>
                                                            <td>{data.date}</td>
                                                            <td onClick={this.today_e_readmore.bind(this,index)} className="readmore">Read More</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                this.state.today_norecords?
                                                    <tr>
                                                        <td colSpan="7">No Records</td>
                                                    </tr>
                                                :null
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            
                            <div className="container-fluid">
                                <p id="title1" className="mt-2">Tomorrow</p>
                                <div className="table-responsive">
                                    <table  className="table table-striped" >
                                        <thead>
                                            <tr style={{borderTop:'0px'}}>
                                                <th >Image</th>
                                                <th>Title</th>
                                                <th>Cost</th>
                                                <th>Requirement</th>
                                                <th>Location</th>
                                                <th>Date</th>
                                                <th>Description</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.tomorrow_events.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td className="table-img">
                                                                <img src={img_base+data.image}></img>
                                                            </td>
                                                            <td>{data.title}</td>
                                                            <td>{data.cost}</td>
                                                            <td>{data.requirement}</td>
                                                            <td>{data.location}</td>
                                                            <td>{data.date}</td>
                                                            <td onClick={this.tomorro_e_readmore.bind(this,index)} className="readmore">Read More</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                this.state.tomorrow_norecords?
                                                <tr>
                                                    <td colSpan="7">No Records</td>
                                                </tr>
                                                :null
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="container-fluid">
                                <p id="title1" className="mt-2">UpComing</p>
                                <div className="table-responsive">
                                    <table  className="table table-striped" >
                                        <thead>
                                            <tr style={{borderTop:'0px'}}>
                                                <th >Image</th>
                                                <th>Title</th>
                                                <th>Cost</th>
                                                <th>Requirement</th>
                                                <th>Location</th>
                                                <th>Date</th>
                                                <th>Description</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.upcoming_events.map((data,index)=>{
                                                    return(
                                                        <tr key={index}>
                                                            <td className="table-img">
                                                                <img src={img_base+data.image}></img>
                                                            </td>
                                                            <td>{data.title}</td>
                                                            <td>{data.cost}</td>
                                                            <td>{data.requirement}</td>
                                                            <td>{data.location}</td>
                                                            <td>{data.date}</td>
                                                            <td onClick={this.upcoming_e_readmore.bind(this,index)} className="readmore">Read More</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            {
                                                this.state.upcoming_norecord?
                                                <tr>
                                                    <td colSpan="7">No Records</td>
                                                </tr>
                                                :null
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <Modal show={this.state.display_modal}  onHide={this.hide_modal.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.state.e_title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="container-fluid">
                                <div className="modal-img-content-card">
                                    <img className="event_modal_img" src={img_base+this.state.e_image_url}></img>
                                </div>
                                <div className="modal_content_card ">
                                    <h2 className="header-title">Cost</h2>
                                    <h4>{this.state.e_cost}</h4>
                                </div>
                                <div className="modal_content_card">
                                    <h2 className="header-title">Requirement</h2>
                                    <h4>{this.state.e_req}</h4>
                                </div>
                                <div className="modal_content_card">
                                    <h2 className="header-title">Location</h2>
                                    <h4>{this.state.e_location}</h4> 
                                </div>
                                <div className="modal_content_card">
                                    <h2 className="header-title">Date</h2>
                                    <h4>{this.state.e_date}</h4> 
                                </div>
                                <div className="modal_content_card">
                                    <h2 className="header-title">Description</h2>
                                    <h4 >{this.state.e_description}</h4> 
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>  
            </div>    
        );
    }
}

export default AllEvents;