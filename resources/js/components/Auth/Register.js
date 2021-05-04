import React, { Component } from 'react';
import AuthNavBar from './AuthNavBar'
import { Link } from 'react-router-dom';
import axios from 'axios'
import Footer from '../Footer'
import Swal from 'sweetalert2'

class Register extends Component {
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
            loading:false

        }
    }
    componentDidMount(){
        this.CheckAuthorization();
    }
    CheckAuthorization () {
        let user =  window.localStorage.getItem('key1');
        let senderdata = {
            user:user
        }
        let res;
        axios.post('/api/check_authentication',senderdata).then(res=>{
         if(res.data != 0){
             this.props.history.push('/profile/my');
         }
        })
     }
    RegisterUser(e){
        if(this.state.Username !='' && this.state.Email !='' && this.state.Password !='' && this.state.ConfirmPassword !=''){
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
                }                    
                this.setState({
                    loading:true
                })
                e.preventDefault();
                // Swal.fire({
                //     position: 'top-end',
                //     icon: 'success',
                //     title: 'Your work has been saved',
                //     showConfirmButton: false,
                //     timer: 1500,
                //     onOpen:()=>{
                //         Swal.showLoading()
                //     }
                    
                //   })
                Swal.fire({
                    title: "Registering You...",
                    text: "Please wait we are Saving Your data with high end to end enryption",
                   
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    onOpen:()=>{
                        Swal.showLoading()
                   }
                  });
                axios.post('/api/registerUser',senderdata).then(res=>{
                    Swal.fire({
                        icon: 'success',
                        title: "Registerd SuccessFully!",
                        showConfirmButton: false,
                        timer: 1000
                      });
                    this.setState({
                        loading:false
                    })
                   if(res.data == 1){
                       this.setState({
                           EmailTakenError:true
                       })
                   }else if(res.data == 2){
                    this.setState({
                        UsernameError:true
                    })
                   }else if(res.data[0] == 'success'){
                    this.setState({
                        UsernameError:false,
                        EmailTakenError:false
                    })
                    window.sessionStorage.setItem('reg_flag',1);
                    window.localStorage.setItem('$op24$filijdj',res.data[1])
                    this.props.history.push('/VerifyEmail');
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
    render() {
        return (
            <div>
                <div>
                    <AuthNavBar/>
                </div>
                <div className="container ">
                    <div className="LoginPageContent">
                        <h1 style={{color:'#ffffff'}}>Family</h1>
                        <div className="row ">
                            <div className="col-lg-10 col-xl-9 mx-auto ">
                                <div style={{borderRadius:'25px'}} className="card card-signin flex-row my-5 logincardReg ">
                                    <div className="card-img-left d-none d-md-flex">
                                    </div>
                                    <div className="card-body ">
                                        <h5 className="card-title text-center">Register</h5>
                                        <form className="form-signin">
                                            {
                                                this.state.EmptyFieldsError?
                                                <p style={{color:'red',fontSize:'small'}} className="ml-3">Please Fill All The Fields</p>
                                                :
                                                ''
                                            }
                                        <div className="form-label-group">
                                            <input type="text" id="inputUserame" onChange={this.handleUserName.bind(this)} className="form-control" placeholder="Username" required />
                                            <label htmlFor="inputUserame">Username</label>
                                            {
                                                this.state.UsernameError?
                                                <p style={{color:'red',fontSize:'small'}} className="ml-3">This Username is already taken</p>
                                                :
                                                ''
                                            }
                                        </div>

                                        <div className="form-label-group">
                                            <input type="email" id="inputEmail" onChange={this.handleEmail.bind(this)}  className="form-control" placeholder="Email address" required/>
                                            <label htmlFor="inputEmail">Email address</label>
                                            {
                                                this.state.EmailTakenError?
                                                <p style={{color:'red',fontSize:'small'}} className="ml-3">This Email is already taken</p>
                                                :
                                                ''
                                            }
                                            {
                                                this.state.EmailValitorError?
                                                <p style={{color:'red',fontSize:'small'}} className="ml-3">Enter a Valid Email</p>
                                                :
                                                ''
                                            }
                                        </div>
                                        
                                        <hr/>

                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" onChange={this.handlePassword.bind(this)}  className="form-control" placeholder="Password" required/>
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        
                                        <div className="form-label-group">
                                            <input type="password" id="inputConfirmPassword" onChange={this.handleConfirmPassword.bind(this)}  className="form-control" placeholder="Password" required/>
                                            <label htmlFor="inputConfirmPassword">Confirm password</label>
                                            {
                                                this.state.PassWordMatchError?
                                                <p style={{color:'red',fontSize:'small'}} className="ml-3">Password does not match</p>
                                                :
                                                ''
                                            }
                                        </div>
                                        </form>
                                        <button onClick={this.RegisterUser.bind(this)} style={{backgroundColor:'#ff427f',color:'#ffffff'}} className="btn btn-lg  btn-block text-uppercase" type="submit">Register
                                            {
                                                this.state.loading?
                                                <div className="spinner-border text-light ml-2" style={{fontSize:'small'}} role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>:
                                                ''
                                            }
                                        </button>
                                        <Link className="d-block text-center mt-2 small" to={'/login'}>Sign In</Link>
                                        <div >
                                        <hr className="my-4"/>
                                        <button style={{backgroundColor:'#ea4335',color:'#ffffff'}} className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign up with Google</button>
                                        <button style={{backgroundColor:'#3b5998',color:'#ffffff'}} className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign up with Facebook</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>   
                </div>
                <Footer></Footer>
            </div>
        );
    }
}

export default Register;