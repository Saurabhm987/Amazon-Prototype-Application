import React, { Component } from 'react'
import { Menu, Image, Grid, Header, Divider, Card, Icon, Button, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import { getCustomerCart } from '../../actions/cart';

class Checkout extends Component {

    componentDidMount() {
        // 5ea6217130c53720685db7dd
        this.props.getCustomerCart("5ea6217130c53720685db7dd")
        // this.props.getCustomerCart(sessionStorage.getItem("id"))
    }

  render() {
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
            </div>
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column width={11}> 
                        <Container textAlign='left' style={{ padding: '50px' }}>
                        <React.Fragment>
                            <Header as='h3'>Shipping Address</Header>
                            <div>
                            User 1
                            3220 Appian ST 3620
                            PLEASANTON, CA 94588-4161
                            United States
                            Phone number: 9890808080
                            </div>
                            <div >
                                <Link to='/yourAddresses' className="nav-link" >
                                    Change 
                                </Link>
                                    <br/>
                                <Link to='/addAddress' className="nav-link">
                                    Add New Address
                                </Link>
                            </div>
                            <Divider section />

                            <Header as='h3'>Payment Details</Header>
                            <div>
                            User 1
                            card number: 9890808080
                            </div>
                            <div >
                                <Link to='/yourAddresses' className="nav-link" >
                                    Change 
                                </Link>
                                    <br/>
                                <Link to='/addAddress' className="nav-link">
                                    Add New Card
                                </Link>
                            </div>
                        </React.Fragment>
                        </Container>
                    </Grid.Column>

                    <Grid.Column width={5}>
                        <Card>
                            <br/>
                            <Link to='/ordersummary' className="nav-link" >
                                <Button 
                                    color='yellow'  
                                    size='medium' 
                                    style={{border:"solid 1px black"}}>
                                    Place Your Order
                                </Button>
                            </Link>
                            <br/>
                            <div>By placing your order, you agree to Amazon's privacy notice and conditions of use.</div>
                            <Card.Content header='Order Status' />
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
      
    };
};

function mapDispatchToProps(dispatch) {
    return {
        getCustomerCart: payload => dispatch(getCustomerCart(payload)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
