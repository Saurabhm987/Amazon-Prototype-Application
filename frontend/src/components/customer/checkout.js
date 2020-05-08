import React, { Component } from 'react'
import { Menu, Image, Grid, Header, Divider, Card, Icon, Button, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getCustomerCart } from '../../actions/cart';
import { getAddress, setDefaultCard, setDefaultAddress, getCard } from '../../actions/customer'
import { createNewOrder } from '../../actions/order'
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import { getUserOrder, updateStatus } from '../../actions/order';
import { setupOrderedProductForDetail } from '../../actions/product';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryAddress: {},
            paymentDetails: '',
            buyer_id: '',
            seller_id: '',
            product_id: '',
            gift: '',
            giftMessage: '',
            quantity: '',
            totalAmount: '',
            address: '',
            card: '',
            name: ''

        };
    }
    
    createOrder = (address, card) => {
        try {
            console.log(this.props.cart)
            const orderArray = []
            this.props.cart.map(cart => {
                let tempOrder = {
                    deliveryAddress: address,
                    paymentDetails: 'card ending with ***' + card['number'].toString().slice(-4),
                    sellerId: cart.productId.sellerId,
                    productId: cart.productId._id,
                    gift: cart.gift,
                    giftMessage: cart.giftMessage || '',
                    quantity: cart.quantity,
                    totalAmount: this.props.cartsubtotal,
                    billingAddress: { ...address, 'name': this.state.name }
                }
                orderArray.push(tempOrder)
                
            })
            return orderArray
        }
        catch (e) {
            console.log(e);
            return []

        }


    }

    changeAddress = (e, v) => {
        console.log(v.value);

    }

    changeCard = (e, v) => {
        console.log(v.value);

    }

    componentDidMount = async () => {
        if (localStorage.getItem("token") !== null) {
            var user = jwtDecode(localStorage.getItem("token"));

            this.setState({ buyer_id: user.userId, name: user.name });
            await this.props.getAddress(user.userId)
            await this.props.getCard(user.userId)

        } else {
            this.props.history.push('/login')
        }
        console.log("zzzzzzzzzzzz")


        // const address = await queryString.parse(this.props.location.search)
        // const card = await queryString.parse(this.props.location.search)

        

        console.log(this.state.userId)
        // this.props.getCustomerCart(user.userId)
    }

    render() {
 

        const address = Object.keys(this.props.defaultAddress).length > 0 ? this.props.defaultAddress : this.props.addressList[0] || {};
        const card = Object.keys(this.props.defaultCard).length > 0 ? this.props.defaultCard : this.props.cardList[0] || {};

        return (
            <div>
                <div>
                    <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                        <div style={{ marginTop: "72px" }}>
                            <Header as='h1'>Checkout</Header>
                        </div>
                        <br />
                        <br />
                    </div>
                </div>

                <Grid columns={2} >
                    <Grid.Row>
                        <Grid.Column width={11}>
                            <Container textAlign='left' style={{ padding: '50px' }}>
                                <React.Fragment>
                                    <Grid columns={2} >
                                        <Grid.Row>
                                            <Grid.Column width={12}>
                                                <Header as='h3'>Shipping Address</Header>
                                                <div style={{color: '#000000'}}>
                                                    <div>{address.street1}</div>
                                                    <div>{address.street2}</div>
                                                    <div>{address.city}</div>
                                                    <div>{address.state}</div>
                                                    <div>{address.country}</div>
                                                    <div>{address.pincode}</div>
                                                    <div>{address.phone}</div>
                                                </div>
                                            </Grid.Column>
                                            <Divider hidden />
                                            <Grid.Column width={4}>
                                                <div >
                                                    <Link to='/customer/address' className="nav-link" >
                                                        Change
                                        </Link>
                                                    <br />
                                                    <Link to='/addaddress/?id=1' className="nav-link">
                                                        Add New Address
                                        </Link>
                                                </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    <Divider section />
                                    <Grid columns={2} >
                                        <Grid.Row>
                                            <Grid.Column width={12}>
                                                <Header as='h3'>Payment Details</Header>
                                                <div style={{color: '#000000'}}>
                                                    <div>{card.name}</div>
                                                    <div>{card.number}</div>
                                                    <div>{card.expiryDate}</div>
                                                </div>
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <div >
                                                    <Link to='/customer/card' className="nav-link" >
                                                        Change
                                        </Link>
                                                    <br />
                                                    <Link to='/addcard' className="nav-link">
                                                        Add New Card
                                        </Link>
                                                </div>
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </React.Fragment>
                            </Container>
                        </Grid.Column>

                        <Grid.Column width={5}>
                            <Card>
                                <br />
                                <Link to='/' className="nav-link" >
                                    <Button
                                        onClick={ async () => {
                                            await this.props.createNewOrder(this.createOrder(address, card))
                                            this.props.getUserOrder()
                                            await this.props.setupOrderedProductForDetail(await this.props.order.userOrders[0])
                                            await this.props.history.push('/orderdetails')
                                            }}
                                        color='yellow'
                                        size='medium'
                                        style={{ border: "solid 1px black" }}>
                                        Place Your Order
                                </Button>
                                </Link>
                                <br />
                                <div>By placing your order, you agree to Amazon's privacy notice and conditions of use.</div>
                                <Card.Content style={{color: '#000000'}}> Total Items : {this.props.carttotalitems} </Card.Content>
                                <Card.Content style={{color: '#000000'}}> Order Total : ${this.props.cartsubtotal} </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.cartlist,
        cartsubtotal: state.cart.cartsubtotal,
        carttotalitems: state.cart.carttotalitems,
        addressList: state.customer.addressList,
        cardList: state.customer.cardList,
        defaultAddress: state.customer.defaultAddress,
        defaultCard: state.customer.defaultCard,
        order: state.order,
    };
};


export default connect(mapStateToProps, { getAddress, getCard, setDefaultCard, setDefaultAddress, createNewOrder, getUserOrder,setupOrderedProductForDetail })(Checkout);