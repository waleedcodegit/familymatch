import React, { Component } from 'react';
import '../user.css'
import Axios from 'axios';
import {connect} from 'react-redux';
import Swal from 'sweetalert2'

class personel extends Component {
    constructor(props) {
        super(props);
        this.state={
            ehtnicity:[
                {check:0,name:'Asian'},
                {check:0,name:'Black African descent'},
                {check:0,name:'East Indian'},
                {check:0,name:'Latino Hispanic'},
                {check:0,name:'Middle Eastern'},
                {check:0,name:'Native American'},
                {check:0,name:'Pacific Islander'},
                {check:0,name:'White Caucasian'},
            ],
            astrology:[
                {check:0,name:'Capricorn'},
                {check:0,name:'Aquarius'},
                {check:0,name:'Pisces'},
                {check:0,name:'Aries'},
                {check:0,name:'Taurus'},
                {check:0,name:'Gemini'},
                {check:0,name:'Cancer'},
                {check:0,name:'Leo'},
                {check:0,name:'Virgo'},
                {check:0,name:'Libra'},
                {check:0,name:'Scorpio'},
                {check:0,name:'Sagittarius'},
            ],
            education:[
              {check:0,name:' High school'} ,
              {check:0,name:'Some college'}  ,
              {check:0,name:'Associates degree'}  ,
              {check:0,name:'Bachelors degree'}  ,
              {check:0,name:'Graduate degree'}  ,
              {check:0,name:'PhD Post Doctoral'}  ,
            ],
            language:[
              {check:0,name: 'Arabic' }  ,
              {check:0,name: 'Chinese' }  ,
              {check:0,name: 'Dutch' }  ,
              {check:0,name:  'English'}  ,
              {check:0,name:  'French'}  ,
              {check:0,name: 'German' }  ,
              {check:0,name: 'Hebrew' }  ,
              {check:0,name:  'Hindi'}  ,
              {check:0,name:  'Italian'}  ,
              {check:0,name: 'Japanese' }  ,
              {check:0,name: 'Korean' }  ,
              {check:0,name:  'Norwegian'}  ,
              {check:0,name: 'Portuguese' }  ,
              {check:0,name:  'Russian'}  ,
              {check:0,name: 'Spanish' }  ,
              {check:0,name:  'Swedish'}  ,
              {check:0,name: 'Tagalog' }  ,
              {check:0,name: 'Urdu' }  ,
            ],
            uid:this.props.user.uid
        }
    }
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/get_personals/'+this.state.uid,senderdata).then(res=>{
            let data = res.data[0];
            let Ethnicity = this.state.ehtnicity;
            let education = this.state.education;
            let astrology = this.state.astrology;
            let language = this.state.language;
            Ethnicity[0].check = data.pe_Asian;
            Ethnicity[1].check = data.pe_Black_African_descent;
            Ethnicity[2].check = data.pe_East_Indian;
            Ethnicity[3].check = data.pe_Latino_Hispanic;
            Ethnicity[4].check = data.pe_Middle_Eastern;
            Ethnicity[5].check = data.pe_Native_American;
            Ethnicity[6].check = data.pe_Pacific_Islander;
            Ethnicity[7].check = data.pe_White_Caucasian;
            education[0].check = data.ps_High_school;
            education[1].check = data.ps_Some_college;
            education[2].check = data.ps_Associates_degree;
            education[3].check = data.ps_Bachelors_degree;
            education[4].check = data.ps_Graduate_degree;
            education[5].check = data.ps_PhD_Post_Doctoral;
            astrology[0].check = data.pa_Capricorn;
            astrology[1].check = data.pa_Aquarius;
            astrology[2].check = data.pa_Pisces;
            astrology[3].check = data.pa_Aries;
            astrology[4].check = data.pa_Taurus;
            astrology[5].check = data.pa_Gemini;
            astrology[6].check = data.pa_Cancer;
            astrology[7].check = data.pa_Leo;
            astrology[8].check = data.pa_Virgo;
            astrology[9].check = data.pa_Libra;
            astrology[10].check = data.pa_Scorpio;
            astrology[11].check = data.pa_Sagittarius;
            language[0].check = data.pl_Arabic;
            language[1].check = data.pl_Chinese;
            language[2].check = data.pl_Dutch;
            language[3].check = data.pl_English;
            language[4].check = data.pl_French;
            language[5].check = data.pl_German;
            language[6].check = data.pl_Hebrew;
            language[7].check = data.pl_Hindi;
            language[8].check = data.pl_Italian;
            language[9].check = data.pl_Japanese;
            language[10].check = data.pl_Korean;
            language[11].check = data.pl_Norwegian;
            language[12].check = data.pl_Portuguese;
            language[13].check = data.pl_Russian;
            language[14].check = data.pl_Spanish;
            language[15].check = data.pl_Swedish;
            language[16].check = data.pl_Tagalog;
            language[17].check = data.pl_Urdu;
            this.setState({
                language:language,
                education:education,
                ehtnicity:Ethnicity,
                astrology:astrology
            })

        })
    }
    ehtnicity(id){
        let exer = this.state.ehtnicity;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            ehtnicity:exer
        })
    }
    astrology(id){
        let exer = this.state.astrology;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            astrology:exer
        })
    }
    education(id){
        let exer = this.state.education;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            education:exer
        })
    }
    language(id){
        let exer = this.state.language;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            language:exer
        })
    }
    save_personels(e){
        e.preventDefault();
        let senderdata={
            uid:this.state.uid,
            Ethnicity:this.state.ehtnicity,
            education:this.state.education,
            astrology:this.state.astrology,
            language:this.state.language,
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/personels',senderdata).then(res=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your Personal Answers Updated SuccessFully',
                showConfirmButton: false,
                timer: 1300
              })
        })
    }
    render() {
        return (
            <div id="about-me-content">
                <br/>
                <h5>Ethnicity</h5>

                <br/>
                
             <div className="row">
             {
                     this.state.ehtnicity.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.ehtnicity.bind(this,index)} type="radio" name="ethnicity" checked={data.check == 1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )

                     })
                 }
                </div>
                <br/>
                <h5>Astrology</h5>
                <div className="row">
                {
                     this.state.astrology.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.astrology.bind(this,index)} type="radio" name="astrology" checked={data.check == 1}/>
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
                <h5>Education</h5>

               <br/>
               <div className="row">
               {
                     this.state.education.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.education.bind(this,index)} type="radio" name="education" checked={data.check == 1}/>
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
                <h5>Language</h5>

                <br/>
                <div className="row">
                {
                     this.state.language.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.language.bind(this,index)} type="radio" name="language" checked={data.check == 1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )

                     })
                 }
                
                </div>
                <br/>
                <button onClick={this.save_personels.bind(this)} className="btn save-btn">Save</button>

            </div>
            
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default  connect(mapStateToProps)(personel);