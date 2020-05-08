import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCustomerCart, updateCustomerCart, deleteProductInCart } from '../../actions/cart';
import { Link } from 'react-router-dom';
import './cart.css';
import { Redirect } from 'react-router';
import Saveforlater from './saveforlater'
import jwtDecode from 'jwt-decode';

import {
    Select,
    Divider,
   
    Grid,
   
  } from 'semantic-ui-react';

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            cartsubtotal: 0,
            carttotalitems: 0,
            rendercheckout: false,
            setmessage: [],
            message:"",
            userId:""

        };
    }
    componentDidMount() {
        if (localStorage.getItem("token") !== null) {
            var user = jwtDecode(localStorage.getItem("token"));
            this.setState({ userId: user.userId });

        }
        console.log(user)

        console.log(this.state.userId)
        // 5ea6217130c53720685db7dd
        this.props.getCustomerCart(user.userId)
        // this.props.getCustomerCart(sessionStorage.getItem("id"))
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
    giftMessage = (product_id, gift, message, quantity, index) => {
        let data
        let setmessage = this.state.setmessage
        if (gift) {
            data = {
                customer_id:this.state.userId,
                // customer_id: "5ea6217130c53720685db7dd",
                product_id: product_id,
                gift: false,
                giftMessage: "",
                quantity: quantity
            }
            setmessage[index] = ""
            this.setState({
                setmessage: setmessage
            })
        } else {
            data = {
                customer_id:this.state.userId,
                // customer_id: "5ea6217130c53720685db7dd",
                product_id: product_id,
                gift: true,
                giftMessage: "",
                quantity: quantity
            }
            setmessage[index] = "true"
            this.setState({
                setmessage: setmessage
            })
        }
        this.props.updateCustomerCart(data)

    }
    giftProduct = (product_id, gift, message, quantity ,index) => {
        let data
        console.log(this.state.message)
        let setmessage = this.state.setmessage
        data = {
            // customer_id: "5ea6217130c53720685db7dd",
            customer_id:this.state.userId,

            product_id: product_id,
            gift: true,
            giftMessage: message,
            quantity: quantity
        }
        console.log(data)
        this.props.updateCustomerCart(data)
        setmessage[index] = ""
        this.setState({
            setmessage: setmessage
        })
    }
    inputChangeHandler = (e) => {
        let value = e.target.value
        this.setState({
            [e.target.name]: value
        })
        console.log(this.state)
    }
    // giftProduct = (product_id, gift, quantity) => {
    //     let changegift
    //     let data

    //     if (gift === true)
    //         changegift = false
    //     else
    //         changegift = true

    //     data = {
            
    //         customer_id: '5ea6217130c53720685db7dd',
    //         // customer_id: sessionStorage.getItem('id'),
    //         product_id: product_id,
    //         gift: changegift,
    //         quantity: quantity
    //     }

    //     this.props.updateCustomerCart(data)
    // }
    changeQuantity = (e,data) => {
        console.log(data['data-gift'])

        console.log(data['data-id'])

        console.log(data.value)

        let dataA = {
            // customer_id: '5ea6217130c53720685db7dd',
            customer_id:this.state.userId,
            product_id: data['data-id'],
            gift: data['data-gift'],
            quantity: data.value
        }

        this.props.updateCustomerCart(dataA)
    }

    deleteProduct = (product_id, type) => {
        console.log(type)
        this.props.deleteProductInCart({ customer_id: this.state.userId, product_id: product_id, type: type })

        // this.props.deleteProductInCart({ customer_id: '5ea6217130c53720685db7dd', product_id: product_id, type: type })
        // this.props.deleteProductInCart({ customer_id: sessionStorage.getItem('id'), product_id: product_id, type: type })
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
        console.log(this.state.userId)
        const options = [
            { key: 1, text: '1', value: 1 },
            { key: 2, text: '2', value: 2 },
            { key: 3, text: '3', value: 3 },
            { key: 4, text: '4', value: 4 },
            { key: 5, text: '5', value: 5 },
            { key: 6, text: '6', value: 6 },
            { key: 7, text: '7', value: 7 },
            { key: 8, text: '8', value: 8 },
            { key: 9, text: '9', value: 9 },
            { key: 10, text: '10', value: 10 }
            ]

        if (this.state.rendercheckout)
            redirectVar = <Redirect to={`/checkout/${sessionStorage.getItem('id')}`} />

        if (customercart&&customercart.length) {
            let subtotal = this.state.cartsubtotal
            let carttotalitems = this.state.carttotalitems

            if (customercart.filter(cartitem => cartitem.gift === true).length > 0) { gift = true }

            cartlist = (<div >
                {customercart.map((cartitem, index) => {
                    return (
                        <div>
                        <Divider fitted />

                        <div style={{marginTop:'20px'}}>
                        <Grid>
                            <Grid.Column width={2}>
                            <img class='productImage' src={cartitem.productId.images[0]} alt={cartitem.productId.name}></img>
                            </Grid.Column>
                            <Grid.Column width={10}>
                                <Grid.Row>
                                    <Link class='productlink' to={`/productdetails/?id=${cartitem.productId._id}`}>
                                        <div class='productTitle'>{cartitem.productId.name}</div>
                                    </Link>
                                </Grid.Row>
                                <Grid.Row>
                                    Sold by 
                                    <Link class='productlink' to={`/sellerprofile/?id=${cartitem.productId.sellerId}` }>
                                    <span class='stocklabel'> {cartitem.productId.sellerName?cartitem.productId.sellerName:""}</span>
                                    </Link>
                                    <div class='stocklabel'>
                                        Only few left in stock - order soon.
                                    </div>
                                </Grid.Row>
                                <Grid.Row>
                                <div class='checkboxContainer'>
                                        <input type="checkbox" name="productgift" onChange={() => this.giftMessage(cartitem.productId._id, cartitem.gift, this.state.message, cartitem.quantity,index)} defaultChecked={cartitem.gift} />
                                        <span class='giftlabel'>
                                            This is a gift
                                                <span class='learnlabel'>
                                                Learn more
                                                </span>
                                        </span>
                                    </div>
                                    {this.state.setmessage[index] ? <div style={{ marginBottom: '10px' }}>
                                        <input type="text" class="inputField" onChange={this.inputChangeHandler} name='message' />
                                        <button class='giftButton' onClick={() => this.giftProduct(cartitem.productId._id, cartitem.gift, this.state.message, cartitem.quantity, index)}>
                                            <div class='checkoutButtonText'>Save Message</div>
                                        </button>
                                    </div> :
                                        !cartitem.giftMessage ? <div style={{ marginBottom: '10px' }}></div> : <div style={{ paddingBottom: '10px', paddingTop: '0px' }}><span style={{ color: 'Black' }}>Gift Message: </span>{cartitem.giftMessage}</div>} 



                                    {/* <div class='checkboxContainer'>
                                        <input type="checkbox" name="productgift" onChange={() => this.giftMessage(cartitem.product._id, cartitem.gift, this.state.message, cartitem.quantity, index)} defaultChecked={cartitem.gift} />
                                        <span class='giftlabel'>
                                            This is a gift
                                                <span class='learnlabel'>
                                                Learn more
                                                </span>
                                        </span>
                                    </div>
                                    {this.state.setmessage[index] ? <div style={{ marginBottom: '10px' }}>
                                        <input type="text" class="inputField" onChange={this.inputChangeHandler} name='message' />
                                        <button class='giftButton' onClick={() => this.giftProduct(cartitem.product._id, cartitem.gift, this.state.message, cartitem.quantity, index)}>
                                            <div class='checkoutButtonText'>Save Message</div>
                                        </button>
                                    </div> :
                                        !cartitem.message ? <div style={{ marginBottom: '10px' }}></div> : <div style={{ paddingBottom: '10px', paddingTop: '0px' }}><span style={{ color: 'Black' }}>Gift Message: </span>{cartitem.message}</div>} */}





                                </Grid.Row>
                                <Grid.Row>
                                <div class='qtyContainer'>
                                        <span class='qtyButton' >
                                             <Select placeholder={cartitem.quantity} compact width='5px' options={options} data-id={cartitem.productId._id} data-gift={cartitem.gift} onChange={this.changeQuantity}/>
                                        </span>
                                        <span class="separator"></span>
                                        <span class='deleteProduct' onClick={() => { this.deleteProduct(cartitem.productId._id, "delete") }}>Delete</span>
                                        <span class="separator"></span>
                                        <span class='deleteProduct' onClick={() => { this.deleteProduct(cartitem.productId._id, "saveforlater") }}>Save for later</span>
                                    </div>
                                </Grid.Row>
                             
                            </Grid.Column>
                            <Grid.Column width={2}>
                            <div class='col-md-2 productprice'>
                                    ${cartitem.gift ? (cartitem.productId.price * 105/100).toFixed(2) : cartitem.productId.price}
                                </div>                            </Grid.Column>
                        </Grid>
                        </div></div>

                    )
                })}
            </div>)

            totalPrice = (<div class='subtotalContainer'>
                <span class='subtotalLabel'>
                <Divider fitted />
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
                <Grid>
                    <Grid.Column width={12} style={{marginTop:'60px'}}>
                        <Grid.Row>
                            <h2 class='shoppingcart'>Shopping Cart</h2>
                        </Grid.Row>
                        <Grid.Row> </Grid.Row>
                    {(customercart.length === 0) ? <h2 class='shoppingcart'>Your Shopping Cart is empty</h2> :
                        <div>
                            <Grid.Row>
                                <Grid.Column width={12}>
                                    
                                </Grid.Column>
                              
                            </Grid.Row>
                           
                             <Grid.Row style={{marginTop:'20px'}}>
                            {cartlist}
                            </Grid.Row>
                            {totalPrice}
                           
                       

                        </div>}
                    </Grid.Column>
                    <Grid.Column width={1}></Grid.Column>
                    {(customercart.length === 0) ? <div></div> :<Grid.Column width={3} style={{marginTop:'100px'}}>
                    {proceedtocheckout}
                    </Grid.Column>}
                </Grid>
                <Saveforlater/>
                <p class='CartInfo'>
                    The price and availability of items at Amazon.com are subject to change. The Cart is a temporary place to store a list of your items and reflects each item's most recent price.</p>
                <p class='CartInfo'>
                    Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.
                </p>
         </div>
        )


    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cartlist,
        cartsubtotal: state.cart.cartsubtotal,
        carttotalitems: state.cart.carttotalitems
      
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