import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderView from './header/Header'

class Main extends Component {
    render() {
        return (
            <Router>
                {/* <Root> */}
                    <Route path="/" exact component={HeaderView}/>
                    {/* <Route path="/dashboard" exact component={Post} /> */}
                {/* </Root> */}
        </Router>
        );
    }
}

export default Main;