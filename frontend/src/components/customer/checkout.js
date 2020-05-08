import React, { Component } from 'react'
import { Menu, Image, Grid, Header, Divider, Card, Icon, Button, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { getCustomerCart } from '../../actions/cart';
import { getAddress} from '../../actions/customer'
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
            totalAmount: ''

        };
    }
    changeAddress = (e,v) => {
        console.log(v.value);
        
    }

    changeCard = (e,v) => {
        console.log(v.value);
        
    }

    componentDidMount() {
        if (localStorage.getItem("token") !== null) {
            var user = jwtDecode(localStorage.getItem("token"));
            this.setState({ userId: user.userId });

        }
        console.log(user)

        this.setState ={
            ...this.state,
            buyer_id: user.userId
        }

        console.log(this.state.userId)
        // this.props.getCustomerCart(user.userId)
    }

    // createOrder = () => {
    //     data = {
    //         buyer_id:this.state.userId,
    //         seller_id : thi,
    //         product_id: ,
    //         deliveryAddress: this.state.deliveryAddress,
    //         paymentDetails: this.state.paymentDetails,
    //         gift: this.props.
    //         giftMessage: "",
    //         quantity: quantity, 
    //         totalAmount:
    //     }
    // }
  render() {
      console.log(this.props.cart)
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
{/*             
            <div>
                <Menu id="headerMenu" fixed='top' inverted>
                <Menu.Item as='a' header>
                    <Image size='mini' src='/amazonsignup.jpg' style={{ padding: "none" }} />
                </Menu.Item>
                <Grid.Row columns={1} style={{ width: "100%" }}>
                <Grid.Column>
                <Menu.Item as='a'>
                    <div >
                        Checkout
                    </div>
                </Menu.Item>
                </Grid.Column>
                </Grid.Row>
                </Menu>
            </div> */}
            <Grid columns={2} >
                <Grid.Row>
                    <Grid.Column width={11}> 
                        <Container textAlign='left' style={{ padding: '50px' }}>
                        <React.Fragment>
                        <Grid columns={2} >
                            <Grid.Row>
                                <Grid.Column width={12}> 
                                <Header as='h3'>Shipping Address</Header>
                                    <div onChange={this.changeAddress}>
                                    User 1
                                    3220 Appian ST 3620
                                    PLEASANTON, CA 94588-4161
                                    United States
                                    Phone number: 9890808080
                                    </div>
                                    </Grid.Column>
                                    <Divider hidden />
                                    <Grid.Column width={4}> 
                                    <div >
                                        <Link to='/youraddresses' className="nav-link" >
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
                                    <div onChange={this.changeCard}>
                                    User 1
                                    card number: 9890808080
                                    </div>
                                </Grid.Column>
                                <Grid.Column width={4}> 
                                    <div >
                                        <Link to='/yourpayments' className="nav-link" >
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
                                    onClick={this.createOrder}
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
        carttotalitems: state.cart.carttotalitems
        // addressList: state.customer.addressList
    };
};


export default connect(mapStateToProps)(Checkout);
