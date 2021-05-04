import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import './user.css'
import {Modal} from 'react-bootstrap'
import Swal from 'sweetalert2'

class Matchdata extends Component {
    constructor(props) {
        super(props);
        this.state={
            uid:this.props.user.uid,
            childrens:'',
            singleparent:'',
            display_modal:0,
            interested:[
                {check:0,name:' New to the area?'},
                {check:0,name:' GrWish to increase number of families you can be with?'},
                {check:0,name:' Change in family status (e.g. divorce, remarried)?'},
                {check:0,name:' Would like to experience families outside your ethnic group?'},
                {check:0,name:' Would like to be matched with families just like yours?'},
                {check:0,name:' Wish my kids to meet new friends'},
                {check:0,name:' Others'},
            ],
            learnabout:[
                {check:0,name:' Referral from other family?'},     
                {check:0,name:' Facebook'},     
                {check:0,name:' Instagram'},
                {check:0,name:' Twitter'},     
                {check:0,name:' Others'},
            ],
            interested_id:'',
            interested_string:'',
            learnabout_id:'',
            learnabout_string:'',
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            uid:this.state.uid
        }
        Axios.post('/api/get_setup',senderdata).then(res=>{
            console.log(res);
            this.setState({
                interested_string:res.data[0].interested_string,
                learnabout_string:res.data[0].learnabout_string,
                childrens:res.data[0].childrens,
                single_parent:res.data[0].single_parent
            })
        })
    }
    save_setup(){
        let senderdata={
            interested_id:this.state.interested_id,
            interested_string:this.state.interested_string,
            learnabout_id:this.state.learnabout_id,
            learnabout_string:this.state.learnabout_string,
            childrens:this.state.childrens,
            single_parent:this.state.single_parent,
            uid:this.state.uid,
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/setup',senderdata).then(res=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Match Data Updated SuccessFully',
                showConfirmButton: false,
                timer: 1000
              })
              this.show_modal(0);
        })
    }
    show_modal(id){
        console.log(id);
        this.setState({
            display_modal:id
        })
    }
    interested(id){

        let exer = this.state.interested;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
                this.setState({
                    interested_id:id,
                    interested_string:data.name
                })
            }else{
                data.check = 0;
            }
        })
        this.setState({
            interested:exer

        }) 

    }
    learnabout(id){

        let exer = this.state.learnabout;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
                this.setState({
                    learnabout_id:id,
                    learnabout_string:data.name
                })
            }else{
                data.check = 0;
            }
        })
        this.setState({
            learnabout:exer
        }) 
    }
    childrens(e){
        this.setState({
            childrens:e.target.value,
        })
    }

    single_parent(e){
        this.setState({
            single_parent:e.target.value,
        })
    }

    render() {
        return (
            <div id="matchdata" className="container">
                <div className="card content-card">
                    <p id="header-title">Match Data</p>
                    <p id="header-sub-title">Information about how this person want him/her to be matched to other people.</p>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6 mt-2">
                                <div className="card content-card-matchdata">
                                    <div className="md-card-head row">
                                        <div className="col-md-10">
                                            <h6>Why are you interested in FamilyMatch?</h6>
                                        </div>
                                        <div className="col-md-2 mt-1">
                                            <button onClick={this.show_modal.bind(this,1)} className="btn btn-primary">
                                                <i className="fa fa-edit" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="match-card-body">{this.state.interested_string}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="content-card-matchdata">
                                    <div className="md-card-head row">
                                        <div className="col-md-10">
                                            <h6>How did you learn about FamilyMatch?</h6>
                                        </div>
                                        <div className="col-md-2 mt-1">
                                            <button onClick={this.show_modal.bind(this,2)} className="btn btn-primary">
                                                <i className="fa fa-edit" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="match-card-body">{this.state.learnabout_string}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="content-card-matchdata">
                                    <div className="md-card-head row">
                                        <div className="col-md-10">
                                            <h6>How many children do you have?</h6>
                                        </div>
                                        <div className="col-md-2 mt-1">
                                            <button onClick={this.show_modal.bind(this,3)} className="btn btn-primary">
                                                <i className="fa fa-edit" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="match-card-body">{this.state.childrens}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-2">
                                <div className="content-card-matchdata">
                                    <div className=" md-card-head row">
                                        <div className="col-md-10">
                                            <h6>Are you a single parent?</h6>
                                        </div>
                                        <div className="col-md-2 mt-1">
                                            <button onClick={this.show_modal.bind(this,4)} className="btn btn-primary">
                                                <i className="fa fa-edit" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h5 className="match-card-body" >{this.state.single_parent}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
                {
                    this.state.display_modal == 1?
                        <Modal  show={this.state.display_modal == 1} onHide={this.show_modal.bind(this,0)}>
                            <Modal.Header closeButton>
                            <Modal.Title>Why are you interested in FamilyMatch?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            {
                                this.state.interested.map((data,index)=>{
                                    return(
                                        <div key={index} >
                                            <div className="radio">
                                                <label >
                                                <input  onChange={this.interested.bind(this,index)} type="radio" name="interested" checked={data.check == 1}/>
                                                    {data.name}
                                                </label>
                                            </div>
                                        </div>
                                    )
                                })
                            } 
                            <button onClick={this.save_setup.bind(this)} type="submit" className="btn btn-default btn-block continue-btn">
                                 Update                       
                            </button>
                            </Modal.Body>
                        </Modal>
                    :null
                }
                                {
                    this.state.display_modal == 2?
                        <Modal show={this.state.display_modal == 2}  onHide={this.show_modal.bind(this,0)}>
                            <Modal.Header closeButton>
                            <Modal.Title>How did you learn about FamilyMatch?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            {
                                this.state.learnabout.map((data,index)=>{
                                    return(
                                        <div key={index} >
                                            <div className="radio">
                                                <label >
                                                <input  onChange={this.learnabout.bind(this,index)} type="radio" name="interested" checked={data.check == 1}/>
                                                    {data.name}
                                                </label>
                                            </div>
                                        </div>
                                    )
                                })
                            } 
                            <button onClick={this.save_setup.bind(this)} type="submit" className="btn btn-default btn-block continue-btn">
                                 Update                       
                            </button>
                            </Modal.Body>
                        </Modal>
                    :null
                }
                                {
                    this.state.display_modal == 3?
                        <Modal show={this.state.display_modal == 3}  onHide={this.show_modal.bind(this,0)}>
                            <Modal.Header closeButton>
                            <Modal.Title>How many children do you have?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <input onChange={this.childrens.bind(this)} className="form-control" name="options" />
                                            <br /><br />
                                            <button onClick={this.save_setup.bind(this)} type="submit" className="btn btn-default btn-block continue-btn">
                                               Update
                                            </button>
                            </Modal.Body>
                        </Modal>
                    :null
                }
                {
                    this.state.display_modal == 4 ?
                        <Modal show={this.state.display_modal == 4}  onHide={this.show_modal.bind(this,0)}>
                            <Modal.Header closeButton>
                            <Modal.Title>Are you a single parent?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <input onChange={this.single_parent.bind(this)} className="form-control" name="options" />
                                                <br />
                                                <br />
                                                <button onClick={this.save_setup.bind(this)} type="submit" className="btn btn-default btn-block continue-btn">
                                                    Update
                                </button>
                            </Modal.Body>
                        </Modal>
                    :null
                }
                
            </div>        
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Matchdata);