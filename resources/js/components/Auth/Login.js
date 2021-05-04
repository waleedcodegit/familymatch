import React, { Component } from 'react';
import AuthNavBar from './AuthNavBar'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer'
class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
           
            Email:'',
            Password:'',
            EmailValitorError:false,
            EmptyFieldsError:false,
            InavlidEmailorPassword:false,
            loading:false,
            EmailNotFound:false,
            loading1:false
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
             this.props.history.push('/profile/my/');
         }
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
    UserLogin(e){
        e.preventDefault();
        if(this.state.Email !='' && this.state.Password !=''){
            this.setState({
                EmptyFieldsError:false
            })
            let validator = this.state.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if(validator){
                this.setState({
                    EmailValitorError:false,
                    loading:true
                })
                let senderdata = {
                    email:this.state.Email,
                    password:this.state.Password,
                }    
                axios.post('/api/LoginUser',senderdata).then(res=>{
                    this.setState({
                        loading:false
                    })
                    if(res.data == '0'){
                        this.setState({
                            InavlidEmailorPassword:true,
                        })
                    }else{
                       
                        if(res.data.email_verified_at == null){
                            window.localStorage.setItem('key1',res.data.access_token);
                            this.props.history.push('/VerifyEmail');
                        }else{
                            window.localStorage.setItem('key1',res.data.access_token);
                            this.props.history.push('/profile/my');
                        }                        
                    }
                })
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
    ForgotPassword(){
        if(this.state.Email !=''){
            this.setState({
                EmailValitorError:false
            })
            let validator = this.state.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            if(validator){
                let senderdata = {
                    email:this.state.Email
                }
                this.setState({
                    loading1:true
                })
                axios.post('/api/ForgotPassword',senderdata).then(res=>{
                    this.setState({
                        loading1:false
                    })
                    if(res.data !=0){
                        this.props.history.push('/ResetPassword/'+res.data);
                    }else{
                        this.setState({
                            EmailValitorError:true
                        })
                    }
                })
            }else{
                this.setState({
                    EmailValitorError:true
                })
            }
        }else{
            this.setState({
                EmailValitorError:true
            })
        }
    }
    render() {
        return (
            <div>
                <div>
                    <AuthNavBar/>
                </div>
                <div >
                    <div className="LoginPageContent p-5">
                        <h1 style={{color:'#ffffff'}}>Family Match</h1>
                    <div className="container logincard">
                    <div className="row no-gutter">
                        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
                        <div className="col-md-8 col-lg-6">
                        <div className="login d-flex mt-2">
                            <div className="container login-container" >
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                <h3 className="login-heading mb-4">Welcome back!</h3>
                                <form>
                                    {
                                        this.state.EmptyFieldsError?
                                        <p style={{color:'red',fontSize:'small'}} className="ml-3">Please Fill All The Fields</p>
                                        :
                                        ''
                                    }
                                    <div className="form-label-group">
                                    <input type="email" id="inputEmail" onChange={this.handleEmail.bind(this)} className="form-control" placeholder="Email address" required/>
                                    <label htmlFor="inputEmail">Email address</label>
                                    {
                                        this.state.EmailValitorError?
                                        <p style={{color:'red',fontSize:'small'}} className="ml-3">Enter a Valid Email</p>
                                        :
                                        ''
                                    }
                                    {
                                        this.state.EmailNotFound?
                                        <p style={{color:'red',fontSize:'small'}} className="ml-3">Email Not Found</p>
                                        :
                                        ''
                                    }
                                    </div>

                                    <div className="form-label-group">
                                    <input type="password" id="inputPassword" onChange={this.handlePassword.bind(this)} className="form-control" placeholder="Password" required/>
                                    <label htmlFor="inputPassword">Password</label>
                                    {
                                        this.state.InavlidEmailorPassword?
                                        <p style={{color:'red',fontSize:'small'}} className="ml-3">You Entered Invalid Email or Password.</p>
                                        :
                                        ''
                                    }
                                    </div>

                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                    </div>
                                    <button style={{backgroundColor:'#ff427f',color:'#ffffff'}}
                                        onClick={this.UserLogin.bind(this)} 
                                        className="btn btn-lg btn-block " >Sign in
                                        {
                                                this.state.loading?
                                                    <div className="spinner-border text-light ml-2" style={{fontSize:'small'}} role="status">
                                                    <span className="sr-only">Loading...</span>
                                                    </div>
                                                :
                                                    ''
                                        }
                                    </button>
                                    <div className="text-center">
                                    <a className="small" href="#"><span type="link" onClick={this.ForgotPassword.bind(this)}>Forgot password
                                    </span> {
                                                this.state.loading1?
                                                    <div className="spinner-border text-dark ml-2" style={{width:'15px',height:'15px'}} role="status">
                                                    <span className="sr-only">Loading...</span>
                                                    </div>
                                                :
                                                    ''
                                    }</a>
                                    </div>
                                    <div className="text-center">
                                    <p className="small">Not Registerd Yet?<span><Link to={'/Register'}>Register Now</Link> </span></p>
                                    </div>
                                </form>
                                </div>
                            </div>
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

export default Login;