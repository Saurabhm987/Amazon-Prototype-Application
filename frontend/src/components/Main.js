import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderView from './header/Header'
import SignupForm from './signup/Signup'
import LoginForm from './login/Login'

class Main extends Component {
    render() {
        return (
            <Router>
                {/* <Root> */}
                <Route path="/dashboard" exact component={HeaderView}/>
                <Route path="/signup" component={SignupForm} />
                <Route exact path='/' component={LoginForm} />
                    {/* <Route path="/dashboard" exact component={Post} /> */}
                {/* </Root> */}
            </Router>
        );
    }
}

export default Main;