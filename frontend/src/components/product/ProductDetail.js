import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string';
import { getproductDetail } from '../../actions/product'
import ProductComment from './ProductComment'

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
            hovered: false,
            options: [
                { key: 1, text: '1', value: 1 },
                { key: 2, text: '2', value: 2 },
                { key: 3, text: '3', value: 3 },
                { key: 4, text: '4', value: 4 },
                { key: 5, text: '5', value: 5 },
                { key: 6, text: '6', value: 6 },
                { key: 7, text: '7', value: 7 },
            ]
        }

        this.onClickImage = this.onClickImage.bind(this)
    }

    componentDidMount = async () => {

        await window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

        const productId = await queryString.parse(this.props.location.search);

        await this.props.getproductDetail(productId.id)

    }

    onClickImage = async (e) => {
        e.preventDefault()

        await this.setState({
            imgUrl: e.currentTarget.dataset.url
        })
    }

    render() {

        var images = []

        if (this.props.productDetail) {
            images = this.props.productDetail.images
        }

        return (
            <div style={{ margin: '80px 5px 10px 0px', backgroundColor: 'white' }}>
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
                                        <Grid.Row>
                                            <Rating maxRating={5} defaultRating={3} icon='star' size='small' disabled />
                                        </Grid.Row>
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
                                            <Dropdown clearable options={this.state.options} selection placeholder='Quantity' />
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            <Button icon labelPosition='left' color='yellow' icon='shopping cart' size='small' fluid style={{ background: '#febd69', backgroundColor: '#a88734 #9c7e31 #846a29', color: 'rgb(17, 17, 17)', width: '184px', height: '29px' }}>
                                                <Icon name='shopping cart'></Icon>
                                                Add to cart
                                            </Button>
                                        </Grid.Row>
                                        <br />
                                        <Grid.Row>
                                            <Button icon labelPosition='left' color='yellow' size='small' fluid style={{ background: 'linear-gradient(rgb(246, 200, 143), rgb(237, 146, 32))', color: '#111', width: '184px', height: '29px' }}>
                                                <Icon name='play'></Icon>
                                                Buy Now
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
                    <br />
                    <Grid.Row>
                        <Segment style={{ width: '100%' }}>
                            <Grid.Column stretched columns={1} textAlign='left'>
                                <ProductComment />
                            </Grid.Column>
                        </Segment>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}

ProductDetail.propTypes = {
    productDetail: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    productDetail: state.product.productDetail
})

export default connect(mapStateToProps, { getproductDetail })(ProductDetail);