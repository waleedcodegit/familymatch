import React, { Component } from 'react';
import '../user.css'
import {connect} from 'react-redux';
import Axios from 'axios';
import Swal from 'sweetalert2'
import { expr } from 'jquery';

class Health extends Component {
    constructor(props) {
        super(props);
        this.state={
            smoke:[
                {
                    check:0,
                    name:'No way'},
                {
                    check:0,
                    name:'Occasionally'},
                {
                    check:0,
                    name:'Daily'},
                {
                    check:0,
                    name:'Cigar aficionado'},
                {
                    check:0,
                    name:'Yes but trying to quit'},
            ],
            drink:[
                {
                    check:0,
                    name:'Never'},
                {
                    check:0,
                    name:'Social Drinker'},
                {
                    check:0,
                    name:'Regularly'},
                {
                    check:0,
                    name:'Moderately'} 
            ],
            exercise:[
                {
                    check:0,
                    name:'Never'},
                { check:0,
                    name:'2 times per week'},
                { check:0,
                    name:'3 times per week'},
                {check:0,
                    name:'5 or more times per week'}
            ],
            sender_smoke_data:[],
            sender_drik_data:[] ,
            sender_exercise_data:[],
            uid:this.props.user.uid  

  
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1')
        }
        axios.post('/api/get_healths/'+this.state.uid,senderdata).then(res=>{
            let data = res.data[0];
            let smokedata = this.state.smoke;
            let drinksdata = this.state.drink;
            let exercisedata = this.state.exercise;
            smokedata[0].check = data.hs_No_way;
            smokedata[1].check = data.hs_Occasionally;
            smokedata[2].check = data.hs_Daily;
            smokedata[3].check = data.hs_Cigar_aficionado;
            smokedata[4].check = data.hs_Yes_but_trying_to_quit;

            drinksdata[0].check = data.hd_Never;
            drinksdata[1].check = data.hd_Social_Drinker;
            drinksdata[2].check = data.hd_Regularly;
            drinksdata[3].check = data.hd_Moderately;

            exercisedata[0].check = data.he_Never;
            exercisedata[1].check = data.he_2_times_per_week;
            exercisedata[2].check = data.he_3_times_per_week;
            exercisedata[3].check = data.he_5_or_more_times_per_week;
            this.setState({
                smoke : smokedata,
                
            })

        })
    }
    smoke(id){
        let exer = this.state.smoke;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            smoke:exer
        })
    }
    Drink(id){
        let exer = this.state.drink;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            drink:exer
        })
    }
    Exercise(id){
        let exer = this.state.exercise;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            exercise:exer
        })
    }
    savehealths(e){
        e.preventDefault();
        
                let senderdata = {
                    smokes:this.state.smoke,
                    drinks:this.state.drink,
                    exercise:this.state.exercise,
                    uid:this.state.uid,
                    access_token:window.localStorage.getItem('key1')
                }
                Axios.post('/api/healths',senderdata).then(res=>{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your Health Answers Updated SuccessFully',
                        showConfirmButton: false,
                        timer: 1300
                      })
                })
            
       
    }
    render() {
        return (
            <div id="about-me-content">
                <br/>
                <h5>Smoke</h5>
                <br/>
             <div className="row">
                 {
                     this.state.smoke.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.smoke.bind(this,index)} type="radio" name="smoke" checked={data.check == 1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )

                     })
                 }
             </div>
                <br/>
                <h5>Drink</h5>
                <br/>
                <div className="row">
                {
                     this.state.drink.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.Drink.bind(this,index)} type="radio" name="Drink" checked={data.check == 1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )

                     })
                 }
                       
                </div>
               <br/>
               
                <br/>
                <h5>Exercise</h5>

               <br/>
               <div className="row">    
                    {
                        this.state.exercise.map((data,index)=>{
                            return(
                                <div key={index} className="col-md-6">
                                    <div className="radio">
                                        <label>
                                            <input onChange={this.Exercise.bind(this,index)} type="radio" name="Exercise" checked={data.check == 1} />
                                            {data.name}
                                        </label>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
                <button onClick={this.savehealths.bind(this)} className="btn save-btn">Save</button>
               <br/> 
            </div>
            
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Health);