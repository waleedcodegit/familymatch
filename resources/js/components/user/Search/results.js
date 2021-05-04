import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal'
import {Link} from 'react-router-dom'
import {Tab,Tabs} from 'react-bootstrap'
import {connect} from 'react-redux';
import Axios from 'axios';
import { img_base } from '../../Configs/Env';
// import {$} from 'jquery';
class Results extends Component {

    constructor(props) {
        super(props);
        this.state={
            display_filters:false,
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
            sports:[
                {check:0,name:'Aerobics'},
                {check:0,name:'racing-Motorcross'},
                {check:0,name:'Baseball'},
                {check:0,name:'Basketball'},
                {check:0,name:'Billiards Pool'},
                {check:0,name:'Bowling'},
                {check:0,name:'Cycling'},
                {check:0,name:'Football'},
                {check:0,name:'Golf'},
                {check:0,name:'Dancing'},
                {check:0,name:'Inline skating'},
                {check:0,name:'Martial arts'},
                {check:0,name:'Running'},
                {check:0,name:'Skiing'},
                {check:0,name:'Soccer'},
                {check:0,name:'Swimming'},
                {check:0,name:'Tennis Racquet sports'},
                {check:0,name:'Walking Hiking'},
                {check:0,name:'Weights Machines'},
                {check:0,name:'Yoga'},
                {check:0,name:'Hockey'},
                {check:0,name:'VolleyBall'},
            ],
            Hobbies:[
                {
                    check:0,
                    name:'Alumni connections'},
                {
                    check:0,
                    name:'Book club'},
                {
                    check:0,
                    name:'Camping'},
                {
                    check:0,
                    name:'Coffee and conversation'},
                {
                    check:0,
                    name:'Business networking'},
                {
                    check:0,
                    name:'Cooking'},
                {
                    check:0,
                    name:'Dining out'},
                {
                    check:0,
                    name:'Fishing Hunting'},
                {
                    check:0,
                    name:'Gardening Landscaping'},
                {
                    check:0,
                    name:'Hobbies and crafts'},
                {
                    check:0,
                    name:'Movies Videos'},
                {
                    check:0,
                    name:'Museums and art'},
                {
                    check:0,
                    name:'Music and concerts'},
                {
                    check:0,
                    name:'Exploring new areas'},
                {
                    check:0,
                    name:'Nightclubs Dancing'},
                {
                    check:0,
                    name:'Performing arts'},          
                                {
                    check:0,
                    name:'Playing cards'},
                {
                    check:0,
                    name:'Playing sports'},  
                                    {
                    check:0,
                    name:'Political interests'},
                {
                    check:0,
                    name:'Religion Spiritual'},  
                {
                    check:0,
                    name:'Shopping Antiques'},
                {
                    check:0,
                    name:'Travel Sightseeing'},
                                    {
                    check:0,
                    name:'Video games'}, 
                                    {
                    check:0,
                    name:'Volunteering'},
                                    {
                    check:0,
                    name:'Watching sports'}, 
                                    {
                    check:0,
                    name:'Wine tasting'},
   
            ],
            pets:[
                {check:0,name:'Birds'},
                {check:0,name:'Cats'},
                {check:0,name:'Dogs'},
                {check:0,name:'Exotic pets'},
                {check:0,name:'Fish'},
                {check:0,name:'Horses'},

            ],
            marital_status:[
                {check:0,name:' Never Married'},
                {check:0,name:'Widow Widower'},
                {check:0,name:'Currently Separated'},
                {check:0,name:'Divorced'},
            ],
           has_kids:[
                {check:0,name:' Yes and they sometimes live at home'},
                {check:0,name:' No'},
                {check:0,name:' Yes and they live away from home'},
                {check:0,name:' Yes and they live at home'},
            ],
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
            uid:this.props.user.uid,
            total_results:0,
            results:[],
            loading:false
        }
    }
    componentDidMount(){
        this.setState({
            loading:true
        })
        $(document).ready(function(){
            // $(window).scrollTop(0);
            window.scroll({
                top: 0, 
                left: 0, 
                behavior: 'smooth'
              });
        });
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            uid:this.state.uid,
            city_id:window.sessionStorage.getItem('key5'),
            state_id:window.sessionStorage.getItem('key4'),
            country:window.sessionStorage.getItem('key3'),
            seeking:window.sessionStorage.getItem('key2'),
        }
        Axios.post('/api/get_search_results_by_loc',senderdata).then(res=>{
            this.setState({
                loading:false
            })
            if(res.data.length > 0){
                this.setState({
                    total_results:res.data.length,
                    results:res.data
                })
            }
            
        })
    }
    filters(e){
        this.setState({
            display_filters : !this.state.display_filters
        })
    }
    ehtnicity(id){
        let exer = this.state.ehtnicity;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            ehtnicity:exer
        },function(){
            this.apply_filters();
        })
    }
    astrology(id){
        let exer = this.state.astrology;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            astrology:exer
        },function(){
            this.apply_filters();
        })
    }
    education(id){
        let exer = this.state.education;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            education:exer
        },function(){
            this.apply_filters();
        })
    }
    language(id){
        let exer = this.state.language;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            language:exer
        },function(){
            this.apply_filters();
        })
    }
    faith(id){
        let exer = this.state.faith;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            faith:exer
        },function(){
            this.apply_filters();
        }) 
    }
    occupation(id){
        let exer = this.state.occupation;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            occupation:exer
        },function(){
            this.apply_filters();
        }) 
    }
    sports(id){
        let exer = this.state.sports;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            sports:exer
        },function(){
            this.apply_filters();
        })
    }
    hobbies(id){
        let exer = this.state.Hobbies;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            hobbies:exer
        },function(){
            this.apply_filters();
        })
    }
    pet(id){
        let exer = this.state.pets;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            pet:exer
        },function(){
            this.apply_filters();
        })
    }
    has_kids(id){
        let exer = this.state.has_kids;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            has_kids:exer
        },function(){
            this.apply_filters();
        })  
    }
    marital_status(id){
        let exer = this.state.marital_status;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            marital_status:exer
        },function(){
            this.apply_filters();
        })  
    }
    smoke(id){
        let exer = this.state.smoke;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check ;
            }
        })
        this.setState({
            smoke:exer
        },function(){
            this.apply_filters();
        })
    }
    Drink(id){
        let exer = this.state.drink;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            drink:exer
        },function(){
            this.apply_filters();
        })
    }
    Exercise(id){
        let exer = this.state.exercise;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            exercise:exer
        },function(){
            this.apply_filters();
        })
    }
    body_types(id){
        let exer = this.state.body_types;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            body_types:exer
        },function(){
            this.apply_filters();
        })
    }
    hair_color(id){
        let exer = this.state.hair_color;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            hair_color:exer
        },function(){
            this.apply_filters();
        })
    }
    eye_colors(id){
        let exer = this.state.eye_colors;
        exer.map((data,index)=>{
            if(index == id){
                data.check = !data.check;
            }
        })
        this.setState({
            eye_colors:exer
        },function(){
            this.apply_filters();
        })
    }
    apply_filters(){
        let senderdata={
            access_token:window.localStorage.getItem('key1'),
            uid:this.state.uid,
            city_id:window.sessionStorage.getItem('key5'),
            state_id:window.sessionStorage.getItem('key4'),
            country:window.sessionStorage.getItem('key3'),
            seeking:window.sessionStorage.getItem('key2'),
            bodytypes:this.state.body_types,
            haircolors:this.state.hair_color,
            eyecolor:this.state.eye_colors,
            ethnicity:this.state.ehtnicity,
            astrology:this.state.astrology,
            education:this.state.education,
            language:this.state.language,
            faith:this.state.faith,
            occupation:this.state.occupation,
            sports:this.state.sports,
            hobbies:this.state.Hobbies,
            pet:this.state.pets,
            marital_status:this.state.marital_status,
            haskids:this.state.has_kids,
            smoke:this.state.smoke,
            drink:this.state.drink,
            exercise:this.state.exercise
        }
        this.setState({
            loading:true
        })
        Axios.post('/api/apply_filters',senderdata).then(res=>{
            this.setState({
                loading:false,
                total_results:res.data.length,
                results:res.data
            })
        })
    }
    render() {
        return (
            <div className="container">
                                    <div>
                            <Modal
                                show={this.state.display_filters}
                                onHide={this.filters.bind(this)}
                                dialogClassName="modal-100w"
                                aria-labelledby="example-custom-modal-styling-title"
                                className="col"
                            >
                            <Modal.Header closeButton>
                            <Modal.Title id="example-custom-modal-styling-title">
                                <h4 id="modal-header-title" >
                                    <i className="fas fa-sliders-h " style={{fontSize:'30px'}}></i>
                                    <span className="ml-2" style={{fontSize:'25px'}}>Filters</span> 
                                </h4>
                            </Modal.Title>
                            </Modal.Header>
                            <Modal.Body >
                            <div className="col row">
                                <div style={{padding:'0px'}} className="card sidebar  col-md-3">
                                    
                                            <div  className="profile-usermenu mt-0">
                                                <ul className="nav" style={{display:'block'}}>
                                                    <li   className='overview '>
                                                        <a className="active" id="nav-home-tab " data-toggle="tab"  role="tab" aria-controls="nav-home" aria-selected="true" href="#nav-looks">
                                                            <i className="fa fa-smile-o" aria-hidden="true"></i>
                                                            Looks</a>
                                                    </li>
                                                    <li className='overview'>
                                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-personal" role="tab" aria-controls="nav-profile" aria-selected="false">
                                                            <i className="fa fa-user" aria-hidden="true"></i>
                                                            Personal </a>
                                                    </li>
                                                    <li className='overview'>
                                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-lifestyle" role="tab" aria-controls="nav-profile" aria-selected="false">
                                                            <i className="fa fa-recycle" aria-hidden="true"></i>
                                                        LifeStyle </a>
                                                    </li>
                                                    <li className='overview'>
                                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-interests" role="tab" aria-controls="nav-profile" aria-selected="false">
                                                            <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                                                            Interest </a>
                                                    </li>
                                                    <li className='overview'>
                                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-kids" role="tab" aria-controls="nav-profile" aria-selected="false">
                                                            <i className="fa fa-child" aria-hidden="true"></i>
                                                            Kids </a>
                                                    </li>
                                                    <li className='overview'>
                                                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-healths" role="tab" aria-controls="nav-profile" aria-selected="false">
                                                            <i className="fa fa-heartbeat" aria-hidden="true"></i>
                                                            Healths  </a>
                                                    </li>
                                                </ul>
                                            </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div style={{padding:'0px !important'}} className="tab-content content-card" id="nav-tabContent">
                                            <div className="tab-pane fade show active " id="nav-looks" role="tabpanel" aria-labelledby="nav-home-tab">
                                                <div id="aboutme-nav">
                                                    {/* <p id="modal-header-title"style={{fontWeight:'700'}} >Looks</p> */}
                                                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                                                    <Tab className="mt-3" eventKey="home" title="Body Types">
                                                    <div className="row">
                                                        {
                                                            this.state.body_types.map((data,index)=>{
                                                                return(
                                                                    <div key={index} className="col-md-6">
                                                                        <div className="checkbox">
                                                                            <label>
                                                                                <input onChange={this.body_types.bind(this,index)} type="checkbox" name="astrology" checked={data.check == 1}/>
                                                                                {data.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )

                                                            })
                                                        }
                                                    </div>          
                                                    </Tab>
                                                    <Tab className="mt-3" eventKey="Hair" title="Hair Colors">
                                                    <div className="row">
                                                        {
                                                            this.state.hair_color.map((data,index)=>{
                                                                return(
                                                                    <div key={index} className="col-md-6">
                                                                        <div className="checkbox">
                                                                            <label>
                                                                                <input onChange={this.hair_color.bind(this,index)} type="checkbox" name="astrology" checked={data.check == 1}/>
                                                                                {data.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )

                                                            })
                                                        }
                                                    </div>
                                                    </Tab>
                                                    <Tab className="mt-3" eventKey="Eye" title="Eye Colors" >
                                                    <div className="row">
                                                        {
                                                            this.state.eye_colors.map((data,index)=>{
                                                                return(
                                                                    <div key={index} className="col-md-6">
                                                                        <div className="checkbox">
                                                                            <label>
                                                                                <input onChange={this.eye_colors.bind(this,index)} type="checkbox" name="astrology" checked={data.check == 1}/>
                                                                                {data.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )

                                                            })
                                                        }
                                                    </div>
                                                    </Tab>
                                                </Tabs>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-personal" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                <div id="aboutme-nav">
                                                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                                                    <Tab className="mt-3" eventKey="home" title="Ethnicity">
                                                    <div className="row">
                                                    {
                                                        this.state.ehtnicity.map((data,index)=>{
                                                            return(
                                                                <div key={index} className="col-md-6 ">
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input onChange={this.ehtnicity.bind(this,index)} type="checkbox" name="ethnicity" checked={data.check == 1}/>
                                                                            {data.name}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            )

                                                        })
                                                    }
                                                    </div>
                                                    </Tab>
                                                    <Tab className="mt-3 row col" eventKey="Lifestyle" title="Astrology">
                                                    <div className="row">
                                                        {
                                                            this.state.astrology.map((data,index)=>{
                                                                return(
                                                                    <div key={index} className="col-md-6">
                                                                        <div className="checkbox">
                                                                            <label>
                                                                                <input onChange={this.astrology.bind(this,index)} type="checkbox" name="astrology" checked={data.check == 1}/>
                                                                                {data.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )

                                                            })
                                                        }                                                   
                                                    </div>
                                                    </Tab>
                                                    <Tab className="mt-3" eventKey="Interest" title="Education" >
                                                    <div className="row">
                                                    {
                                                        this.state.education.map((data,index)=>{
                                                            return(
                                                                <div key={index} className="col-md-6">
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input onChange={this.education.bind(this,index)} type="checkbox" name="education" checked={data.check == 1}/>
                                                                            {data.name}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            )

                                                        })
                                                    }
                                                    </div>
                                                    </Tab>
                                                    <Tab className="mt-3" eventKey="Kids" title="Language" >
                                                    <div className="row">
                                                    {
                                                            this.state.language.map((data,index)=>{
                                                                return(
                                                                    <div key={index} className="col-md-6">
                                                                        <div className="checkbox">
                                                                            <label>
                                                                                <input onChange={this.language.bind(this,index)} type="checkbox" name="language" checked={data.check == 1}/>
                                                                                {data.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )

                                                            })
                                                        }
                                                        </div>
                                                    </Tab>
                                                </Tabs>
                                                </div>  
                                            </div>
                                            <div className="tab-pane fade" id="nav-lifestyle" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                <div  id="aboutme-nav">
                                                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                                                    <Tab className="mt-3" eventKey="home" title="Faith">
                                                    <div className="row">
                                                        {
                                                                this.state.faith.map((data,index)=>{
                                                                    return(
                                                                        <div key={index} className="col-md-6">
                                                                            <div className="checkbox">
                                                                                <label>
                                                                                    <input onChange={this.faith.bind(this,index)} type="checkbox" name="faith" checked={data.check == 1}/>
                                                                                    {data.name}
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </Tab>
                                                    <Tab className="mt-3" eventKey="Lifestyle" title="Occupation">
                                                    <div className="row">
                                                        {
                                                            this.state.occupation.map((data,index)=>{
                                                                return(
                                                                    <div key={index} className="col-md-6">
                                                                        <div className="checkbox">
                                                                            <label>
                                                                                <input onChange={this.occupation.bind(this,index)} type="checkbox" name="occupation" checked={data.check == 1}/>
                                                                                {data.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                        </div>
                                                    </Tab>
                                                </Tabs>
                                                </div>  
                                            </div>
                                            <div className="tab-pane fade" id="nav-interests" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                <div  id="aboutme-nav">
                                                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                                                    <Tab className="mt-3" eventKey="home" title="Sports">
                                                    <div className="row">
                                                    {
                                                        this.state.sports.map((data,index)=>{
                                                            return(
                                                                <div key={index} className="col-md-6">
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input onChange={this.sports.bind(this,index)} type="checkbox" name="Sports" checked={data.check == 1}/>
                                                                            {data.name}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                    </Tab>
                                                    <Tab className="mt-3" eventKey="Lifestyle" title="Hobbies">
                                                    <div className="row">
                                                    {
                                                        this.state.Hobbies.map((data,index)=>{
                                                            return(
                                                                <div key={index} className="col-md-6">
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input onChange={this.hobbies.bind(this,index)} type="checkbox" name="Sports" checked={data.check == 1}/>
                                                                            {data.name}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                    </Tab>
                                                    <Tab className="mt-3" eventKey="Pet" title="Pet">
                                                    <div className="row">
                                                    {
                                                        this.state.pets.map((data,index)=>{
                                                            return(
                                                                <div key={index} className="col-md-6">
                                                                    <div className="checkbox">
                                                                        <label>
                                                                            <input onChange={this.pet.bind(this,index)} type="checkbox" name="Sports" checked={data.check == 1}/>
                                                                            {data.name}
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    </div>
                                                    </Tab>
                                                </Tabs>
                                                </div>  
                                            </div>
                                            <div className="tab-pane fade" id="nav-kids" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                <div id="aboutme-nav" >
                                                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                                                    <Tab className="mt-3" eventKey="home" title="MARITAL STATUS">
                                                    <div className="row">
                                                        {
                                                            this.state.marital_status.map((data,index)=>{
                                                                return(
                                                                    <div key={index} className="col-md-6">
                                                                        <div className="checkbox">
                                                                            <label>
                                                                                <input onChange={this.marital_status.bind(this,index)} type="checkbox" name="marital_status" checked={data.check == 1}/>
                                                                                {data.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>    
                                                    </Tab>
                                                    <Tab className="mt-3" eventKey="Lifestyle" title="HAS KIDS">
                                                    <div className="row">
                                                        {
                                                            this.state.has_kids.map((data,index)=>{
                                                                return(
                                                                    <div key={index} className="col-md-6">
                                                                        <div className="checkbox">
                                                                            <label>
                                                                                <input onChange={this.has_kids.bind(this,index)} type="checkbox" name="has_kids" checked={data.check == 1}/>
                                                                                {data.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    </Tab>
                                                </Tabs>
                                                </div>  
                                            </div>
                                            <div className="tab-pane fade" id="nav-healths" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                <div id="aboutme-nav" >
                                                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                                                        <Tab className="mt-3" eventKey="home" title="Smoke  ">
                                                        <div className="row">
                                                            {
                                                                this.state.smoke.map((data,index)=>{
                                                                    return(
                                                                        <div key={index} className="col-md-6">
                                                                            <div className="checkbox">
                                                                                <label>
                                                                                    <input onChange={this.smoke.bind(this,index)} type="checkbox" name="smoke" checked={data.check == 1}/>
                                                                                    {data.name}
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    )

                                                                })
                                                            }
                                                        </div>
                                                        </Tab>
                                                        <Tab className="mt-3" eventKey="Lifestyle" title="Drink">
                                                        <div className="row">
                                                            {
                                                                this.state.drink.map((data,index)=>{
                                                                    return(
                                                                        <div key={index} className="col-md-6">
                                                                            <div className="checkbox">
                                                                                <label>
                                                                                    <input onChange={this.Drink.bind(this,index)} type="checkbox" name="Drink" checked={data.check == 1}/>
                                                                                    {data.name}
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    )

                                                                })
                                                            }
                                                                
                                                            </div>
                                                        </Tab>
                                                        <Tab className="mt-3" eventKey="Exercise" title="Exercise">
                                                            <div className="row">    
                                                                {
                                                                    this.state.exercise.map((data,index)=>{
                                                                        return(
                                                                            <div key={index} className="col-md-6">
                                                                                <div className="checkbox">
                                                                                    <label>
                                                                                        <input onChange={this.Exercise.bind(this,index)} type="checkbox" name="Exercise" checked={data.check == 1} />
                                                                                        {data.name}
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    })
                                                                }
                                                            </div>
                                                        </Tab>
                                                    </Tabs>
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </Modal.Body>
                        </Modal>
                    </div>
                <div className="ml-3 mt-3">
                    <h4 id="header-title" onClick={this.filters.bind(this)} id="filters">
                    <i className="fas fa-sliders-h " style={{fontSize:'20px'}}></i>
                        <span className="ml-2" style={{fontSize:'16px'}}>Filters</span> 
                        
                    </h4>
                </div>
                <div className="content-card col-md-10">
                    <p id="header-title">{this.state.total_results} Results</p>
                    <p id="header-sub-title">Family Matches</p>
                    <div>
                    <div className="row col" >
                        {
                            this.state.results.map((data,index)=>{
                                return(
                                    <div key={index} className="col-sm-3 results results_content_card mr-3 mt-2" >
                                        <div className="search_profile_cover"></div>
                                        <img className="profile_img" style={{width:'150px',height:'150px',margin:'0px auto',display:'block',borderRadius:'50%'}} src={img_base+data.profile_image}></img>
                                        <div className="profile-usertitle-name">
                                           <Link to={`/profile/${data.username}/profile`}>{data.fname} {data.lname}</Link> 
                                        </div>
                                        <div className="profile-user-gender">
                                            {data.gender== "1" ? 'Man' : ''}
                                            {data.gender== "2" ? 'Woman' : ''}
                                            {data.gender== "3" ? ' Wife & Husband' : ''}
                                            {data.gender== "4" ? 'Woman & Man' : ''} 
                                        </div>
                                        <div className="profile-user-gender">
                                            {data.seeking== "1" ? 'looking for Man' : ''}
                                            {data.seeking== "2" ? 'looking for Woman' : ''}
                                            {data.seeking== "3" ? 'looking for Wife & Husband' : ''}
                                            {data.seeking== "4" ? 'looking for Woman & Man' : ''}
                                        </div>
                                    </div> 
                                )
                            })
                        } 
                        {
                            this.state.loading ? 
                            <div id="displayspinner" style={{display:'block',marginLeft:'45%',marginTop:'10%'}}>
                                <div className="spinner-border text-info ml-2" style={{width:'50px',height:'50px'}} role="status">
                                <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            :
                            null
                        }             
                    </div>
                    </div>
                   
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        user:state.user
    }
}
export default connect(mapStateToProps)(Results);