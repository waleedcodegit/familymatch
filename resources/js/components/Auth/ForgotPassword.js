import React, { Component } from 'react';
import AuthNavBar from './AuthNavBar'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from '../Footer'
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
           
            Email:'',
            Password:'',
            EmptyFieldsError:false,
            code:'',
            id:'',
            p1:0,
            p2:0,
            ResetLinkExpires:false
        }
       
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.id !== prevState.id){
          return { id: nextProps.id};
       } 
       else {
          return null;
       }
     }
     
     componentDidUpdate(prevProps, prevState) {
       if(prevProps.id !== this.state.id){
          //fetchnewProduct and set state to reload
       }
     }
    handlenewpassword(e){
        this.setState({
            p1:e.target.value
        })
    }
    handleconfirmpassword(e){
        this.setState({
            p2:e.target.value
        })
    }
    ResetPassword(e){
        e.preventDefault();
        if(this.state.p1 !=0 && this.state.p2 !=0){
            this.setState({
                EmptyFieldsError:false,
                ResetLinkExpires:false
            })
           let senderdata={
               id:this.props.match.params.id,
               p:this.state.p1,
             
           }
           axios.post('/api/UserPasswordReset',senderdata).then(res=>{
               if(res.data==0){
                   this.setState({
                    ResetLinkExpires:true
                   })
               }else{
                this.props.history.push('/profile/my/');
               }
           })

        }else{
            this.setState({
                EmptyFieldsError:true
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
                    <div className="LoginPageContent">
                        <h1 style={{color:'#ffffff'}}>Family Match</h1>
                    <div className="container logincard">
                    <div className="row no-gutter">
                        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image3"></div>
                        <div className="col-md-8 col-lg-6">
                        <div className="login d-flex  py-5">
                            <div className="container">
                            <div className="row">
                                <div className="col-md-9 col-lg-8 mx-auto">
                                <h3 className="login-heading2 mb-4" style={{fontWeight:'bold'}}>Reset Your Passowrd</h3>
                                <h3 className="login-heading mb-4">Enter The New Password</h3>
                                <form>
                                    {
                                        this.state.EmptyFieldsError?
                                        <p style={{color:'red',fontSize:'small'}} className="ml-3">Please Enter The New Password</p>
                                        :
                                        ''
                                    }
                                     {
                                        this.state.ResetLinkExpires?
                                        <p style={{color:'red',fontSize:'small'}} className="ml-3">This Password Reset Link Is Expires</p>
                                        :
                                        ''
                                    }
                                    <div className="form-label-group">
                                    <input type="password" id="inputPassword" onChange={this.handlenewpassword.bind(this)} className="form-control" placeholder="Password" required/>
                                    <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    <div className="form-label-group">
                                    <input type="password" id="inputEmail1" onChange={this.handleconfirmpassword.bind(this)} className="form-control" placeholder="Verification Code" required/>
                                    <label htmlFor="inputEmail1">Confirm Password</label>
                                    </div>
                                    <button style={{backgroundColor:'#ff427f',color:'#ffffff'}}
                                     onClick={this.ResetPassword.bind(this)} 
                                     className="btn btn-lg btn-block " >Reset My Password</button>
                                    
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
export default ForgotPassword;