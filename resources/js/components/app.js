import React, { Component } from 'react';
import HomeNaveBar  from './HomeNavbar'
import Footer from './Footer'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import EmailVerifier from './Auth/EmailVerifier'
import PageNotFound from './PageNotFound'
import ForgotPassword from './Auth/ForgotPassword'
import PswResetCont from './Auth/Passwordresetcontroller'
// import Profile from './user/profile'
import Aboutus from './Pages/Aboutus'
import Privacy from './Pages/Privacy'
import PolicyCookies from './Pages/PolicyCookies'
import TermsNConditions from './Pages/TermsNConditions'
import HelpPage from './Pages/HelpPage'
import HowitWorks from './Pages/HowitWorks'
import MobileApp from './Pages/MobileApp'
import ContactUs from './Pages/ContactUs'
import SiteMap from './Pages/SiteMap'
import Careers from './Pages/Careers'
import AdvertisePage from './Pages/AdvertisePage'
import Profile from './user/usernavbar'
import Adminlogin from './Admin/Auth/Adminlogin'
import Adminsidebar from './Admin/common/Admin_sidebar'
import Dashbord from './Admin/common/Dashboard'
class App extends Component {
    render() {
        return (
            <BrowserRouter>
            <div >
            <Switch>
                <Route exact path="/login" component={Login} type="public"></Route>
                <Route exact path="/Register" component={Register} type="public"></Route>
                <Route  path="/VerifyEmail" component={EmailVerifier} type="public"></Route>
                <Route exact  path="/ForgotPassword/:id" component={ForgotPassword} ></Route>
                <Route exact  path="/ResetPassword/:id" component={PswResetCont} ></Route>
                <Route exact path="/PageNotFound" component={PageNotFound} type="public"></Route>
                <Route exact path="/" component={HomeNaveBar} type="public"></Route>
                <Route  path="/profile" component={Profile} type="public"></Route>
                <Route exact path="/aboutus" component={Aboutus} type="public"></Route>
                <Route exact path="/privacy" component={Privacy} type="public"></Route>
                <Route exact path="/policycookies" component={PolicyCookies} type="public"></Route>
                <Route exact path="/termsnconditions" component={TermsNConditions} type="public"></Route>
                <Route exact path="/help" component={HelpPage} type="public"></Route>
                <Route exact path="/works" component={HowitWorks} type="public"></Route>
                <Route exact path="/mobileapp" component={MobileApp} type="public"></Route>
                <Route exact path="/contactus" component={ContactUs} type="public"></Route>
                <Route exact path="/sitemap" component={SiteMap} type="public"></Route>
                <Route exact path= "/careers" component ={Careers}type="public"></Route>
                <Route exact path="/advertisepage" component={AdvertisePage} type="public"></Route>
                <Route exact path="/adminlogin" component={Adminlogin} type="public"></Route>
                <Route   path="/adminpanel" component={Adminsidebar} type="public"></Route>
                {/* <Route  path="/Dashboard" component={Dashbord} type="public"></Route> */}

            </Switch>
          

            </div>
            </BrowserRouter>
            
        );
    }
}

export default App;