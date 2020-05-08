import React, { Component } from 'react'
import { Menu, Image, Grid, Header, Divider, Card, Icon, Button, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { getCustomerCart } from '../../actions/cart';
import { getCard } from '../../actions/customer'
import { getAddress} from '../../actions/customer'
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryAddress: {},
            paymentDetails: '',
            buyer_id: '',
            seller_id : '',
            product_id: '',
            gift: '',
            giftMessage: '',
            quantity: '', 
            totalAmount: '',
            address: '',
            card: ''

        };
    }
    changeAddress = (e,v) => {
        console.log(v.value);
        
    }

    changeCard = (e,v) => {
        console.log(v.value);
        
    }

    componentDidMount= async () => {
        if (localStorage.getItem("token") !== null) {
            var user = jwtDecode(localStorage.getItem("token"));
            this.setState({ userId: user.userId });
            await this.props.getAddress(user.userId)
            await this.props.getCard(user.userId)

        }else {
            this.props.history.push('/login')
        }
        console.log("zzzzzzzzzzzz")


        const address = await queryString.parse(this.props.location.search)
        const card = await queryString.parse(this.props.location.search)
      
        
        this.setState ={
            ...this.state,
            buyer_id: user.userId,
            address,
            card
        }

        
        console.log(this.state.userId)
        // this.props.getCustomerCart(user.userId)
    }

  render() {
    console.log(this.props.addressList) ;
    console.log(this.props.cardList) ;
    
    const address = Object.keys(queryString.parse(this.props.location.search)).length > 0 ? queryString.parse(this.props.location.search): this.props.addressList[0] || {};
    const card = Object.keys(queryString.parse(this.props.location.search)).length > 0 ? queryString.parse(this.props.location.search): this.props.cardList[0] || {};
      return(
        <div>
            <div>
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
            <div style={{ marginTop: "72px" }}>
            <Header as='h1'>Checkout</Header>
            </div>
            <br/>
            <br/>
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
                                    <div >
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
                                            <br/>
                                        <Link to='/addaddress' className="nav-link">
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
                                    <div >
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
                                            <br/>
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
                            <br/>
                            <Link to='/ordersummary' className="nav-link" >
                                <Button 
                                    // onClick={this.createOrder}
                                    color='yellow'  
                                    size='medium' 
                                    style={{border:"solid 1px black"}}>
                                    Place Your Order
                                </Button>
                            </Link>
                            <br/>
                            <div>By placing your order, you agree to Amazon's privacy notice and conditions of use.</div>
                            <Card.Content > Total Items : {this.props.carttotalitems} </Card.Content>
                            <Card.Content > Order Total : ${this.props.cartsubtotal} </Card.Content>
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
    };
};


export default connect(mapStateToProps,{ getAddress, getCard})(Checkout);
