import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string';
import { getproductDetail, incrementView } from '../../actions/product'
import ProductComment from './ProductComment'
import { Redirect } from 'react-router';
import { addToCart } from '../../actions/cart';
import { addSaveForLater } from '../../actions/saveforlater';
import jwtDecode from 'jwt-decode';

import {
    Grid,
    Segment,
    Image,
    Header,
    Rating,
    Button,
    Placeholder,
    Divider,
    Dropdown,
    Icon,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';


class ProductDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgUrl: '',
            userId: "",
            hovered: false,
            quantity: 1,
            productId: '',
            options: [
                { key: 1, text: '1', value: 1 },
                { key: 2, text: '2', value: 2 },
                { key: 3, text: '3', value: 3 },
                { key: 4, text: '4', value: 4 },
                { key: 5, text: '5', value: 5 },
                { key: 6, text: '6', value: 6 },
                { key: 7, text: '7', value: 7 },
                { key: 8, text: '8', value: 8 },
                { key: 9, text: '9', value: 9 },
                { key: 10, text: '10', value: 10 },

            ]
        }

        this.onClickImage = this.onClickImage.bind(this)
    }

    componentDidMount = async () => {

        if (localStorage.getItem("token") !== null) {

            var user = jwtDecode(localStorage.getItem("token"));
            await this.setState({ userId: user.userId });

            await window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

            const productId = await queryString.parse(this.props.location.search);

            this.setState({ productId: productId.id });

            await this.props.getproductDetail(productId.id)

            await this.props.incrementView(productId.id)

        } else {
            this.props.history.push('/login')
        }
    }

    handleComment = async () => {
        this.props.history.push(`/customer/reviews/?pid=${this.state.productId}`)
    }

    /////////////////////////////////////////////
    moveToCart = (e) => {
        e.preventDefault();
        const data = {

            product_id: this.props.productDetail._id,
            gift: false,
            quantity: this.state.quantity


            // id: localStorage.getItem("id")
        }
        console.log(data)

        this.props.addToCart(this.state.userId, data);
    }
    moveToSaveForLater = (e) => {
        e.preventDefault();
        this.props.addSaveForLater(this.state.userId, this.props.productDetail._id);
    }
    changeQuantity = (e, { value }) => {
        console.log(value)
        this.setState({
            quantity: value
        })
    }
    ////////////////////////////////////////////////////////
    onClickImage = async (e) => {
        e.preventDefault()

        await this.setState({
            imgUrl: e.currentTarget.dataset.url
        })
    }

    render() {


        var images = []
        ////////////////////
        var redirect = null
        // var redirectToSaveForLater =null
        console.log(this.props.cartRedirect)
        if (this.props.cartRedirect === true) {
            redirect = <Redirect to={`/cart`} />
        }
        // if (this.props.saveforlaterRedirect === true) {
        //     redirectToSaveForLater = <Redirect to={`/cart`} />
        // }


        /////////////////////////
        if (this.props.productDetail) {
            images = this.props.productDetail.images
            console.log('overallratgin -- ', this.props.productDetail.overallRating)
        }

        return (
            <div style={{ margin: '80px 5px 10px 0px', backgroundColor: 'white' }}>
                {redirect}
                {/* {redirectToSaveForLater} */}
                <Grid columns='equal'>
                    <Grid.Column width={1}>
                        {
                            images && images.length > 0
                                ?
                                (
                                    <div>
                                        {
                                            images.map((item, index) =>
                                                (
                                                    <Grid.Row data-url={item} onClick={this.onClickImage} id='imageId' style={{ border: '2px solid grey', margin: '3px' }}>
                                                        <Image src={item} alt="" style={{ width: '82.5px', height: '82.5px' }} />
                                                    </Grid.Row>
                                                )
                                            )
                                        }
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <Placeholder>
                                            <Placeholder.Image style={{ width: '82.5px', height: '82.5px' }} />
                                        </Placeholder>
                                        <Placeholder>
                                            <Placeholder.Image style={{ width: '82.5px', height: '82.5px' }} />
                                        </Placeholder>
                                        <Placeholder>
                                            <Placeholder.Image style={{ width: '82.5px', height: '82.5px' }} />
                                        </Placeholder>
                                        <Placeholder>
                                            <Placeholder.Image style={{ width: '82.5px', height: '82.5px' }} />
                                        </Placeholder>

                                    </div>
                                )
                        }

                    </Grid.Column>
                    <Grid.Column width={6}>
                        {
                            images && images.length > 0
                                ?
                                <Image
                                    src={this.state.imgUrl || images[0]}
                                    style={{ height: '730px', width: '780px' }}
                                />
                                :
                                (
                                    <Placeholder>
                                        <Placeholder.Image
                                            square
                                            style={{ height: '700px', width: '780px' }}
                                        />
                                    </Placeholder>
                                )

                        }
                    </Grid.Column>

                    {
                        this.props.productDetail
                            ?
                            (
                                <Grid.Column width={7} textAlign='left'>
                                    <Segment style={{ height: '730px' }}>
                                        <Grid.Row>
                                            <Grid.Column><Header style={{ fontWeight: '400', fontSize: '21px', lineHeight: '1.3' }}>{this.props.productDetail.name}</Header></Grid.Column>
                                        </Grid.Row>
                                        <br />
                                        {
                                            this.props.productDetail.overallRating
                                                ? <Grid.Row>
                                                    <Rating maxRating={5} defaultRating={this.props.productDetail.overallRating} icon='star' size='small' disabled />
                                                </Grid.Row>
                                                :
                                                <Rating maxRating={5} defaultRating={1} icon='star' size='small' disabled />
                                        }
                                        <br />
                                        <Divider />
                                        <Grid.Row>
                                            <span style={{ color: '#B12704', fontSize: '1.28em', fontWeight: '400' }}><b> With Deal: $ {this.props.productDetail.price}</b></span>
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            FREE delivery by Thursday
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            Deliver to Name - Address
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            <span style={{ color: 'green' }}>In Stock</span>
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            Ships from and sold by <Link to={`/sellerprofile/?id=${this.props.productDetail.sellerId}`}>{this.props.productDetail.sellerName}</Link>
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            <Grid.Column style={{ fontSize: '1.2em', fontWeight: '400' }} length='small'>
                                                {this.props.productDetail.description}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Segment>
                                </Grid.Column>
                            )
                            :
                            (
                                <Grid.Column width={7}>
                                    <Placeholder.Header>
                                        <Placeholder.Line length='small' />
                                    </Placeholder.Header>
                                    <Placeholder.Header>
                                        <Placeholder.Line length='small' />
                                    </Placeholder.Header>
                                    <Placeholder.Header>
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='medium' />
                                        <Placeholder.Line length='medium' />
                                    </Placeholder.Header>
                                    <Placeholder.Header>
                                        <Placeholder.Line length='small' />
                                    </Placeholder.Header>
                                </Grid.Column>
                            )
                    }
                    {
                        this.props.productDetail
                            ?
                            (
                                <Grid.Column width={2} textAlign='left'>
                                    <Segment style={{ height: '730px' }}>
                                        <Grid.Row>
                                            <span style={{ color: '#B12704' }}>$ {this.props.productDetail.price}</span>
                                        </Grid.Row>
                                        <Grid.Row>
                                            <span style={{ color: 'blue' }}>Prime & Free Return</span>
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            FREE delivery: Wednesday Details
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            Deliver to Name 670 Danforth Drive
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            <span style={{ color: "green" }}>In Stock</span>
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            <label>Qty:</label>
                                            <Dropdown clearable options={this.state.options} selection placeholder='Quantity' onChange={this.changeQuantity} />
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            <Button icon labelPosition='left' color='yellow' icon='shopping cart' size='small' fluid style={{ background: '#febd69', backgroundColor: '#a88734 #9c7e31 #846a29', color: 'rgb(17, 17, 17)', width: '184px', height: '29px' }}
                                                onClick={this.moveToCart}>
                                                <Icon name='shopping cart'></Icon>
                                                Add to cart
                                            </Button>
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            <Button icon labelPosition='left' color='yellow' size='small' fluid style={{ background: 'linear-gradient(rgb(246, 200, 143), rgb(237, 146, 32))', color: '#111', width: '184px', height: '29px' }}
                                                onClick={this.moveToSaveForLater}>
                                                <Icon name='play'></Icon>
                                                Save For Later
                                            </Button>
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            Secure transaction
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            Item arrives in packaging that reveals what's inside.
                                            To hide it, choose Ship in Amazon packaging at checkout.
                                        </Grid.Row>
                                    </Segment>
                                </Grid.Column>
                            )
                            :
                            (
                                <Grid.Column width={2} style={{ height: '700px' }}>
                                    <Placeholder.Header>
                                        <Placeholder.Line length='small' />
                                    </Placeholder.Header>
                                    <Placeholder.Header>
                                        <Placeholder.Line length='small' />
                                    </Placeholder.Header>
                                    <Placeholder.Header>
                                        <Placeholder.Line length='small' />
                                    </Placeholder.Header>
                                    <Grid.Row>
                                        <Placeholder.Button disabled >Add to cart</Placeholder.Button>
                                    </Grid.Row>
                                    <Grid.Row>
                                        <Placeholder.Button disabled >Add to cart</Placeholder.Button>
                                    </Grid.Row>
                                </Grid.Column>
                            )
                    }

                </Grid>
                <Divider />
                <br />
                <br />
                <Grid style={{ margin: '0px 20px 20px 30px' }}>
                    <Header>Customer reviews</Header>
                    <Grid.Row>
                        <Button
                            onClick={this.handleComment}
                            style={{ borderColor: '#ADB1B8 #A2A6AC #8D9096' }}
                        >Write a Customer Review</Button>
                    </Grid.Row>
                    <br />
                    <Grid.Row>
                        <Segment style={{ width: '100%' }}>
                            {
                                this.state.productId&&this.props.productDetail
                                    ?
                                    <Grid.Column stretched columns={1} textAlign='left'>
                                        <ProductComment rating={this.props.productDetail.overallRating} productId={this.state.productId} />
                                    </Grid.Column>
                                    : null
                            }
                        </Segment>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

ProductDetail.propTypes = {
    productDetail: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    incrementView: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    productDetail: state.product.productDetail,
    cartRedirect: state.cart.cartRedirect,
    // saveforlaterRedirect:state.cart.saveforlaterRedirect
})
// function mapDispatchToProps(dispatch) {
//     return {
//         getproductDetail: (id) => dispatch(getproductDetail(id)),
//         addToCart: payload => dispatch(addToCart(payload)),
//         addSaveForLater: (id, productid) => dispatch(addSaveForLater(id, productid))
//     };
// }
export default connect(mapStateToProps, { addToCart, addSaveForLater, getproductDetail, incrementView })(ProductDetail);
// export default connect(mapStateToProps, { getproductDetail })(ProductDetail);