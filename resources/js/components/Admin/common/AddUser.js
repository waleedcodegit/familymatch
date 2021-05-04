import React, { Component } from 'react';
import Swal from 'sweetalert2'
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
            role:''

        }
    }
    RegisterUser(e){
        if(this.state.Username !='' && this.state.Email !='' && this.state.Password !='' && this.state.ConfirmPassword !='' && 
        this.state.role != ''){
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
                    password:this.state.Password,
                    role:this.state.role
                }                    
                this.setState({
                    loading:true
                })
                e.preventDefault();
                Swal.fire({
                    title: "Registering User...",
                    text: "Please wait we are Saving User's data with high end to end enryption",
                   
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    onOpen:()=>{
                        Swal.showLoading()
                   }
                  });
                axios.post('/api/registerUserbyadmin',senderdata).then(res=>{

                    this.setState({
                        loading:false
                    })
                   if(res.data == 1){
                       this.setState({
                           EmailTakenError:true
                       })
                       Swal.fire({
                        icon: 'error',
                        title: "Email Exist Already",
                        showConfirmButton: false,
                        timer: 1000
                      });
                   }else if(res.data == 2){
                    this.setState({
                        UsernameError:true
                    })
                    Swal.fire({
                        icon: 'error',
                        title: "UserName Exists Already",
                        showConfirmButton: false,
                        timer: 1000
                      });
                   }else if(res.data[0] == 'success'){
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
                      this.props.history.push('/adminpanel/NewUser');
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
    handlePassword(e){
        this.setState({
            Password:e.target.value
        })
    }
    handleConfirmPassword(e){
        this.setState({
            ConfirmPassword:e.target.value
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
                    <h4 className="card-title ml-2 mt-1" style={{color: '#107595',backgroundColor:'#c2f0fc'}}>Add New User</h4>                    
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
                            <input type="name" required   className="form-control col-sm-6 " onChange={this.handleUserName.bind(this)} placeholder="Enter  User Name"/>
                            {
                                                this.state.UsernameError?
                                                <p style={{color:'red',fontSize:'small',paddingLeft:'150px'}} className="ml-3">This Username is already taken</p>
                                                :
                                                ''
                            }
                        </div>
                        <div className=" row col form-group">
                            <label className=" mt-2" style={{fontWeight:'bold'}}>Email</label> 
                            <input type="name" required   className="form-control col-sm-6 " onChange={this.handleEmail.bind(this)} placeholder="Enter  Email"/>
                            {
                                                this.state.EmailTakenError?
                                                <p style={{color:'red',fontSize:'small',paddingLeft:'150px'}} className="ml-3">This Email is already taken</p>
                                                :
                                                ''
                            }
                            {
                                                this.state.EmailValitorError?
                                                <p style={{color:'red',fontSize:'small',paddingLeft:'150px'}} className="ml-3">Enter a Valid Email</p>
                                                :
                                                ''
                            }
                        </div>
                        <div className=" row col form-group">
                            <label className=" mt-2" style={{fontWeight:'bold'}}>Password</label> 
                            <input type="name" required   className="form-control col-sm-6 " onChange={this.handlePassword.bind(this)} placeholder="Enter  Password"/>
                        </div>
                        <div className=" row col form-group">
                            <label className=" mt-2" style={{fontWeight:'bold'}}>Confirm Password</label> 
                            <input type="name" required   className="form-control col-sm-6 " onChange={this.handleConfirmPassword.bind(this)} placeholder="Confirm Password"/>
                            {
                                                this.state.PassWordMatchError?
                                                <p style={{color:'red',fontSize:'small',paddingLeft:'150px'}} className="ml-3">Password does not match</p>
                                                :
                                                ''
                            }
                        </div>
                        <div className=" row col form-group">
                            <label className=" mt-2" style={{fontWeight:'bold'}}>Role</label> 
                            <select type="name" required   className="form-control col-sm-6 " onChange={this.handleRole.bind(this)} placeholder="Enter  User Name">
                                <option vlaue="">--Select Role--</option>
                                <option value="0">User</option>
                                <option value="1">Administrator</option>
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