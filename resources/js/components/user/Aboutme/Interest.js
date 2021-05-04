import React, { Component } from 'react';
import '../user.css'
import {connect} from 'react-redux';
import Axios from 'axios';
import Swal from 'sweetalert2'

class Interest extends Component {
    constructor(props) {
        super(props);
        this.state={
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
            uid:this.props.user.uid
        }
    }
    
    componentDidMount(){
        let senderdata={
            access_token:window.localStorage.getItem('key1')
        }
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
    }
    sports(id){
        let exer = this.state.sports;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            sports:exer
        })
    }
    hobbies(id){
        let exer = this.state.Hobbies;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            hobbies:exer
        })
    }
    pet(id){
        let exer = this.state.pets;
        exer.map((data,index)=>{
            if(index == id){
                data.check = 1;
            }else{
                data.check = 0;
            }
        })
        this.setState({
            pet:exer
        })
    }

    save_interests(e){
        e.preventDefault();
        let senderdata = {
            sports:this.state.sports,
            hobbies:this.state.Hobbies,
            pet:this.state.pets,
            uid:this.state.uid,
            access_token:window.localStorage.getItem('key1')
        }
        Axios.post('/api/interests',senderdata).then(res=>{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your Interest Answers Updated SuccessFully',
                showConfirmButton: false,
                timer: 1300
              })
        })
    }
    render() {
        return (
            <div id="about-me-content">
                <br/>
                <h5>Sports</h5>

                <br/>
                
                <div className="row">
                 {
                     this.state.sports.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.sports.bind(this,index)} type="radio" name="Sports" checked={data.check == 1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )
                     })
                 }
                </div>
                <br/>
               
                <h5>Hobbies</h5>
                <br/>
                <div className="row">
                {
                     this.state.Hobbies.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.hobbies.bind(this,index)} type="radio" name="Hobbies" checked={data.check == 1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )

                     })
                 }
                </div>

                <br/>
                <h5>Pet</h5>
                <br/>
                
             <div className="row">
             {
                     this.state.pets.map((data,index)=>{
                         return(
                            <div key={index} className="col-md-6">
                                <div className="radio">
                                    <label>
                                        <input onChange={this.pet.bind(this,index)} type="radio" name="pets" checked={data.check==1}/>
                                        {data.name}
                                    </label>
                                </div>
                            </div>
                         )

                     })
                 }
             </div>
             <button onClick={this.save_interests.bind(this)} className="btn save-btn">Save</button>

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
export default connect(mapStateToProps)(Interest);