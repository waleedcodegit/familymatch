import React, { Component } from 'react';
import './setup.css'
import {Link} from 'react-router-dom'
class Start extends Component {


    render() {
        return (
            <div>
                <div className="container right_to_left">
                    <div id="tell-us-get-started">
                        <div className="row">
                            <div className="col-lg-6">
                                <div id="left-img-bg">
                                    <div id="right-txt-btn-inside">
                                        <p id="tell-us-txt">Tell Us About Yourself</p>
                                        <p id="so-we-can-txt">So We Can Match Your Family With Another Family</p>
                                        <button type="submit" className="btn btn-default start-btn">
                                            Start
                                            <i className="fa fa-arrow-right" aria-hidden="true">
                                            </i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div id="right-txt-btn">
                                    <p id="tell-us-txt">
                                        Tell Us About Yourself
                                                            </p>
                                    <p id="so-we-can-txt">
                                        So We Can Match Your Family With Another Family
                                                                </p>
                                    <Link to="/profile/Setup">
                                        <button type="submit" className="btn btn-default start-btn">
                                            Start 
                                            <i className="fa fa-arrow-right ml-1" aria-hidden="true">
                                            </i>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>          
        );
    }
}

export default Start; 