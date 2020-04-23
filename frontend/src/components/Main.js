import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderView from './header/Header'
<<<<<<< HEAD
import sellerCentral from './seller/SellerCentral'
import { Container } from 'semantic-ui-react';
=======
import SignupForm from './signup/Signup'
import LoginForm from './login/Login'
>>>>>>> 9a8732d50fa575089954437876e321fc741c5c6e

class Main extends Component {
    render() {
        return (
<<<<<<< HEAD
            <Container className="App">
                <Router>
                    {/* <Root> */}
                    <Route path="/" exact component={HeaderView} />
                    <Route path="/sellerCentral" exact component={sellerCentral} />
=======
            <Router>
                {/* <Root> */}
                    <Route path="/dashboard" exact component={HeaderView}/>
                     <Route path="/signup" component={SignupForm} />
                    <Route path='/' exact component={LoginForm} />
>>>>>>> 9a8732d50fa575089954437876e321fc741c5c6e
                    {/* <Route path="/dashboard" exact component={Post} /> */}
                    {/* </Root> */}
                </Router>
            </Container>
        );
    }
}

export default Main;