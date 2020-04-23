import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HeaderView from './header/Header'
import sellerCentral from './seller/SellerCentral'
import { Container } from 'semantic-ui-react';

class Main extends Component {
    render() {
        return (
            <Container className="App">
                <Router>
                    {/* <Root> */}
                    <Route path="/" exact component={HeaderView} />
                    <Route path="/sellerCentral" exact component={sellerCentral} />
                    {/* <Route path="/dashboard" exact component={Post} /> */}
                    {/* </Root> */}
                </Router>
            </Container>
        );
    }
}

export default Main;