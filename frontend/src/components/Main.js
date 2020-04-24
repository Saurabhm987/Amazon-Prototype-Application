import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderView from './header/Header'
import sellerCentral from './seller/SellerCentral'
import { Container } from 'semantic-ui-react';
import SignupForm from './signup/Signup'
import LoginForm from './login/Login'

class Main extends Component {
    render() {
        return (
            <Router>
                <Route path="/" exact component={HeaderView} />
                <Route path="/sellerCentral" exact component={sellerCentral} />
                <Route path="/dashboard" exact component={HeaderView} />
                <Route path="/signup" component={SignupForm} />
                <Route path='/' exact component={LoginForm} />
                {/* <Route path="/dashboard" exact component={Post} /> */}
                {/* </Root> */}
            </Router>
        );
    }
}

export default Main;