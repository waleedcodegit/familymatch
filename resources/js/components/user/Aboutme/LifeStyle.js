import React, { Component } from 'react';
import '../user.css'
import {connect} from 'react-redux';
import Axios from 'axios';
import Swal from 'sweetalert2'

class LifeStyle extends Component {
    constructor(props) {
        super(props);
        this.state={
            faith:[
                {check:0,name:'Agnostic'},
                {check:0,name:'Atheist'},
                {check:0,name:'Buddhist Taoist'},
                {check:0,name:'Christian Catholic'},
                {check:0,name:'Christian LDS'},
                {check:0,name:'Christian Protestant'},
                {check:0,name:'Hindu'},
                {check:0,name:'Jewish'},
                {check:0,name:'Muslim Islam'},
                {check:0,name:'Spiritual but not religious'},
            ],
            occupation:[
                {check:0,name:'Administrative Secretarial'},
                {check:0,name:'Artistic Creative Performance'},
                {check:0,name:'Executive Management'},
                {check:0,name:'AgnoFinancial Accounting Real Estatestic'},
                {check:0,name:'Labor Construction'},
                {check:0,name:'Legal'},
                {check:0,name:'Medical Dental Veterinary Fitness'},
                {check:0,name:'Political Govt Civil Service Military'},
                {check:0,name:'Retail Food services'},
                {check:0,name:'Retired'},
                {check:0,name:'Sales Marketing'},
                {check:0,name:'AgnoSelf Employed Entrepreneurstic'},
                {check:0,name:'Student'},
                {check:0,name:'Education Teacher Professor'},
                {check:0,name:'Technical Science Computers Engineering'},
                {check:0,name:'Travel Hospitality Transportation'},
                {check:0,name:'Nonprofit Volunteer Activist'},
                {check:0,name:'Law enforcement Security Military'},
                {check:0,name:'Fashion Model Beauty'},
                {check:0,name:'Architecture Interior design'},
            ],
            uid:this.props.user.uid
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/get_lifestyles/'+this.state.uid,senderdata).then(res=>{
            let faith = this.state.faith;
            let occupation = this.state.occupation;
            let data = res.data[0];
            faith[0].check = data.sf_Agnostic;
            faith[1].check = data.sf_Atheist;
            faith[2].check = data.sf_Buddhist_Taoist;
            faith[3].check = data.sf_Christian_Catholic;
            faith[4].check = data.sf_Christian_LDS;
            faith[5].check = data.sf_Christian_Protestant;
            faith[6].check = data.sf_Hindu;
            faith[7].check = data.sf_Jewish;
            faith[8].check = data.sf_Muslim_Islam;
            faith[9].check = data.sf_Spiritual_but_not_religious;
            occupation[0].check = data.so_Administrative_Secretarial;
            occupation[1].check = data.so_Artistic_Creative_Performance;
            occupation[2].check = data.so_Executive_Management;
            occupation[3].check = data.so_Financial_Accounting_Real;
            occupation[4].check = data.so_Labor_Construction;
            occupation[5].check = data.so_Legal;
            occupation[6].check = data.so_Medical_Dental_Veterinary_Fitness;
            occupation[7].check = data.so_Political_Govt_Civil;
            occupation[8].check = data.so_Retail_Food_services;
            occupation[9].check = data.so_Retired;
            occupation[10].check = data.so_Sales_Marketing;
            occupation[11].check = data.so_Self_Employed_Entrepreneur;
            occupation[12].check = data.so_Student;
            occupation[13].check = data.so_Education_Teacher_Professor;
            occupation[14].check = data.so_Technical_Science_Computers_Engineering;
            occupation[15].check = data.so_Travel_Hospitality_Transportation;
            occupation[16].check = data.so_Nonprofit_Volunteer_Activist;
            occupation[17].check = data.so_Law_enforcement_Security_Military;
            occupation[18].check = data.so_Fashion_Model_Beauty;
            occupation[19].check = data.so_Architecture_Interior_design;
            this.setState({
                faith:faith,
                occupation:occupation
            })
        })
    }
    faith(id){
        let exer = this.state.faith;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            faith:exer
        }) 
    }
    occupation(id){
        let exer = this.state.occupation;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            occupation:exer
        }) 
    }
    save_lifestyle(event){
     
        event.preventDefault();
        let senderdata={
            uid:this.state.uid,
            faith:this.state.faith,
            occupation:this.state.occupation,
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/lifestyles',senderdata).then(res=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your LifeStyle Answers Updated SuccessFully',
                showConfirmButton: false,
                timer: 1300
              })
        })
    }
    render() {
        return (
            <div id="about-me-content">
                <br/>
                <h5>Faith</h5>
                <br/>
             <div className="row">
             {
                     this.state.faith.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.faith.bind(this,index)} type="radio" name="faith" checked={data.check == 1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )
                     })
                 }
                </div>
               
                <h5>Occupation</h5>
                <div className="row">
                {
                     this.state.occupation.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.occupation.bind(this,index)} type="radio" name="occupation" checked={data.check == 1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )
                     })
                 }

                </div>
                <br/>
                <button onClick={this.save_lifestyle.bind(this)} className="btn save-btn">Save</button>

            </div>
            
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(LifeStyle);