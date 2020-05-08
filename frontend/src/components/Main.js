import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import HeaderView from './header/Header'
import sellerCentral from './seller/SellerCentral'
import SignupForm from './signup/Signup'
import LoginForm from './login/Login'
import Cart from './customer/cart'
import Address from './customer/address'
import Cards from './customer/card'
import AddAddress from './customer/addAddress'
import AddCard from './customer/addCard'
import Checkout from './customer/checkout'
import CustomerOrders from './customer/CustomerOrders'
import OrderSummary from './customer/orderSummary'


import CustomerProfile from './customer/customerProfile'
import ProductDetail from './product/ProductDetail'
import CustomerDashboard from './dashboard/CustomerDashboard'
import AdminDashboard from './dashboard/AdminDashboard'
import AppHeader from './header/Header';
import SellerProfile from './seller/SellerProfile'
import SellerProduct from './seller/SellerProduct'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import OrderDetail from "./order/orderDetail";
import OrderTrackingModal from "./order/orderTrackingModal";

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
                <Route path='/customerorders' exact component={CustomerOrders} />
                <Route path='/cart' exact component={Cart} />
                <Route path='/youraddresses' exact component={Address} />
                <Route path='/addaddress' exact component={AddAddress} />
                <Route path='/yourpayments' exact component={Cards} />
                <Route path='/addcard' exact component={AddCard} />
                <Route path="/orderDetails" exact component={OrderDetail} />
                <Route path="/orderTracking" exact component={OrderTrackingModal} />
                <Route path='/checkout'  component={Checkout} />
                <Route path='/ordersummary'  component={OrderSummary} />
                

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