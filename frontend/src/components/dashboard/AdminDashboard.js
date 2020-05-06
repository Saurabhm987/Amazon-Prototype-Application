import React, { Component } from 'react'
import { Container, Grid, Segment, Menu, Header, Placeholder, Dropdown, Button, Card } from 'semantic-ui-react'
import CentralHeader from '../header/CentralHeader'
import AddProduct from '../product/AddProduct'
import Graph from '../common/Graph'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import SellerProduct from '../seller/SellerProduct'
import { getUserOrder } from '../../actions/order'
import axios from 'axios'

class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeNavItem: 'ANALYTICS',
            salesAnalytics: {},
            productAnalytics: {},
            seller: []
        }
    }

    componentDidMount = async () => {
        if (!this.props.isAuthenticated) {
            this.props.history.push('/login')
        }
        const sales = () => {
            return axios
              .get('analytics/sales')
              .then(response => {
                return response.data
              })
              .catch(err => {
                console.log(err)
              })
          }
        const salesAnalytics = await sales()

        const products = () => {
            return axios
              .get('analytics/products')
              .then(response => {
                return response.data
              })
              .catch(err => {
                console.log(err)
              })
          }
        const productAnalytics = await products()

        const sellers = () => {
            return axios
              .get('seller')
              .then(response => {
                return response.data
              })
              .catch(err => {
                console.log(err)
              })
          }
        const seller = await sellers()
        this.setState({
            ...this.state,
            salesAnalytics,
            productAnalytics,
            seller
        })
    }

    handleNavItem = (e, { name }) => this.setState({ activeNavItem: name })

    render() {
        
        const  activeNavItem = this.state.activeNavItem

        var contentPage = (
            <div>
                In process
            </div>
        )

        console.log(activeNavItem);

        if (activeNavItem == 'PROFILE') {
            contentPage = (<SellerProduct />)
        }
        else if (activeNavItem == 'INVENTORY') {
            contentPage = (<AddProduct />)
        }
        else if (activeNavItem == 'SELLERS') {
            contentPage = (<Card fluid>
                {this.state.seller.map(slr => {
                    return (
                        <Card.Content>
                            <Grid columns={3}>
                                <Grid.Column width={8}>
                                    <Header as='h4'>EMAIL: {slr.email}</Header>
                                </Grid.Column>
                                <Grid.Column width={8}>
                                    <Header as='h4'>NAME: {slr.name}</Header>
                                </Grid.Column>
                            </Grid>
                        </Card.Content>
                    )
                })}
            </Card>)
        }
        else if (activeNavItem == 'ANALYTICS') {
            contentPage = (<Graph salesAnalytics={this.state.salesAnalytics} productAnalytics={this.state.productAnalytics}/>)
        }

        else if (activeNavItem == 'ORDERS') {
            const options = [
                { key: 1, text: 'Ordered', value: 1 },
                { key: 2, text: 'Packing', value: 2 },
                { key: 3, text: 'Out For Delivery', value: 3 },
            ]
            contentPage = this.state.orders.map(order => {

                return (
                    <Card fluid>
                        <Card.Content>
                            <Header as='h3'>ORDER ID: {order.id}</Header>
                        </Card.Content>
                        {order.products.map(product => {
                            return (
                                <Card.Content>
                                    <Grid columns={3}>
                                        <Grid.Column width={3}>
                                            <Placeholder>
                                                <Placeholder.Image style={{ width: '100px', height: '100px' }}></Placeholder.Image>
                                            </Placeholder>
                                        </Grid.Column>
                                        <Grid.Column width={8}>
                                            <Grid.Row>
                                                {product.name}
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Menu compact>
                                                    <Dropdown text='Order Status' options={options} simple item />
                                                </Menu>
                                            </Grid.Row>
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                            <Grid.Row>
                                                <Button color='blue' floated='right' style={{ height: '35px', width: '150px', margin: '5px' }}>Billing Details</Button>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Button color='blue' floated='right' style={{ height: '35px', width: '150px', margin: '5px' }}>Payment Details</Button>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Button color='blue' floated='right' style={{ height: '35px', width: '150px', margin: '5px' }}>Delivery Address</Button>
                                            </Grid.Row>
                                        </Grid.Column>
                                    </Grid>
                                </Card.Content>
                            )
                        }
                        )}
                    </Card>
                )
            })
        }


        return (
            <Container style={{ marginBottom: '20px' }}>

                {/* Header Nav Bar */}
                <div style={{ margin: '65px 0px 0px 0px' }}>
                    <Menu pointing secondary>
                        <Menu.Item
                            name='PROFILE'
                            active={activeNavItem === 'PROFILE'}
                            onClick={this.handleNavItem}
                        />
                        <Menu.Item
                            name='INVENTORY'
                            active={activeNavItem === 'INVENTORY'}
                            onClick={this.handleNavItem}
                        />
                        <Menu.Item
                            name='SELLERS'
                            active={activeNavItem === 'SELLERS'}
                            onClick={this.handleNavItem}
                        />
                        <Menu.Item
                            name='ORDERS'
                            active={activeNavItem === 'ORDERS'}
                            onClick={this.handleNavItem}
                        />
                        <Menu.Item
                            name='ANALYTICS'
                            active={activeNavItem === 'ANALYTICS'}
                            onClick={this.handleNavItem}
                        />
                        <Menu.Menu position='right'>
                            <Menu.Item
                                name='logout'
                                active={activeNavItem === 'logout'}
                                onClick={this.handleNavItem}
                            />
                        </Menu.Menu>
                    </Menu>
                </div>
                <br></br>

                {contentPage}

            </Container>
        )
    }
}

AdminDashboard.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    getUserOrder: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getUserOrder })(AdminDashboard)
