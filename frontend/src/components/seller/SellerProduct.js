import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { getSellerProducts } from '../../actions/product'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import {

    Placeholder,
    Grid,
    Rating,
    Image,
    Divider,
    Button,
    TextArea,

} from 'semantic-ui-react'

class SellerProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            editmode: false,
            adminAccess: false,
        }

    }

    componentDidMount = async () => {

        const sellerId = await queryString.parse(this.props.location.search);

        if (this.props.user) {

            var userId = await this.props.user.userId

            console.log('did mnt id - ', userId)

            if (userId === sellerId.id) {
                this.setState({ adminAccess: true });
            }
        }


        await this.props.getSellerProducts(sellerId.id)
        await this.setState({ loading: false })
    }

    saveHandler = async () => {
        //savehandler
    }

    render() {

        console.log('this adminaccess - ', this.state.adminAccess)

        const sellerId = queryString.parse(this.props.location.search);

        var adminAccess = false

        if(this.props.user){

            console.log('userId - ',this.props.user.userId )
            console.log('sellerId - ',sellerId )

            if(sellerId.id === this.props.user.userId){
                adminAccess = true
            }

        }

        console.log('adminAccess - ', adminAccess)

        let placeholder = (
            <Fragment>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={2}>
                            <Placeholder>
                                <Placeholder.Image style={{ width: '210px', height: '210px' }}></Placeholder.Image>
                            </Placeholder>
                        </Grid.Column>
                        <Grid.Column>
                            <Placeholder>
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                                <Placeholder.Line />
                            </Placeholder>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Fragment>
        )

        let _ = [{ 'name': 'name', 'data': 'data' }, { 'name': 'name2', 'data': 'data2' }, { 'name': 'name2', 'data': 'data2' }]

        return (
            <div style={{ marginTop: '80px', backgroundColor: 'white' }}>
                <Grid style={{ marginLeft: '80px' }}>
                    <Grid.Row style={{ marginLeft: '40px' }}>
                        <h3>Price and other details may vary based on size and color</h3>
                    </Grid.Row>

                </Grid>
                <br />
                {
                    this.props.productList && this.props.productList.length > 0
                        ?
                        (
                            <div>
                                {
                                    this.props.productList.map((item, index) =>
                                        <Grid columns={1} textAlign='left'>
                                            {
                                                this.state.loading
                                                    ?
                                                    (
                                                        <div style={{ marginLeft: '30px' }}>
                                                            {placeholder}
                                                            {placeholder}
                                                            {placeholder}
                                                        </div>
                                                    )
                                                    :
                                                    (
                                                        <Fragment textAlign='left'>
                                                            <Grid columns={3}>
                                                                <Grid.Row>
                                                                    <Grid.Column width={1}>
                                                                    </Grid.Column>
                                                                    <Grid.Column width={2}>
                                                                        <Image src={item.images[0]} />
                                                                    </Grid.Column>
                                                                    <Grid.Column>
                                                                        {
                                                                            this.state.editmode
                                                                                ?
                                                                                (
                                                                                    <Grid.Row>
                                                                                        <TextArea placeholder='name' />
                                                                                    </Grid.Row>
                                                                                )
                                                                                :
                                                                                (
                                                                                    <Grid.Row>
                                                                                        <h3>
                                                                                            {item.name}
                                                                                        </h3>
                                                                                    </Grid.Row>
                                                                                )
                                                                        }
                                                                        <Grid.Row>
                                                                            <Rating maxRating={5} defaultRating={3} icon='star' size='small' disabled />
                                                                        </Grid.Row>
                                                                        <Grid.Row>
                                                                            <b>Best Price: $ {item.price} </b>
                                                                        </Grid.Row>
                                                                        <Grid.Row>
                                                                            <b>Gift Price: $ {item.giftPrice} </b>
                                                                        </Grid.Row>
                                                                        <Grid.Row>
                                                                            <b>Quantity: {item.quantity} </b>
                                                                        </Grid.Row>
                                                                        <Grid.Row>
                                                                            <span style={{ color: 'blue' }}><b>prime</b></span>
                                                                        </Grid.Row>
                                                                        <br />
                                                                        <Grid.Row verticalAlign='bottom'>
                                                                            {
                                                                                this.state.editmode
                                                                                    ?
                                                                                    (
                                                                                        <div>
                                                                                            <Button color='green' onClick={this.saveHandler}>Save</Button>
                                                                                            <Button color='olive' onClick={() => this.setState({ editmode: false })}>Cancel</Button>
                                                                                        </div>
                                                                                    )
                                                                                    :
                                                                                    (
                                                                                        <div>
                                                                                            {
                                                                                                adminAccess
                                                                                                    ?
                                                                                                    (
                                                                                                        <div>
                                                                                                            <Button color='green' onClick={() => this.setState({ editmode: true })}>Edit</Button>
                                                                                                            <Button color='red'>Delete</Button>
                                                                                                        </div>
                                                                                                    )
                                                                                                    : null
                                                                                            }

                                                                                        </div>
                                                                                    )
                                                                            }
                                                                        </Grid.Row>
                                                                    </Grid.Column>
                                                                </Grid.Row>
                                                                <Divider />
                                                            </Grid>
                                                        </Fragment>

                                                    )
                                            }
                                        </Grid>
                                    )
                                }
                            </div>
                        )
                        :
                        (
                            <div style={{ marginLeft: '30px' }}>
                                {placeholder}
                                {placeholder}
                                {placeholder}
                            </div>
                        )
                }

            </div>
        );
    }
}

SellerProduct.propTypes = {
    getSellerProducts: PropTypes.func.isRequired,
    productList: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    isAuthenticated:PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    productList: state.product.productList,
    user: state.auth.user,
    isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getSellerProducts })(SellerProduct)