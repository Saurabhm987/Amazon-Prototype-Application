import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomerCart, updateCustomerCart, deleteProductInCart } from '../../actions/cart';
import { Link } from 'react-router-dom';
import './cart.css';
import { Redirect } from 'react-router';
import header from '../header/Header'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            cartsubtotal: 0,
            carttotalitems: 0,
            rendercheckout: false,
            month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        };
    }
    componentDidMount() {
        this.props.getCustomerCart(sessionStorage.getItem("id"))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cart: nextProps.cart,
            cartsubtotal: nextProps.cartsubtotal,
            carttotalitems: nextProps.carttotalitems
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        const data = {
            persona: this.state.persona,
            email: this.state.mail,
            password: this.state.password,
        }
        this.props.login(data);
    }

    giftProduct = (product_id, gift, quantity) => {
        let changegift
        let data

        if (gift === true)
            changegift = false
        else
            changegift = true

        data = {
            customer_id: sessionStorage.getItem('id'),
            product_id: product_id,
            gift: changegift,
            quantity: quantity
        }

        this.props.updateCustomerCart(data)
    }
    changeQuantity = (product_id, gift, quantity) => {

        let data = {
            customer_id: sessionStorage.getItem('id'),
            product_id: product_id,
            gift: gift,
            quantity: quantity
        }

        this.props.updateCustomerCart(data)
    }

    deleteProduct = (product_id, type) => {
        console.log(type)
        this.props.deleteProductInCart({ customer_id: sessionStorage.getItem('id'), product_id: product_id, type: type })
    }

    redirectToCheckout = () => {
        this.setState({
            rendercheckout: true
        })
    }

    render() {
        let cartlist = null;
        let customercart = [];
        let totalPrice = null;
        let proceedtocheckout = null;
        let gift = false;
        let redirectVar = null;
        customercart = this.state.cart;

        if (this.state.rendercheckout)
            redirectVar = <Redirect to={`/customer/${sessionStorage.getItem('id')}/checkout`} />

        if (customercart) {
            let subtotal = this.state.cartsubtotal
            let carttotalitems = this.state.carttotalitems

            if (customercart.filter(cartitem => cartitem.gift === true).length > 0) { gift = true }

            cartlist = (<div>
                {customercart.map((cartitem, index) => {
                    return (
                        <div class='productConatiner'>
                            <div class='row'>
                                <div class='col-md-3 imageContainer'>
                                    <img class='productImage' src={cartitem.product.images[0]} alt={cartitem.product.name}></img>
                                </div>
                                <div class='col-md-7 detailsContainer'>
                                    <Link class='productlink' to={"/product/" + cartitem.product._id}>
                                        <div class='productTitle'>{cartitem.product.name}</div>
                                    </Link>
                                    <div class='stocklabel'>
                                        {/* Only {Math.ceil(Math.random() * 10)} left in stock - order soon. */}
                                        Only few left in stock - order soon.
                                    </div>
                                    <div class='checkboxContainer'>
                                        <input type="checkbox" name="productgift" onChange={() => this.giftProduct(cartitem.product._id, cartitem.gift, cartitem.quantity)} checked={cartitem.gift} />
                                        <span class='giftlabel'>
                                            This is a gift
                                                <span class='learnlabel'>
                                                Learn more
                                                </span>
                                        </span>
                                    </div>
                                    <div class='qtyContainer'>
                                        <span class='qtyButton'>
                                            <div className="dropdown">
                                                <button className="form-control btn btn-default dropdown-toggle" type="button" data-toggle="dropdown" style={{ background: "#e7e9ec", borderColor: '#e7e9ec', height: "25px", fontSize: "13px", paddingTop: "3px", marginLeft: "-40px", width: "max-content" }}>
                                                    <span style={{fontSize:'13px', fontWeight:'550'}}>Qty:{cartitem.quantity} </span> <span className="caret" style={{ paddingBottom: "3px" }}></span>
                                                </button>

                                                <ul className="dropdown-menu" role="menu" style={{ fontSize: "11px", minWidth: "max-content", cursor: "pointer", marginLeft: "-35px" }} >
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => {
                                                        return (<li ><a onClick={() => this.changeQuantity(cartitem.product._id, cartitem.gift, value)}>{value}</a></li>)
                                                    })}
                                                </ul>

                                            </div>
                                        </span>
                                        <span class="separator"></span>
                                        <span class='deleteProduct' onClick={() => { this.deleteProduct(cartitem.product._id, "delete") }}>Delete</span>
                                        <span class="separator"></span>
                                        <span class='deleteProduct' onClick={() => { this.deleteProduct(cartitem.product._id, "saveforlater") }}>Save for later</span>
                                    </div>
                                </div>
                                <div class='col-md-2 productprice'>
                                    ${cartitem.gift ? (cartitem.product.discountedPrice * 110/100).toFixed(2) : cartitem.product.discountedPrice}
                                </div>


                            </div>
                        </div>
                    )
                })}
            </div>)

            totalPrice = (<div class='subtotalContainer'>
                <span class='subtotalLabel'>
                    Subtotal ({(carttotalitems === 1) ? carttotalitems + ' item' : carttotalitems + ' items'}):
                        </span>
                <span class='productprice'>
                    ${subtotal}
                </span>
            </div>)

            proceedtocheckout = (<div class='checkoutContainer'>
                <div class='checkoutSubtotal'>
                    <span class='subtotalLabel'>
                        Subtotal ({(carttotalitems === 1) ? carttotalitems + ' item' : carttotalitems + ' items'}):
                        </span>
                    <span class='productprice'>
                        ${subtotal}
                    </span>
                </div>
                <div class='checkoutCheckbox'>
                    <input type="checkbox" name="" value="" checked={gift} />
                    <span class='giftlabel'>This order contains a gift</span>
                </div>
                <button class='checkoutButton' onClick={() => { this.redirectToCheckout() }}>
                    <div class='checkoutButtonText'>
                        Proceed to checkout
                    </div>
                </button>
            </div>)
        }


        return (
            <div class="cartContainer">
                {redirectVar}
                <header/>
                <div class='col-md-9 productsContainer'>
                    <h2 class='shoppingcart'>Shopping Cart</h2>
                    {(customercart.length === 0) ? <h2 class='shoppingcart'>Your Shopping Cart is empty</h2> :
                        <div>
                            <div class='row pricecontainer'>
                                <div class='pricehead'>Price</div>
                            </div>
                            {cartlist}
                            {totalPrice}
                            <div class='gradient'>

                            </div>
                            <p class='CartInfo'>
                                The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price.</p>
                            <p class='CartInfo'>
                                Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.
                            </p>

                        </div>}
                </div>
                {(customercart.length === 0) ? <div></div> : <div class='col-md-3'>
                    {proceedtocheckout}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // cart: state.cart.cartlist,
        // cartsubtotal: state.cart.cartsubtotal,
        // carttotalitems: state.cart.carttotalitems
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getCustomerCart: payload => dispatch(getCustomerCart(payload)),
        updateCustomerCart: payload => dispatch(updateCustomerCart(payload)),
        deleteProductInCart: payload => dispatch(deleteProductInCart(payload))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);