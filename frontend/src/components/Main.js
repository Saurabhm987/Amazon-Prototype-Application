import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import HeaderView from './header/Header'
import sellerCentral from './seller/SellerCentral'
import SignupForm from './signup/Signup'
import LoginForm from './login/Login'
import Cart from './customer/cart'
import CustomerProfile from './customer/customerProfile'
import ProductDetail from './product/ProductDetail'
import CustomerDashboard from './dashboard/CustomerDashboard'
import AdminDashboard from './dashboard/AdminDashboard'
import AppHeader from './header/Header';
import SellerProfile from './seller/SellerProfile'
import SellerProduct from './seller/SellerProduct'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class Main extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {

        const user = localStorage.getItem('token')

        return (
            <Router>
                <Route path="/dashboard" exact component={CustomerDashboard} />
                <Route path="/admindashboard" exact component={AdminDashboard} />
                <Route path="/sellerCentral" exact component={sellerCentral} />
                <Route path="/customerprofile" component={CustomerProfile} />
                <Route path="/signup" component={SignupForm} />
                <Route path='/login' exact component={LoginForm} />
                <Route path='/productdetails' exact component={ProductDetail} />
                <Route path='/sellerprofile' exact component={SellerProfile} />
                <Route path='/sellerproducts' exact component={SellerProduct} />
                <Route path='/cart' exact component={Cart} />

                { 
                    user !== null
                    ? <Route path='/' component={AppHeader} /> 
                    : null
                }
                {
                    user === null
                    ? <Redirect to='/login'/>
                    : null
                }
            </Router>
        );
    }
}

Main.propTyeps = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(Main);