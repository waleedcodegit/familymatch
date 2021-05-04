import React, { Component } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2'
import {connect} from 'react-redux';

class Looks extends Component {
    constructor(props) {
        super(props);
        this.state={
            body_types:[
                {check:0,name:' Slender'},
                {check:0,name:' Big and beautiful'},
                {check:0,name:' Curvy'},
                {check:0,name:' About average'},
                {check:0,name:' Athletic and toned'},
                {check:0,name:' Full figured'},
                {check:0,name:' Heavyset'},
                {check:0,name:' Stocky'},

            ],
            hair_color:[
                {check:0,name:' Auburn Red'},
                {check:0,name:' Black'},
                {check:0,name:' Light brown'},
                {check:0,name:' Dark brown'},
                {check:0,name:' Blonde'},
                {check:0,name:' Salt and pepper'},
                {check:0,name:' Silver'},
                {check:0,name:' Dark blonde'},
                {check:0,name:' Grey'},
                {check:0,name:' Platinum'},
                {check:0,name:' Bald'},
            ],
            eye_colors:[
                {check:0,name:' Black'},
                {check:0,name:' Blue'},
                {check:0,name:' Brown'},
                {check:0,name:' Grey'},
                {check:0,name:' Green'},
                {check:0,name:' Hazel'},
            ],
            uid:this.props.user.uid
        }
    }
    body_types(id){
        let exer = this.state.body_types;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            body_types:exer
        }) 
    }
    hair_color(id){
        let exer = this.state.hair_color;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            hair_color:exer
        }) 
    }
    eye_colors(id){
        let exer = this.state.eye_colors;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            eye_colors:exer
        }) 
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/get_looks/'+this.state.uid,senderdata).then(res=>{
            let body = this.state.body_types;
            let hair = this.state.hair_color;
            let eye = this.state.eye_colors
            let data = res.data[0];
            body[0].check = data.lb_Slender
            body[1].check = data.lb_Big_and_beautiful
            body[2].check = data.lb_Curvy
            body[3].check = data.lb_About_average
            body[4].check = data.lb_Athletic_and_toned
            body[5].check = data.lb_Full_figured
            body[6].check = data.lb_Heavyset
            body[7].check = data.lb_Heavyset
            hair[0].check = data.lh_Auburn_Red
            hair[1].check = data.lh_Black
            hair[2].check = data.lh_Light_brown
            hair[3].check = data.lh_Dark_brown
            hair[4].check = data.lh_Blonde
            hair[5].check = data.lh_Salt_and_pepper
            hair[6].check = data.lh_Silver
            hair[7].check = data.lh_Dark_blonde
            hair[8].check = data.lh_Grey
            hair[9].check = data.lh_Platinum
            hair[10].check = data.lh_Bald
            eye[0].check = data.le_Black
            eye[1].check = data.le_Blue
            eye[2].check = data.le_Brown
            eye[3].check = data.le_Grey
            eye[4].check = data.le_Green
            eye[5].check = data.le_Hazel
            this.setState({
                body_types:body,
                hair_color:hair,
                eye_colors:eye
            })

        })
    }
    Looks(e){
        e.preventDefault();
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            bodytypes:this.state.body_types,
            haircolor:this.state.hair_color,
            eyecolor:this.state.eye_colors,
            uid:this.state.uid
        }
        Axios.post('/api/looks',senderdata).then(res=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your Looks Answers Updated SuccessFully',
                showConfirmButton: false,
                timer: 1300
              })
        })
    }
    render() {
        return (
            <div id="about-me-content">
                <br/>
                <h5>Body Types</h5>
                <br/>
                <div  className="row">
                    {
                        this.state.body_types.map((data,index)=>{
                            return(
                                <div key={index} className="col-md-6">
                                    <div className="radio">
                                        <label>
                                            <input onChange={this.body_types.bind(this,index)} type="radio" name="body" checked={data.check == 1}/>
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
                <br/>
                <h5>Hair Color</h5>
                <br/>
                <div  className="row">
                    {
                        this.state.hair_color.map((data,index)=>{
                            return(
                                <div key={index} className="col-md-6">
                                    <div className="radio">
                                        <label>
                                            <input onChange={this.hair_color.bind(this,index)} type="radio" name="hair" checked={data.check == 1}/>
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
                <br/>
                <h5>Eye Color</h5>
                <br/>
                <div  className="row">
                    {
                        this.state.eye_colors.map((data,index)=>{
                            return(
                                <div key={index} className="col-md-6">
                                    <div className="radio">
                                        <label>
                                            <input onChange={this.eye_colors.bind(this,index)} type="radio" name="eye" checked={data.check == 1}/>
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
                <br/>
                    <button onClick={this.Looks.bind(this)} className="btn save-btn">Save</button>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default  connect(mapStateToProps)(Looks);