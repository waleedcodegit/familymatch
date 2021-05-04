import React, { Component } from 'react';
import {Tab,Tabs} from 'react-bootstrap'
import Personel from './Aboutme/personel'
import Kids from './Aboutme/Kids'
import Health from './Aboutme/Health'
import Interest from './Aboutme/Interest'
import LifeStyle from './Aboutme/LifeStyle'
import Looks from './Aboutme/Looks'
class Aboutme extends Component {
    render() {
        return (
            <div className="container">
                <div id="aboutme-nav" className="card content-card">
                    <p id="header-title">About Me</p>
                    <p id="header-sub-title">Tell us more about yourself.</p>
                    <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                        <Tab eventKey="home" title="Personel">
                            <Personel />
                        </Tab>
                        <Tab eventKey="Lifestyle" title="Lifestyle">
                            <LifeStyle />
                        </Tab>
                        <Tab eventKey="Interest" title="Interest" >
                            <Interest />
                        </Tab>
                        <Tab eventKey="Kids" title="Kids" >
                            <Kids />
                        </Tab>
                        <Tab eventKey="Health" title="Health" >
                            <Health />
                        </Tab>
                        <Tab eventKey="Looks" title="Looks" >
                            <Looks />
                        </Tab>
                    </Tabs>
                </div>
            </div>        
        );
    }
}

export default Aboutme;