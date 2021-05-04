import React, { Component } from 'react';
import Swal from 'sweetalert2'
import Axios from 'axios';
class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state={
            Username:'',
            Email:'',
            Password:'',
            ConfirmPassword:'',
            PassWordMatchError:false,
            EmailValitorError:false,
            EmailTakenError:false,
            UsernameError:false,
            EmptyFieldsError:false,
            loading:false,
            role:'',
            status:''

        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key2'),
            uid:this.props.match.params.id
        }
        Axios.post('/api/getuserbyid',senderdata).then(res=>{
            console.log(res);
            let data = res.data;
            this.setState({
                Username:data.username,
                Email:data.email,
                role:data.role,
                status:data.status
            })
        })
    }
    RegisterUser(e){
        if(this.state.Username !='' && this.state.Email !='' && 
        this.state.role != '' && this.state.status != ''){
            this.setState({
                EmptyFieldsError:false,
                EmailValitorError:false,
                EmailTakenError:false,
                UsernameError:false,
                PassWordMatchError:false
            })
        
            let validator = this.state.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if(validator){
            this.setState({
                EmailValitorError:false
            })
            if(this.state.Password == this.state.ConfirmPassword){
                let senderdata = {
                    name:this.state.Username,
                    email:this.state.Email,
                    role:this.state.role,
                    status:this.state.status,
                    access_token:window.localStorage.getItem('key2'),
                    uid:this.props.match.params.id
                }   
                console.log(senderdata);                 
                this.setState({
                    loading:true
                })
                e.preventDefault();
                Swal.fire({
                    title: "Updating User...",
                    text: "Please wait we are Saving User's data with high end to end enryption",
                   
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    onOpen:()=>{
                        Swal.showLoading()
                   }
                  });
                axios.post('/api/update_User',senderdata).then(res=>{

                    this.setState({
                        loading:false
                    })
                 if(res.data == 'success'){
                    this.setState({
                        UsernameError:false,
                        EmailTakenError:false
                    })
                    Swal.fire({
                        icon: 'success',
                        title: "User Registerd SuccessFully",
                        showConfirmButton: false,
                        timer: 1000
                      });
                   }else{
                    Swal.fire({
                        icon: 'error',
                        title: "Error",
                        showConfirmButton: false,
                        timer: 1000
                      });
                   }
                })
            }else{
                this.setState({
                    PassWordMatchError:true
                })
            }
           
        }else{
            this.setState({
                EmailValitorError:true
            })
        }
        }else{
            this.setState({
                EmptyFieldsError:true
            })
        }
        
    }
    handleUserName(e){
        this.setState({
            Username:e.target.value
        })
    }
    handleEmail(e){
        
        this.setState({
            Email:e.target.value
        })
    }
    handleStatus(e){
        this.setState({
            status:e.target.value
        })
    }
    handleRole(e){
        this.setState({
            role:e.target.value
        })
    }
    render() {
        return (
            <div className="admin-content-card">
                <div  style={{backgroundColor:'#c2f0fc',borderTopLeftRadius:'7px',borderTopRightRadius:'7px',padding:'3px'}}>
                    <h4 className="card-title ml-2 mt-1" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>Edit User</h4>                    
                </div>
                <div className="card-body">
                    <div className="container">
                        {
                            this.state.EmptyFieldsError?
                                <p style={{color:'red',fontSize:'small',paddingLeft:'150px'}} className="ml-3">Please Fill All The Fields</p>
                                :
                                ''
                        }
                        <div className=" row col form-group">
                            <label className=" mt-2" style={{fontWeight:'bold'}}>UserName</label> 
                            <input disabled  value={this.state.Username || ""} type="name" required   className="form-control col-sm-6 " onChange={this.handleUserName.bind(this)} placeholder="Enter  User Name"/>
                        </div>
                        <div className=" row col form-group">
                            <label className=" mt-2" style={{fontWeight:'bold'}}>Email</label> 
                            <input disabled value={this.state.Email || ""} type="name" required   className="form-control col-sm-6 " onChange={this.handleEmail.bind(this)} placeholder="Enter  Email"/>

                        </div>
                        <div className=" row col form-group">
                            <label className=" mt-2" style={{fontWeight:'bold'}}>Role</label> 
                            <select  value={this.state.role || "0"} type="name" required   className="form-control col-sm-6 " onChange={this.handleRole.bind(this)} placeholder="Enter  User Name">
                                <option vlaue="">--Select Role--</option>
                                <option value="0">User</option>
                                <option value="1">Administrator</option>
                            </select>
                        </div>
                        <div className=" row col form-group">
                            <label className=" mt-2" style={{fontWeight:'bold'}}>Status</label> 
                            <select value={this.state.status || "0"} type="name" required   className="form-control col-sm-6 " onChange={this.handleStatus.bind(this)} placeholder="Enter  User Name">
                                <option vlaue="">--Select Status--</option>
                                <option value="0">Blocked</option>
                                <option value="1">Active</option>
                            </select>
                        </div>
                        <div>
                            <label className=" mt-2" style={{fontWeight:'bold'}}></label> 
                            <button onClick={this.RegisterUser.bind(this)} className="btn btn-info ">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddUser;