import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addSaveForLater, deleteSaveForLater, fetchSaveForLater, moveToCart } from '../../actions/saveforlater';
import { Link } from 'react-router-dom';
import './cart.css';
import { Redirect } from 'react-router';
import jwtDecode from 'jwt-decode';

import {
    Select,
    Divider,
    Grid,

} from 'semantic-ui-react';

class Saveforlater extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],

            rendercheckout: false,
            userId: ""

        };
    }
    componentDidMount = async () => {
        if (localStorage.getItem("token") !== null) {
            var user = jwtDecode(localStorage.getItem("token"));
            await this.setState({ userId: user.userId });

        }
        // 5ea6217130c53720685db7dd
        await this.props.fetchSaveForLater(this.state.userId)
        // this.props.fetchSaveForLater(sessionStorage.getItem("id"))
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cart: nextProps.cart,

        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }




    deleteProduct = (product_id, type) => {
        console.log(type)
        this.props.deleteSaveForLater({ customer_id: this.state.userId, product_id: product_id, type: type })
    }

    redirectToCheckout = () => {
        this.setState({
            rendercheckout: true
        })
    }

    render() {
        let saveforlaterlist = null;
        let customersaveforlater = [];

        let gift = false;
        let redirectVar = null;
        customersaveforlater = this.state.cart;
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
            redirectVar = <Redirect to={`/customer/${sessionStorage.getItem('id')}/checkout`} />

        if (customersaveforlater&&customersaveforlater.length) {
           
            saveforlaterlist = (<div >
                {customersaveforlater.map((cartitem, index) => {
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
                                    <Link class='productlink' to={"/product/" + cartitem.productId._id}>
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
                                <div class='qtyContainer'>
                                       
                                        <span class='deleteProduct' onClick={() => { this.deleteProduct(cartitem.productId._id, "delete") }}>Delete</span>
                                        <span class="separator"></span>
                                        <span class='deleteProduct' onClick={() => { this.deleteProduct(cartitem.productId._id, "movetocart") }}>Move to cart</span>
                                    </div>
                                </Grid.Row>
                             
                            </Grid.Column>
                            <Grid.Column width={2}>
                            <div class='col-md-2 productprice'>
                                    ${cartitem.productId.price}
                                </div>                            </Grid.Column>
                        </Grid>
                        </div></div>

                    )
                })}
            </div>)

          
        }


        return (
            <div class="cartContainer">
                {redirectVar}
                <Grid>
                    <Grid.Column width={12} style={{ marginTop: '60px' }}>
                        <Grid.Row>
                        </Grid.Row>
                        <Grid.Row> </Grid.Row>
                        {(customersaveforlater.length === 0) ? <h2 class='shoppingcart'></h2> :
                            <div>
                                <Grid.Row>
                                    <h2 class='shoppingcart'>Save for Later</h2>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column width={12}>

                                    </Grid.Column>

                                </Grid.Row>

                                <Grid.Row style={{ marginTop: '20px' }}>
                                    {saveforlaterlist}
                                </Grid.Row>


                            </div>}
                    </Grid.Column>
                    <Grid.Column width={1}>

                    </Grid.Column>

                </Grid>

            </div>
        )


    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart.saveforlaterlist,


    };
};

function mapDispatchToProps(dispatch) {
    return {
        fetchSaveForLater: payload => dispatch(fetchSaveForLater(payload)),
        deleteSaveForLater: payload => dispatch(deleteSaveForLater(payload)),
        addSaveForLater: payload => dispatch(addSaveForLater(payload))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Saveforlater);