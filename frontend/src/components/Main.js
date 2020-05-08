import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import sellerCentral from './seller/SellerCentral'
import SignupForm from './signup/Signup'
import LoginForm from './login/Login'
import Cart from './customer/cart'
import Checkout from './customer/checkout'
import CustomerOrders from './customer/CustomerOrders'



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
import AddAddress from './customer/AddAddress'
import AddCard from './customer/AddCard';
import Address from './customer/Address';
import UserCard from './customer/UserCard';
import EditAddress from './customer/EditAddress';
import CustomerReiviews from './customer/CustomerReiviews'

class Main extends Component {
    constructor(props) {
        super(props);
        
    }

    render() {

        const user = localStorage.getItem('token')

        return (
            <React.Fragment style={{minHeight:'600px'}}>
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
                {/* <Route path='/youraddresses' exact component={Address} /> */}
                {/* <Route path='/yourpayments' exact component={Cards} /> */}
                <Route path="/orderDetails" exact component={OrderDetail} />
                <Route path="/orderTracking" exact component={OrderTrackingModal} />
                <Route path='/addaddress' exact component={AddAddress} />
                <Route path='/addcard' exact component={AddCard} />
                <Route path='/customer/address' exact component={Address} />
                <Route path='/customer/card' exact component={UserCard} />
                <Route path='/customer/addressupdate' exact component={EditAddress} />
                <Route path='/checkout'  component={Checkout} />
        
                
                <Route path='/customer/reviews' component={CustomerReiviews} />

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
            </React.Fragment>
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