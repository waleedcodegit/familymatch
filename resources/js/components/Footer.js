import React, { Component } from 'react';
import Landscape from '../Images/landscape.png';
import FacebookLogo from '../Images/fb-logo.png';
import GoogleLogo from '../Images/GoogleLogo.png';
import TwitterLogo from '../Images/twitter-logo.png';
class Footer extends Component {
    render() {
        return (
            <div style={{backgroundColor:'#f7f7f7',position:'relative'}} className="mt-2">
                <div className="container">
                    <footer>
                        <div className="row">
                            <div className="col-lg-12">
                                <p id="quicklinks">Quick Links</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3">
                                <a href="/aboutus" id="footer-about">About FamilyMatch</a><br/>
                                <a href="/privacy" id="footer-privacy">Privacy and Security</a><br/>
                                <a href="/policycookies" id ="footer-policycookies">Policy on Cookies</a><br/>
                                <a href="/termsnconditions" id="footer-termsnconditions">Terms and Condition</a>
                            </div>
                            <div className="col-lg-2">
                                <a href="/help" id="footer-helppage">Help/FAQs</a><br/>
                                <a href="/works" id ="footer-howitworks">How It Works</a><br/>
                                <a href="/mobileapp" id="footer-mobileapp">Mobile App</a><br/>
                                <a href="/contactus" id ="footer-contactus">Contact Us</a>
                            </div>
                            
                            <div className="col-lg-2">
                                
                                <a href="/sitemap" id="footer-sitemap">Site Map</a>
                            </div>
                            <div className="col-lg-3">
                                <a href="/advertisepage" id="footer-advertisepage">Advertise on familymatch.com</a><br/>
                               
                                <a href="/careers">Careers</a><br/>
                                <div id="social-logo">
                                    <a href="#"><img height="40" width="40" src={FacebookLogo}/></a>
                                    <a href="#"><img height="40" width="40" src={GoogleLogo}/></a>
                                    <a href="#"><img height="40" width="40" src={TwitterLogo}/></a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
                <div className="container-fluid" id="footer-landscape">
                    <img src={Landscape} style={{maxWidth:'100%',display:'block' }} className="imglandscape"/>
                </div>
                <div className="container-fluid">
                    <footer>
                        <div className="row" id="footer-bottom">
                            <div className="col-lg-12">
                                <p>All Rights Reserved. &copy; Copyright 2020 Aakllarese, Inc.</p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        );
    }
}

export default Footer;