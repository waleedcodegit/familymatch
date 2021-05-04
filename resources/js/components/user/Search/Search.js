import React, { Component } from 'react';
import Axios from 'axios'
import '../user.css'
class Search extends Component {
    constructor(props) {
        super(props);
        this.state={
            cities:[],
            countries:[],
            states:[],
            city:'',
            state:'',
            country:'',
            city_id:'',
            state_id:'',
            country_id:'',
            states_loading:false,
            cities_loading:false,
            we_are_a:'1',
            seeking:'2',
        }
    }
    componentDidMount(){
        Axios.get('/api/get_countries').then(res=>{
            this.setState({
                countries:res.data
            })
        })
    }
    on_select_country(e){
        this.setState({
            country_id:e.target.value
        },function(){
            this.setState({
                states_loading:true
            })
            Axios.get('/api/get_states/'+this.state.country_id).then(res=>{
                this.setState({
                    states:res.data,
                    states_loading:false
                })
            })
        })
        this.state.countries.map(data=>{
            if(data.id == e.target.value){
                this.setState({
                    country:data.name
                })
            }
        })
    }
    on_select_state(e){
        this.setState({
            state_id:e.target.value
        },function(){
            this.setState({
                cities_loading:true
            })
            Axios.get('/api/get_cities/'+this.state.state_id).then(res=>{
                this.setState({
                    cities:res.data,
                    cities_loading:false
                })
            })
        })
        this.state.states.map(data=>{
            if(data.id == e.target.value){
                this.setState({
                    state:data.name
                })
            }
        })
    }
    on_select_city(e){
        this.setState({
            city_id:e.target.value
        })
        this.state.cities.map(data=>{
            if(data.id == e.target.value){
                this.setState({
                    city:data.name
                })
            }
        })
    }
    we_are_a(e){
        this.setState({
            we_are_a:e.target.value
        })
    }
    seeking(e){
        this.setState({
            seeking:e.target.value
        })
    }
    view_results(e){
        e.preventDefault();
        window.sessionStorage.setItem('key1',this.state.we_are_a);
        window.sessionStorage.setItem('key2',this.state.seeking);
        window.sessionStorage.setItem('key3',this.state.country_id);
        window.sessionStorage.setItem('key4',this.state.state_id);
        window.sessionStorage.setItem('key5',this.state.city_id);
        this.props.history.push('/profile/Search/Results');
    } 
    render() {
        return (
            <div  className="container">
                <div id="match-search-div">
                <div id="match-search-form" className="col-md-6">
					<div className="search-card-title">
						<p>  Let Us Find The Perfect Family For Yours! </p>
					</div>


							<form >
									
									<div className="form-group left-wrap">
										<label> We Are A:</label>
									</div>
									<div className="form-group right-wrap">
										<select value={this.state.we_are_a || ''} onChange={this.we_are_a.bind(this)} name="gender"className="form-control register-fname profile-input-box" title="Men">
										  <option value="1">Men </option>
										  <option value="2"> Woman</option>
										   <option value="3"> Wife & Husband</option>
										  <option value="4"> Woman & Man</option>
										</select>



									</div>
							

							
									<div className="form-group left-wrap">
										<label> Seeking</label>
									</div>
									<div className="form-group right-wrap">
										<select value={this.state.seeking || ''} onChange={this.seeking.bind(this)} name="seeking"className="form-control register-fname profile-input-box" title="woman">
										  <option value="1">Men </option>
										  <option value="2"> Woman</option>
										  <option value="3"> Wife & Husband</option>
										  <option value="4"> Woman & Man</option>

										</select>
									</div>
							
								
									<div className="form-group left-wrap">
                                        <strong> <label >Country </label></strong>
                                        <select  value={this.state.country_id || " "} onChange={this.on_select_country.bind(this)} className="form-control profile-input-box"  name="country"  title="country">
                                                <option value=''>Select Country</option>
                                            {
                                                this.state.countries.map((data,index)=>{
                                                    return(
                                                        <option value={data.id} key={index}>{data.name}</option>
                                                    )
                                                })
                                            }
                                        </select>

									</div>
							
								
									<div className="form-group right-wrap">
                                        <strong><label >State 
                                            {
                                                this.state.states_loading?
                                                <div className="spinner-border text-info ml-2" style={{fontSize:'10px',width:'25px',height:'25px'}} role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>:
                                                ''
                                            }
                                        </label></strong>
                                        <select value={this.state.state_id || " "} onChange={this.on_select_state.bind(this)} className="form-control profile-input-box"  name="state"  title="woman">
                                            <option value=''>Select State</option>
                                            {
                                                this.state.states.map((data,index)=>{
                                                    return(
                                                        <option value={data.id} key={index}>{data.name}</option>
                                                    )
                                                })
                                            }
                                        </select>

									</div>
							

								
									<div className="form-group left-wrap">
                                    <strong><label >City
                                            {
                                                this.state.cities_loading?
                                                <div className="spinner-border text-info ml-2" style={{fontSize:'10px',width:'25px',height:'25px'}} role="status">
                                                    <span className="sr-only">Loading...</span>
                                                </div>:
                                                ''
                                            }
                                    </label></strong>
                                        <select value={this.state.city_id || " "} onChange={this.on_select_city.bind(this)} className="form-control profile-input-box"  name="city"  title="woman">
                                                <option value=''>Select city</option>
                                            {
                                                this.state.cities.map((data,index)=>{
                                                    return(
                                                        <option value={data.id} key={index}>{data.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
									</div>
								


								<div className="text-center">

									<button id="redbtn" onClick={this.view_results.bind(this)}  disabled={this.state.city?false:true}className="btn btn-default btn-block continue-btn">view matches</button>

								</div>
							</form>
					</div>
                </div>
               		
            </div>
        );
    }
}

export default Search;