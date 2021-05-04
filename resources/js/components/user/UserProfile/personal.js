import React, { Component } from 'react';
import Axios from 'axios';
import { isNull } from 'lodash';
import Swal from 'sweetalert2'
import {connect} from 'react-redux';

class Personel extends Component {
    constructor(props) {
        super(props);
        this.state={
            cities:[],
            countries:[],
            states:[],
            city:'',
            state:'',
            country:'',
            city_id:'',
            state_id:'',
            country_id:'',
            states_loading:false,
            cities_loading:false,
            fname:'',
            lname:'',
            dob:'',
            gender:'1',
            seeking:'1',
            username:'',
            uid:this.props.profile_user.id,
            email:''
        }
    }
    componentDidMount(){
        Axios.get('/api/get_countries').then(res=>{
            this.setState({
                countries:res.data
            })
        })
        let user =  window.localStorage.getItem('key1');
        let senderdata = {
            access_token:user
        }
        Axios.post('/api/get_user_by_id/'+this.state.uid,senderdata).then(res=>{
            if(res.data == 0){

            }else{
                this.setState({
                    fname:res.data[0].fname,
                    lname:res.data[0].lname,
                    country_id:res.data[0].country_id,
                    city_id:res.data[0].city_id,
                    state_id:res.data[0].state_id,
                    gender: isNull(res.data[0].gender)? '1':res.data[0].gender,
                    seeking: isNull(res.data[0].seeking) ? '1' : res.data[0].seeking,
                    dob:res.data[0].dob,
                    username:res.data[0].name,
                    uid:res.data[0].id,
                    city:res.data[0].city,
                    country:res.data[0].country,
                    state:res.data[0].state,
                    email:res.data[0].email
                },function (){
                    this.dataseter();
                })
            }
        })
    }
    dataseter(){
        Axios.get('/api/get_states/'+this.state.country_id).then(res=>{
            this.setState({
                states:res.data,
                states_loading:false
            })
        })
        Axios.get('/api/get_cities/'+this.state.state_id).then(res=>{
            this.setState({
                cities:res.data,
            })
        })
        if(isNull(this.state.fname)){
            this.setState({
                fname:this.state.username,
                lname:this.state.username
            })
        }
    }
    on_select_country(e){
        this.setState({
            country_id:e.target.value
        },function(){
            this.setState({
                states_loading:true
            })
            Axios.get('/api/get_states/'+this.state.country_id).then(res=>{
                this.setState({
                    states:res.data,
                    states_loading:false
                })
            })
        })
        this.state.countries.map(data=>{
            if(data.id == e.target.value){
                this.setState({
                    country:data.name
                })
            }
        })
    }
    on_select_state(e){
        this.setState({
            state_id:e.target.value
        },function(){
            this.setState({
                cities_loading:true
            })
            Axios.get('/api/get_cities/'+this.state.state_id).then(res=>{
                this.setState({
                    cities:res.data,
                    cities_loading:false
                })
            })
        })
        this.state.states.map(data=>{
            if(data.id == e.target.value){
                this.setState({
                    state:data.name
                })
            }
        })
    }
    on_select_city(e){
        this.setState({
            city_id:e.target.value
        })
        this.state.cities.map(data=>{
            if(data.id == e.target.value){
                this.setState({
                    city:data.name
                })
            }
        })
    }
    fname(e){
        this.setState({
            fname:e.target.value
        })
    }
    lname(e){
        this.setState({
            lname:e.target.value
        })
    }
    dob(e){
        this.setState({
            dob:e.target.value
        })
    }
    gender(e){
        this.setState({
            gender:e.target.value
        })
    }
    seeking(e){
        this.setState({
            seeking:e.target.value
        })
    }
    
    render() {
        return (
            <div className="container">
                <div className="card content-card">
                    <p id="header-title">Personel Info</p>
                    <p id="header-sub-title">Information about this person.</p>
                    <div id="profile-settings">
                        <div className="row profile">
                            <div  className="col">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <strong><label style={{padding:'0px'}} className="col-md-10">Name</label></strong>
                                                <span className="profile_static_text">{this.state.fname} {this.state.lname}</span>                                                    
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <strong><label style={{padding:'0px'}}  className="col-md-10">Email</label></strong>
                                                    <span className="profile_static_text">{this.state.email}</span>                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                <strong> <label >Country </label></strong>
                                                    <span className="profile_static_text">{this.state.city} {this.state.state} {this.state.country}</span>
                                                </div>
                                            </div>
                                       
                                        <div className="col-md-6">
                                                    <div className="form-group">
                                                    <strong><label className="control-label">Birthday</label></strong>
                                                            <div className="input-group date" id="datetimepicker1">
                                                            <span className="profile_static_text">{this.state.dob}</span>                                                            </div>
                                                        </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                <strong><label className="control-label">We Are/I am</label></strong>
                                                    <span className="profile_static_text">{this.state.gender== "1" ? 'Man' : ''}
                                                        {this.state.gender== "2" ? 'Woman' : ''}
                                                        {this.state.gender== "3" ? ' Wife & Husband' : ''}
                                                        {this.state.gender== "4" ? 'Woman & Man' : ''}
                                                        {this.state.gender== "5" ? 'family' : ''}
                                                        {this.state.gender== "6" ? 'father' : ''}
                                                        {this.state.gender== "7" ? 'mother' : ''}
                                                        {this.state.gender== "8" ? 'brother' : ''}
                                                        {this.state.gender== "9" ? 'sister' : ''}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <strong><label className="control-label">Seeking</label></strong>
                                                    <span className="profile_static_text"> {this.state.seeking== "1" ? 'looking for Man' : ''}
                                                        {this.state.seeking== "2" ? 'looking for Woman' : ''}
                                                        {this.state.seeking== "3" ? 'looking for Wife & Husband' : ''}
                                                        {this.state.seeking== "4" ? 'looking for Woman & Man' : ''}
                                                        {this.state.seeking== "5" ? 'family' : ''}
                                                        {this.state.seeking== "6" ? 'father' : ''}
                                                        {this.state.seeking== "7" ? 'mother' : ''}
                                                        {this.state.seeking== "8" ? 'brother' : ''}
                                                        {this.state.seeking== "9" ? 'sister' : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Personel;