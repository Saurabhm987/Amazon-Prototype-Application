import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { getUserOrder, updateStatus } from '../../actions/order';
import { setupOrderedProductForDetail } from '../../actions/product';
import { Container, Pagination, Grid, Segment, Menu, Header, Placeholder, Dropdown, Button, Card, Image } from 'semantic-ui-react'
import JwtDecode from 'jwt-decode';
import { USER_CUSTOMER, USER_SELLER, USER_ADMIN } from '../controller/config';




var _ = require('lodash');
class orderCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activePage: 1,
            i:0,
            f:4
          };
    }

    handlePageChange = (e,d) => {
        console.log(d.activePage);
        let temp = d.activePage -1
        this.setState({ 
            activePage: d.activePage ,
            i: (temp*4),
            f: (d.activePage*4)
        });
    }

    render() {
        var orders = _.mapValues(_.groupBy(this.props.orders, 'orderId'), clist => clist.map(order => _.omit(order, 'orderId')));



        const options = (localStorage.getItem('token')) ? ((JwtDecode(localStorage.getItem('token'))).userType === USER_ADMIN ? [
            { key: 1, text: 'Package Arrived', value: 'Package Arrived' },
            { key: 2, text: 'Out For Delivery', value: 'Out For Delivery' },
            { key: 3, text: 'Delivered', value: 'Delivered' },
        ] : [
                { key: 1, text: 'Ordered', value: 'Ordered' },
                { key: 2, text: 'Packing', value: 'Packing' },
                { key: 3, text: 'Out For Delivery', value: 'Out For Delivery' },
            ]) : []
        return (
            <div>
                {Object.keys(orders).map(orderId => {

                    return (
                        <Card fluid>
                            <Card.Content textAlign='left'>
                                <Header as='h3'>ORDER ID: {orderId}</Header>
                            </Card.Content>
                            {orders[orderId].map(product => {
                                return (
                                    <Card.Content>
                                        <Grid columns={3}>
                                            <Grid.Column width={3}>
                                                <Placeholder>
                                                    {product.productId.images[0] ? (
                                                        <Image src={product.productId.images[0]} size='small' />
                                                    ) : (
                                                            <Placeholder.Image style={{ width: '100px', height: '100px' }}></Placeholder.Image>
                                                        )}

                                                </Placeholder>
                                            </Grid.Column>
                                            <Grid.Column width={8} textAlign='left'>
                                                <Grid.Row onClick={() => this.props.history.push('/productdetails/?id=' + product.productId._id)}>
                                                    <Header as='h4'>{product.productId.name}</Header>
                                                </Grid.Row>
                                                <br></br>
                                                <Grid.Row>
                                                    <Header as='h5' color='grey'>Current Status: {product.status.status}</Header>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    {(localStorage.getItem('token')) ? ((JwtDecode(localStorage.getItem('token'))).userType !== USER_CUSTOMER ?
                                                        <Menu compact>
                                                            <Dropdown placeholder='Change Status' options={options} simple item compact onChange={(e, v) => this.props.updateStatus(orderId, product.productId._id, v.value)} />
                                                        </Menu> : <div></div>) : (<div></div>)
                                                    }
                                                </Grid.Row>
                                            </Grid.Column>
                                            <Grid.Column width={5}>
                                                <Grid.Row>
                                                    <Button color='blue' floated='right' style={{ height: '35px', width: '150px', margin: '5px' }} onClick={() => { this.props.setupOrderedProductForDetail({ ...product, 'orderId': orderId }); this.props.history.push('/orderdetails') }}>Details</Button>
                                                </Grid.Row>
                                                {product.status.status !== 'Delivered' ? (product.status.status !== 'Cancelled' ?
                                                    <Grid.Row>
                                                        <Button color='red' floated='right' style={{ height: '35px', width: '150px', margin: '5px' }} onClick={() => this.props.updateStatus(orderId, product.productId._id, 'Cancelled')}>Cancel</Button>
                                                    </Grid.Row> : <div></div>) : <div></div>}
                                            </Grid.Column>
                                        </Grid>
                                    </Card.Content>
                                )
                            }
                            )}
                        </Card>
                    )
                }).slice(this.state.i,this.state.f)}
                <Grid columns={1}>
                <Grid.Column textAlign='center'>
                <Pagination
                    activePage={this.state.activePage}
                    defaultActivePage={5}
                    totalPages={10}
                    onPageChange={this.handlePageChange}
                />
                </Grid.Column>
                </Grid>
            </div>
        )
    }
}

orderCard.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    updateStatus: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, {
    updateStatus,
    setupOrderedProductForDetail
})(withRouter(orderCard))
