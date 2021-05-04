import React, { Component } from 'react';
import {Tab,Tabs} from 'react-bootstrap'
import Axios from 'axios'

class Aboutme extends Component {
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
            uid:this.props.profile_user.id,
            smoke_checked:'',
            ehtnicity_checked:'',
            astrology_checked:'',
            education_checked:'',
            language_checked:'',
            faith_checked:'',
            occupation_checked:'',
            sports_checked:'',
            Hobbies_checked:'',
            pets_checked:'',
            marital_status_checked:'',
            has_kids_checked:'',
            drink_checked:'',
            exercise_checked:'',

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
        Axios.post('/api/get_interests/'+this.state.uid,senderdata).then(res=>{
            let data = res.data[0];
            let sports = this.state.sports;
            let hobbies  = this.state.Hobbies;
            let pet = this.state.pets;
            sports[0].check = data.is_Aerobics;
            sports[1].check = data.is_racing_Motorcross;
            sports[2].check = data.is_Baseball;
            sports[3].check = data.is_Basketball;
            sports[4].check = data.is_Billiards_Pool;
            sports[5].check = data.is_Bowling;
            sports[6].check = data.is_Cycling;
            sports[7].check = data.is_Football;
            sports[8].check = data.is_Golf;
            sports[9].check = data.is_Dancing;
            sports[10].check = data.is_Inline_skating;
            sports[11].check = data.is_Martial_arts;
            sports[12].check = data.is_Running;
            sports[13].check = data.is_Skiing;
            sports[14].check = data.is_Soccer;
            sports[15].check = data.is_Swimming;
            sports[16].check = data.is_Tennis_Racquet_sports;
            sports[17].check = data.is_Walking_Hiking;
            sports[18].check = data.is_Weights_Machines;
            sports[19].check = data.is_Yoga;
            sports[20].check = data.is_Hockey;
            sports[21].check = data.is_VolleyBall;
            hobbies[0].check = data.ih_Alumni_connections;              hobbies[16].check = data.ih_Playing_cards
            hobbies[1].check = data.ih_Book_club      ;                 hobbies[17].check = data.ih_Playing_sports
            hobbies[2].check = data.ih_Camping ;                        hobbies[18].check = data.ih_Political_interests
            hobbies[3].check = data.ih_Coffee_and_conversation ;        hobbies[19].check = data.ih_Religion_Spiritual
            hobbies[4].check = data.ih_Business_networking ;            hobbies[20].check = data.ih_Shopping_Antiques
            hobbies[5].check = data.ih_Cooking ;                        hobbies[21].check = data.ih_Travel_Sightseeing
            hobbies[6].check = data.ih_Dining_out  ;                    hobbies[22].check = data.ih_Video_games
            hobbies[7].check = data.ih_Fishing_Hunting   ;              hobbies[23].check = data.ih_Volunteering
            hobbies[8].check = data.ih_Gardening_Landscaping ;          hobbies[24].check = data.ih_Watching_sports
            hobbies[9].check = data.ih_Hobbies_and_crafts   ;           hobbies[25].check = data.ih_Wine_tasting
            hobbies[10].check = data.ih_Movies_Videos        ;          
            hobbies[11].check = data.ih_Museums_and_art ;              
            hobbies[12].check = data.ih_Music_and_concerts ;             
            hobbies[13].check = data.ih_Exploring_new_areas;            
            hobbies[14].check = data.ih_Nightclubs_Dancing ;             
            hobbies[15].check = data.ih_Performing_arts ;               
            pet[0].check = data.ib_Birds;
            pet[1].check = data.ib_Cats;
            pet[2].check = data.ib_Dogs;
            pet[3].check = data.ib_Exotic_pets;
            pet[4].check = data.ib_Exotic_pets;
            pet[5].check = data.ib_Horses;
            this.setState({
                sports:sports,
                Hobbies:hobbies,
                pets:pet
            })

        })
        Axios.post('/api/get_kids/'+this.state.uid,senderdata).then(res=>{
            let kids = this.state.has_kids;
            let marital_status = this.state.marital_status;
            let data = res.data[0];

            marital_status[0].check = data.fm_Never_Married
            marital_status[1].check = data.fm_Widow_Widower
            marital_status[2].check = data.fm_Currently_Separated
            marital_status[3].check = data.fm_Divorced
            kids[0].check = data.fh_Yes_and_they_sometimes_live_at_home
            kids[1].check = data.fh_No
            kids[2].check = data.fh_Yes_and_they_live_away_from_home
            kids[3].check = data.fh_Yes_and_they_live_at_home
            this.setState({
                has_kids:kids,
                marital_status:marital_status
            })
        })
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
            },function(){
                this.data_setter();
            })

        })
    }

    data_setter(){
       
        this.state.smoke.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    smoke_checked:data.name
                })
            }
        })

        this.state.ehtnicity.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    ehtnicity_checked:data.name
                })
            }
        })

        this.state.astrology.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    astrology_checked:data.name
                })
            }
        })

        this.state.education.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    education_checked:data.name
                })
            }
        })

        this.state.language.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    language_checked:data.name
                })
            }
        })

        this.state.faith.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    faith_checked:data.name
                })
            }
        })


        this.state.occupation.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    occupation_checked:data.name
                })
            }
        })

        this.state.sports.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    sports_checked:data.name
                })
            }
        })

        this.state.Hobbies.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    Hobbies_checked:data.name
                })
            }
        })

        this.state.pets.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    pets_checked:data.name
                })
            }
        })

        this.state.marital_status.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    marital_status_checked:data.name
                })
            }
        })
        this.state.has_kids.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    has_kids_checked:data.name
                })
            }
        })
        this.state.drink.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    drink_checked:data.name
                })
            }
        })
        this.state.exercise.map((data,index)=>{
            if(data.check == 1){
                this.setState({
                    exercise_checked:data.name
                })
            }
        })
        
    }
    
    render() {
        return (
            <div className="container">
                <div id="aboutme-nav" className="card content-card">
                    <p id="header-title">About</p>
                    {/* <p id="header-sub-title">Tell us more about yourself.</p> */}
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Personel">
                           <p id="header-title2">Ethinicity</p>
                           <span className="profile_static_text">{this.state.ehtnicity_checked == ''? 'Loading...' : this.state.ehtnicity_checked} </span>
                           <p id="header-title2">Astrology</p>
                           <span className="profile_static_text">{this.state.astrology_checked == ''? 'Loading...' : this.state.astrology_checked } </span>
                           <p id="header-title2">Education</p>
                           <span className="profile_static_text">{this.state.education_checked == ''? 'Loading...' : this.state.education_checked} </span>
                           <p id="header-title2">Language</p>
                           <span className="profile_static_text">{this.state.language_checked == ''? 'Loading...' : this.state.language_checked} </span>

                        </Tab>
                        <Tab eventKey="Lifestyle" title="Lifestyle">
                            <p id="header-title2">Faith</p>
                            <span className="profile_static_text">{this.state.faith_checked} </span>
                            <p id="header-title2">Occupation</p>
                            <span className="profile_static_text">{this.state.occupation_checked} </span>

                        </Tab>
                        <Tab eventKey="Interest" title="Interest" >
                            <p id="header-title2">Sports</p>
                            <span className="profile_static_text">{this.state.sports_checked} </span>
                            <p id="header-title2">Hobbies</p>
                            <span className="profile_static_text">{this.state.Hobbies_checked} </span>
                            <p id="header-title2">Pet</p>
                            <span className="profile_static_text">{this.state.pets_checked} </span>
                        </Tab>
                        <Tab eventKey="Kids" title="Kids" >
                            <p id="header-title2">MARITAL STATUS</p>
                            <span className="profile_static_text">{this.state.marital_status_checked} </span>
                            <p id="header-title2">Has Kids</p>
                            <span className="profile_static_text">{this.state.has_kids_checked} </span>

                        </Tab>
                        <Tab eventKey="Health" title="Health" >
                            <p id="header-title2">Smoke</p>
                            <span className="profile_static_text">{this.state.smoke_checked} </span>
                            <p id="header-title2">Drink</p>
                            <span className="profile_static_text">{this.state.drink_checked} </span>
                            <p id="header-title2">Exercise</p>
                            <span className="profile_static_text">{this.state.exercise_checked} </span>
                        </Tab>
                    </Tabs>
                </div>
            </div>        
        );
    }
}

export default Aboutme;