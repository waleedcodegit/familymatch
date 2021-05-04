import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import { isNull } from 'lodash';
// import './setup.css'


class Start extends Component { 
    constructor(props) {
        super(props);
        this.state={
            display_state:0,
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
            childrens:'',
            single_parent:'',
            uid:this.props.user.uid
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            uid:this.state.uid
        }
        Axios.post('/api/get_setup',senderdata).then(res=>{
            let display_state = 0;
            if(isNull( res.data[0].interested_id)){
                display_state = 1;
            }else if(isNull(res.data[0].learnabout_id )){
                display_state = 2;
            }else if(isNull(res.data[0].childrens )){
                display_state = 3;
            }else if(isNull(res.data[0].single_parent )){
                display_state = 4;
            }else{
                display_state = 5;
            }
            this.setState({
                display_state:display_state
            })
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
                },function(){
                   this.save_setup();
                })
            }else{
                data.check = 0;
            }
        })
        this.setState({
            interested:exer

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
            
        })
    }
    interested_continue(){
        this.setState({
            display_state:2
        })
    }
    learnabout_continue(){
        this.setState({
            display_state:3
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
                },function(){
                   this.save_setup();
                })
            }else{
                data.check = 0;
            }
        })
        this.setState({
            learnabout:exer
        }) 
    }
    children_continue(){
        this.save_setup();
        this.setState({
            display_state:4
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
    single_parent_continue(){
        this.save_setup();
        this.props.history.push('/profile/my');
    }
    render() {
        return (
            <div>
                {
                    this.state.display_state == 1 ?
                    <div className="w3-container w3-center w3-animate-right ">
                    <div className="container right_to_left">
                        <div id="finalcidofproject" className="">
                            <div id="jdiv" className="">
                                <div >
                                    <div className="slidewrapper col-md-6 col-md-offset-3">
                                        <form>
                                            <div id="why_interested" className="">
                                                <div id="interested-form">
                                                    <p>Why are you interested in FamilyMatch?</p>
                                                    <input type="hidden" autoComplete="off" name="question" value="1" />
                                                    <input type="hidden" autoComplete="off" name="order" value="1" />
                                                    <span>
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
                                                    </span>
                                                    <br />
                                                    <br />
                                                    <button onClick={this.interested_continue.bind(this)} type="submit" className="btn btn-default btn-block continue-btn">
                                                        Click to Continue
                                                        <i className="fa fa-arrow-right ml-2" aria-hidden="true">
                                                        </i>
                                                    </button>
                                                </div>

                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                :
                null
                }

                {
                    this.state.display_state == 2 ? 
                    <div className="container right_to_left">
                    <div id="finalcidofproject" className="">
                        <div id="jdiv" className="">
                            <div>
                                <div className="slidewrapper col-md-6 col-md-offset-3">
                                    <form>
                                        <div className="">
                                            <div id="interested-form">
                                                <p>How did you learn about FamilyMatch?</p>
                                                <input type="hidden" autoComplete="off" name="question" value="2" />
                                                <input type="hidden" autoComplete="off" name="order" value="2" />
                                                <span>
                                                {
                                                            this.state.learnabout.map((data,index)=>{
                                                                return(
                                                                    <div key={index} >
                                                                        <div className="radio">
                                                                            <label >
                                                                                <input  onChange={this.learnabout.bind(this,index)} type="radio" name="learnabout" checked={data.check == 1}/>
                                                                                {data.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )

                                                            })
                                                        }  
                                                </span>
                                                <br />
                                                <br />
                                                <button onClick={this.learnabout_continue.bind(this)} type="submit" className="btn btn-default btn-block continue-btn">
                                                    Click to Continue
                                                                                                            <i className="fa fa-arrow-right" aria-hidden="true">
                                                    </i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
                :
                null
                }


                {
                    this.state.display_state == 3 ?
                    <div className="container right_to_left">
                    <div id="finalcidofproject" className="">
                        <div id="jdiv" className="">
                            <div>
                                <div className="slidewrapper col-md-6 col-md-offset-3">
                                    <form><div className="">
                                        <div id="interested-form">
                                            <p>How many children do you have?</p>
                                            <input type="hidden"  name="question" value="10" />
                                            <input type="hidden" name="order" value="3" />
                                            <input onChange={this.childrens.bind(this)} className="form-control" name="options" />
                                            <br /><br />
                                            <button onClick={this.children_continue.bind(this)} type="submit" className="btn btn-default btn-block continue-btn">
                                                Click to continue
                                               <i className="fa fa-arrow-right" aria-hidden="true">
                                                </i>
                                            </button>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                null
                }
               

                {
                    this.state.display_state == 4 ?
                    <div className="container right_to_left">
                    <div id="finalcidofproject" className="">
                        <div id="jdiv" className="">
                            <div>

                                <div className="slidewrapper col-md-6 col-md-offset-3">
                                    <form>
                                        <div className="">
                                            <div id="interested-form">
                                                <p>Are you a single parent?</p>
                                                <input type="hidden" autoComplete="off" name="question" value="4" />
                                                <input type="hidden" autoComplete="off" name="order" value="4" />
                                                <input onChange={this.single_parent.bind(this)} className="form-control" name="options" />
                                                <br />
                                                <br />
                                                <button onClick={this.single_parent_continue.bind(this)} type="submit" className="btn btn-default btn-block continue-btn">
                                                    Click to continue
                                                    <i className="fa fa-arrow-right" aria-hidden="true">
                                                    </i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                null
                }

                {
                    this.state.display_state == 5 ?
                    <div className="container">
                        <div id="finalcidofproject" className="">
                            <div id="jdiv" className="">
                                <div>
                                    <div className="slidewrapper col-md-6 col-md-offset-3">
                                        <form>
                                            <div className="">
                                                <div id="interested-form">
                                                    <p> Your Setup is Completed</p>
                                                    {/* <input type="hidden" autoComplete="off" name="question" value="51" />
                                                    <input type="hidden" autoComplete="off" name="order" value="5" /> */}
                                                    <span>
                                                    </span>
                                                    <br />
                                                    <br />
                                                    <Link to="/profile/my/">
                                                        <button type="submit" className="btn btn-default btn-block continue-btn">
                                                            Click to continue
                                                                <i className="fa fa-arrow-right" aria-hidden="true">
                                                            </i>
                                                        </button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                :null
                }
                

                {/*
                <div className="container">
                    <div id="finalcidofproject" className="">
                        <div id="jdiv" className="">
                            <div>
                                <div className="slidewrapper col-md-6 col-md-offset-3">
                                    <form><div className="">
                                        <div id="interested-form">
                                            <p>Which ethnicities best describes your family?</p>
                                            <input type="hidden" autoComplete="off" name="question" value="51"/>
                                                <input type="hidden" autoComplete="off" name="order" value="5"/>
                                                    <span>
                                                        </span>
                                               <br/>
                                               <br/>
                                               <button type="submit" className="btn btn-default btn-block continue-btn">
                                                 Click to Continue  
                                                 <i className="fa fa-arrow-right" aria-hidden="true">
                                                     </i>
                                                     </button>
                                                     </div>
                                                     </div>
                                                     </form>
                                                     </div>
                                                     </div>
                                                     </div>
                                                     </div>
                                                     </div> */}

            </div>


        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Start);