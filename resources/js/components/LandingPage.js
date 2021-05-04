import React, { Component } from 'react';
import headerimg from '../Images/header-bg.jpg';
import CenterImg from '../Images/center-bg.png';
import TopImg from '../Images/top-img.png';
import DownArrow from '../Images/downarrow.png';
import RightImg from '../Images/right-img.jpg';
import LeftImg from '../Images/left-img.jpg';
import ToRightImg from '../Images/toright.png';
import ToLeftImg from '../Images/toleft.png';
import DownArrow2Img from '../Images/downarrow2.png';
import CombineImg from '../Images/combine.jpg';
import './HomeNavBar.css'
import Footer from './Footer'
import { img_base } from './Configs/Env';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            video:img_base+'/bg-vid.mp4'
        }
    }
    
    componentDidMount(){
        $(window).on('scroll', function (e) {
            var passed_animation_bg = false;
            var img_top = 0;
            var width = window.innerWidth;
            if ($(window).scrollTop() >= 300) {
                if (!passed_animation_bg && img_top == 0) {
                    img_top++;
                    $("#centerimage").delay(0).animate({
                        top: '140px',
                        opacity: '1'
                    }, 500);
                    $("#topimage").delay(400).animate({
                        top: '5%',
                        opacity: '1'
                    }, 500);
                    $("#text1").delay(800).animate({
                        top: '70px',
                        opacity: '1'
                    }, 500);
                    $("#arrow1").delay(800).animate({
                        top: '100px',
                        opacity: '1'
                    }, 500);
                    $("#leftimg").delay(800).animate({
                        top: '180px',
                        opacity: '1'
                    }, 500);
                    $("#text2").delay(1200).animate({
                        top: '70px',
                        opacity: '1'
                    }, 500);
                    $("#arrow2").delay(1200).animate({
                        top: '100px',
                        opacity: '1'
                    }, 500);
                    $("#rightimg").delay(1200).animate({
                        top: '180px',
                        opacity: '1'
                    }, 500);
                    if (width > 992) {
                        $("#downleftright1").delay(2000).animate({
                            top: '470px',
                            opacity: '1'
                        }, 500);
                        $("#downleftright2").delay(2000).animate({
                            top: '470px',
                            opacity: '1'
                        }, 500);
                        $("#downleftright3").delay(1600).animate({
                            top: '430px',
                            opacity: '1'
                        }, 500);
                        $("#combine").delay(2600).animate({
                            top: '530px',
                            opacity: '1'
                        }, 500);
                    }
                    if (width < 992) {
                        $("#downleftright1").delay(2000).animate({
                            top: '420px',
                            opacity: '1'
                        }, 500);
                        $("#downleftright2").delay(2000).animate({
                            top: '420px',
                            opacity: '1'
                        }, 500);
                        $("#downleftright3").delay(1600).animate({
                            top: '370px',
                            opacity: '1'
                        }, 500);
                        $("#combine").delay(2600).animate({
                            top: '470px',
                            opacity: '1'
                        }, 500);
                    }
                }
            }
        });
    }
    render() {
        return (
            <div>
                
                
                
                <div className="container">
                    <div className="headline-home">
                        <div className="col-md-6">
                            <div className="call-to-action-home">
                                <p>Let Us Find The Perfect Family For Yours!</p>
                                <button onClick={()=>{window.open('/login','_self')}} type="submit" style={{backgroundColor:'#f42572'}} className="btn  continue-btn">GET STARTED</button>
                                <br/>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="how-it-works">
                        <h3>Bringing Compatible Families Together</h3>
                        <p>Let Us Match Your Family With Others Like Yours,<br/>Or Different Than Yours!</p>
                        <h4>HOW IT WORKS</h4>
                        <div id="animationbg">
                            <img className="img-responsive" id="centerimage" src={CenterImg}/>
                            <img className="img-responsive" id="topimage" src={TopImg}/>
                            <span id="text1">Family #1</span>
                            <img className="img-responsive" src={DownArrow} id="arrow1"/>
                            <img className="img-responsive" id="rightimg" src={RightImg}/>
                            <span id="text2">Family #2</span>
                            <img className="img-responsive" src={DownArrow} id="arrow2"/>
                            <img className="img-responsive" id="leftimg" src={LeftImg}/>
                            <img className="img-responsive" id="downleftright1" src={ToRightImg}/>
                            <img className="img-responsive" id="downleftright2" src={ToLeftImg}/>
                            <img className="img-responsive" id="downleftright3" src={DownArrow2Img}/>
                            <img className="img-responsive" id="combine" src={CombineImg}/>
                        </div>
                        <div id="animationbg2">
                            <div className="row">
                                <div className="col-lg-12">
                                    <img className="img-responsive" id="topimage2" src={TopImg}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <br/><br/>
                                    <center><span id="text12">Family #1</span></center>
                                    <br/>
                                    <img className="img-responsive" id="arrow12" src={DownArrow}/><br/>
                                    <img className="img-responsive" id="rightimg2" src={RightImg}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <br/><br/>
                                    <center><span id="text22">Family #2</span></center>
                                    <br/>
                                    <img className="img-responsive" id="arrow22" src={DownArrow}/><br/>
                                    <img className="img-responsive" id="leftimg2" src={LeftImg}/>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <br/><br/><br/>
                                    <img className="img-responsive" id="downleftright32" src={DownArrow2Img}/><br/>
                                    <img className="img-responsive" id="combine2" src={CombineImg}/>
                                </div>
                            </div>

                        </div>
                        <p id="below-text">Family #1 and #2 who have no way of knowing each other, each provide certain
                            information about themselves which FamilyMatch<br/>processes through its patented algorithm
                            to match them, then sends them notices to accept or reject the match.<br/>It's Really that
                            simple!</p>
                        <div style={{textAlign:'center'}}>
                        
                             <button onClick={()=>{window.open('/login','_self')}} type="submit" style={{backgroundColor:'#f42572',color:'#ffffff',textAlign:'center'}} className="btn btn-default  find-btn">Click Here To Find Your
                            Family's Match!&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-arrow-right"
                                                                      aria-hidden="true"></i></button>
                        </div>
                       
                </div>    
                <Footer></Footer>
            </div>
            
        );
    }
}


export default LandingPage;