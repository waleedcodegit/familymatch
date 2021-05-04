import React, { Component } from 'react';
import Axios from 'axios';
import { isNull } from 'lodash';
import Swal from 'sweetalert2'
import {connect} from 'react-redux';
import {Modal} from 'react-bootstrap'

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
            uid:this.props.user.uid,
            display_add_modal:false,
            fullname:'',
            relation:'',
            selected_user:'',
            searched_users:[],
            loading:false,
            selected_user_id:'',
            selected_user_name:'',
            user_relations:[],
            no_relations_reocrds:false
        }
    }
    on_hide_add_modal(){
        this.setState({
            display_add_modal:false
        })
    }
    show_add_modal(){
        this.setState({
            display_add_modal:true,
            searched_users:[]
        })
    }
    componentDidMount(){
        Axios.get('/api/get_countries').then(res=>{
            this.setState({
                countries:res.data
            })
        })
        let user =  window.localStorage.getItem('key1');
        let senderdata = {
            access_token:user,
            uid:this.state.uid
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
                    username:res.data[0].username,
                    uid:res.data[0].id
                },function (){
                    this.dataseter();
                })
            }
        })
        this.get_user_relations(senderdata);
    }
    get_user_relations(senderdata){
        Axios.post('/api/get_user_relations',senderdata).then(res=>{
            if(res.data.length == 0){
                this.setState({
                    no_relations_reocrds:true
                })
            }else{
                this.setState({
                    user_relations:res.data,
                    no_relations_reocrds:false
                })
            }
           
        })
    }
    dataseter(){
        Axios.get('/api/get_states/'+this.state.country_id).then(res=>{
            this.setState({
                states:res.data,
                states_loading:false
            },function(){
                this.state_selector(this.state.state_id);
            })
        })
        Axios.get('/api/get_cities/'+this.state.state_id).then(res=>{
            this.setState({
                cities:res.data,
            },function(){
                this.city_selector(this.state.city_id);
            })
        })
        if(isNull(this.state.fname)){
            this.setState({
                fname:this.state.username,
                lname:this.state.username
            })
        }
        
        this.country_selector(this.state.country_id);
    
    }
    country_selector(id){
        this.state.countries.map(data=>{
            if(data.id == id){
                this.setState({
                    country:data.name
                })
               
            }
        })
    }
    city_selector(id){
        this.state.cities.map(data=>{
            if(data.id == id){
                this.setState({
                    city:data.name
                })
            }
        })
    }
    state_selector(id){
        
        this.state.states.map(data=>{
            if(data.id == id){
                this.setState({
                    state:data.name
                })
            }
        })
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
    update_user_personel_info(e){
        e.preventDefault();
        let senderdata={
            city:this.state.city,
            state:this.state.state,
            country:this.state.country,
            city_id:this.state.city_id,
            state_id:this.state.state_id,
            country_id:this.state.country_id,
            fname:this.state.fname,
            lname:this.state.lname,
            dob:this.state.dob,
            gender:this.state.gender,
            seeking:this.state.seeking,
            uid:this.state.uid,
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/update_user_personel_info',senderdata).then(res=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your Personel Information Updated SuccessFully',
                showConfirmButton: false,
                timer: 1000
              })
        })
    }
    fullname(e){
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            fullname:e.target.value
        }
        this.setState({
            loading:true,
            searched_users:[],
            selected_user_name:e.target.value
        })
        if(e.target.value !=''){
            Axios.post('/api/search_user_by_name',senderdata).then(res=>{
            
                this.setState({
                    searched_users:res.data,
                    loading:false
                })
            }) 
        }else{
            this.setState({
                loading:false
            })
        }

        this.setState({
            fullname:e.target.value
        })
    }
    relation(e){
        this.setState({
            relation:e.target.value
        })
    }
    selected_user(id){
        this.setState({
            selected_user:id
        })
    }
    on_select_users(id){
        
        let temp_array = [];
        this.state.searched_users.map(data=>{
            if(data.id == id){
                temp_array.push(data);
            }
        })
            this.setState({
                searched_users:temp_array,
                selected_user_id:id,
                selected_user_name:temp_array[0].fname + ' ' + temp_array[0].lname
            })
    }
    save_relation(e){
        e.preventDefault();
        let senderdata={
            uid:this.state.uid,
            relative_id:this.state.selected_user_id,
            relation:this.state.relation,
            access_token:window.localStorage.getItem('key1'),
        }
        if(this.state.relation !='' && this.state.selected_user_id !=''){
            Axios.post('/api/add_user_relation',senderdata).then(res=>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Family Member Added SuccessFully',
                    showConfirmButton: false,
                    timer: 1000
                  })
                  this.on_hide_add_modal();
            })
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Please Select a User And Relation',
                showConfirmButton: false,
                timer: 1000
              }) 
        }
        
    }
    Delete_relation(id){
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            id:id,
            uid:this.state.uid
        }
        Axios.post('/api/delete_user_relation',senderdata).then(res=>{
            console.log(res);
            this.get_user_relations(senderdata);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'FamilyMember Deleted SuccessFully',
                showConfirmButton: false,
                timer: 1000
              }) 
        })
    }
    render() {
        return (
            <div className="container">
                <div className="card content-card">
                    <p id="header-title">Personel Info</p>
                    <p id="header-sub-title">Information about yourself</p>
                    <div id="profile-settings">
                        <div className="row profile">
                            <div  className="col">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <strong><label style={{padding:'0px'}} className="col-md-10">First Name</label></strong>
                                                    <input value={this.state.fname || " "} onChange={this.fname.bind(this)} type="text" className="form-control profile-input-box"  placeholder="First Name" name="firstName"  />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <strong><label style={{padding:'0px'}}  className="col-md-10">Last Name</label></strong>
                                                    <input value={this.state.lname || " "} onChange={this.lname.bind(this)} type="text" className="form-control profile-input-box"   placeholder="Last Name" name="lastName" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                <strong> <label >Country </label></strong>
                                                    <select value={this.state.country_id || " "} onChange={this.on_select_country.bind(this)} className="form-control profile-input-box"  name="country"  title="country">
                                                        <option value=''>Select Country</option>
                                                        {
                                                            this.state.countries.map((data,index)=>{
                                                                return(
                                                                    <option value={data.id} key={index}>{data.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <strong><label >State 
                                                {
                                                    this.state.states_loading?
                                                    <div className="spinner-border text-info ml-2" style={{fontSize:'10px',width:'25px',height:'25px'}} role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>:
                                                    ''
                                                }
                                            </label></strong>
                                                <select value={this.state.state_id || " "} onChange={this.on_select_state.bind(this)} className="form-control profile-input-box"  name="state"  title="woman">
                                                <option value=''>Select State</option>
                                                        {
                                                            this.state.states.map((data,index)=>{
                                                                return(
                                                                    <option value={data.id} key={index}>{data.name}</option>
                                                                )
                                                            })
                                                        }
                                                </select>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                            <strong><label >City
                                                {
                                                    this.state.cities_loading?
                                                    <div className="spinner-border text-info ml-2" style={{fontSize:'10px',width:'25px',height:'25px'}} role="status">
                                                        <span className="sr-only">Loading...</span>
                                                    </div>:
                                                    ''
                                                }
                                                </label></strong>
                                                <select value={this.state.city_id || " "} onChange={this.on_select_city.bind(this)} className="form-control profile-input-box"  name="city"  title="woman">
                                                <option value=''>Select city</option>
                                                        {
                                                            this.state.cities.map((data,index)=>{
                                                                return(
                                                                    <option value={data.id} key={index}>{data.name}</option>
                                                                )
                                                            })
                                                        }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                                    <div className="form-group">
                                                    <strong><label className="control-label">Birthday</label></strong>
                                                            <div className="input-group date" id="datetimepicker1">
                                                            <input value={this.state.dob || " "} onChange={this.dob.bind(this)} className="form-control profile-input-box" type="date"></input>
                                                            </div>
                                                        </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                <strong><label className="control-label">We Are/I am</label></strong>
                                                    <select value={this.state.gender || " "} onChange={this.gender.bind(this)} className="form-control profile-input-box"  id="add-employee-gender" name="gender">
                                                        <option value="1" >Man </option>
                                                        <option value="2" > Woman</option>
                                                        <option value="3" > Wife &amp; Husband</option>
                                                        <option value="4" > Woman &amp; Man</option>
                                                        <option value="5" > family</option>
                                                        <option value="6" > father </option>
                                                        <option value="7" > mother</option>
                                                        <option value="8" > Brother</option>
                                                        <option value="9" > Sister</option> 
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                <strong><label className="control-label">Seeking</label></strong>
                                                    <select value={this.state.seeking || " "} onChange={this.seeking.bind(this)} className="form-control profile-input-box"  id="add-employee-gender" name="seeking">
                                                        <option value="1" > Man</option>
                                                        <option value="2" > Woman</option>
                                                        <option value="3" > Wife &amp; Husband</option>
                                                        <option value="4" > Woman &amp; Man</option>
                                                        <option value="5" > family</option>
                                                        <option value="6" > father </option>
                                                        <option value="7" > mother</option>
                                                        <option value="8" > Brother</option>
                                                        <option value="9" > Sister</option>                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">
                                                <button onClick={this.update_user_personel_info.bind(this)} className="btn btn-defaulf btn-block profile-btn">Update</button>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                    </div>
                    <p id="header-title">Family Members</p>
                    <p id="header-sub-title">Information about your Family</p>
                    <div className="container-fluid">
                        <div>
                            <button onClick={this.show_add_modal.bind(this)} className="btn profile-btn">Add New Family Member</button>
                        </div>
                        <div>
                            <table className="table  table-hover  mt-2 ">
                                <thead>
                                    <tr>
                                        <th>Sr.</th>
                                        <th>Family Member</th>
                                        <th>Relation</th>
                                        <th className="text-danger">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.user_relations.map((data,index)=>{
                                            return(
                                                <tr key={index} className="searched_users_div ">
                                                    <td>{index+1}</td>
                                                    <td>
                                                        <div className="row">
                                                        <img className="col-md-3" src={"/images/"+data.profile_image}></img>
                                                        <div className="col-md-9">
                                                            <h6 style={{paddingTop:'10px'}}>{data.fname} {data.lname}</h6>
                                                            <p style={{marginTop:'-10px',color:'gray'}}>@{data.username}</p>
                                                        </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {data.relation}
                                                    </td>
                                                    <td> <button  onClick={this.Delete_relation.bind(this,data.id,index)} className="btn btn-light"> <i  style={{color:'red'}} className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    {
                                        this.state.no_relations_reocrds?
                                        <tr style={{backgroundColor:'#e0e0e0'}}>
                                            <td colSpan="4" >No Family Members Records</td>
                                        </tr>
                                        :null
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <Modal show={this.state.display_add_modal}  onHide={this.on_hide_add_modal.bind(this)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add Family Member</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div id="personal_modal_div" className="container-fluid">
                                        <div className=" row col form-group">
                                            <label className=" mt-2 mr-2" style={{fontWeight:'bold',color:'black',}}>Full Name</label> 
                                            <input value={this.state.selected_user_name || " "}  type="none" required autocomplet="off"   className="form-control col-sm-6 " onChange={this.fullname.bind(this)} placeholder="Full Name"/>
                                           
                                        </div>
                                        <div>

                                        {
                                            this.state.searched_users.map((data,index)=>{
                                                return(
                                                    <div onClick={this.on_select_users.bind(this,data.id)} key={index} className="searched_users_div col-md-6 row">
                                                        <img className="col-md-3" src={"/images/"+data.profile_image}></img>
                                                        <div className="col-md-9">
                                                            <h6 style={{paddingTop:'10px'}}>{data.fname} {data.lname}</h6>
                                                            <p style={{marginTop:'-10px',color:'gray'}}>@{data.username}</p>
                                                        </div>
                                                        
                                                    </div>
                                                        )
                                                        
                                                    })
                                        }
                                        {
                                                this.state.loading?
                                                <div className="spinner-border text-info ml-2" style={{fontSize:'small'}} role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>:
                                                ''
                                            }
                                        </div>
                                        <div className=" row col form-group">
                                            <label className=" mt-2 mr-2" style={{fontWeight:'bold',color:'black'}}>Relation</label> 
                                            <select  type="name" required   className="form-control col-sm-6 " onChange={this.relation.bind(this)} placeholder="Relation">
                                                <option>--Select Relation</option>
                                                <option value="Father">Father</option>
                                                <option value="Mother">Mother</option>
                                                <option value="Brother">Brother</option>
                                                <option value="Sister">Sister</option>
                                                <option value="Grandfather">Grandfather</option>
                                                <option value="Grandfather">Grandfather</option>

                                            </select>
                                        </div>
                                        <div  className=" mt-2 row" >
                                            <h1 className="col-md-2"></h1>
                                            <label className="col-md-1 ml-1 " style={{fontWeight:'bold'}}></label> 
                                            <button onClick={this.save_relation.bind(this)}  className="btn profile-btn ml-3">Add</button>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>  
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
export default connect(mapStateToProps)(Personel);