import React, { Component } from 'react'
import { Container, Grid, Segment, Menu, Header, Placeholder, Dropdown, Button, Card, Image } from 'semantic-ui-react'
import CentralHeader from '../header/CentralHeader'
import AddProduct from '../product/AddProduct'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import jwtDecode from 'jwt-decode';
import { productCategories } from '../../actions/product'
import SellerProduct from '../seller/SellerProduct'
import { getUserOrder, updateStatus } from '../../actions/order';
import { orderStatus } from '../controller/config';
import axios from 'axios'
import Graph from '../common/Graph'
import JwtDecode from 'jwt-decode'
import OrderCard from '../order/OrderCard'
var _ = require('lodash');


class SellerCentral extends Component {
    constructor(props) {
        super(props);


        this.state = {
            activeNavItem: 'REPORTS',
            activeItem: 'REPORTS',
            orderStatus: '',
            stats: [],
            statsMonthly : [],
            user:{}
        }

    }

    componentDidMount = async () => {

        await window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        
        let token = await localStorage.getItem('token')
        if (token === null) {
            this.props.history.push('/login')
        }

        let user = JwtDecode(token)
        this.setState({user : user});

        await this.props.getUserOrder();
        const stat = () => {
            return axios
              .get('analytics/sellerstatictics')
              .then(response => {
                return response.data
              })
              .catch(err => {
                console.log(err)
              })
          }
        const stats = await stat()
        const statMonthly = () => {
            return axios
              .get('analytics/sellermonthlystatictics')
              .then(response => {
                return response.data
              })
              .catch(err => {
                console.log(err)
              })
          }
        const statsMonthly = await statMonthly()
        this.setState({
            ...this.state,
            stats,
            statsMonthly
        })
    }

    redirect = async () => {
        this.props.history.push(`/sellerproducts/?id=${this.state.user.userId}`)
    }


    handleNavItem = (name) => this.setState({ activeNavItem: name })

    render() {
        const activeNavItem = this.state.activeNavItem

        var contentPage = (
            <div>
                In process
            </div>
        )

        console.log(activeNavItem);

        if (activeNavItem == 'Manage Inventory') {
           this.redirect()
        }
        else if (activeNavItem == 'Add a Product') {
            contentPage = (<AddProduct open ={true} />)
        }
        else if (activeNavItem == 'REPORTS') {
            console.log(this.state.statsMonthly);
            console.log(this.state.stats);
            contentPage = (<Graph stats={this.state.stats} statsMonthly={this.state.statsMonthly}/>)
        }

        else if (activeNavItem == 'ORDERS') {

            console.log(this.props.order.userOrders);
            const orders = this.props.order.userOrders.filter(order => {
                return (order.status.status.indexOf(this.state.orderStatus) !== -1)
            })
            
            contentPage = (
                <Grid columns={2}>
                    <Grid.Column width={5}>
                        <Segment textAlign='left'>
                            <Header as='h3'>Your Orders</Header>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={12} onClick={() => this.setState({...this.state,orderStatus:''})}>
                                        <Header as='h3' color='blue'>All</Header>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header as='h3' color='blue'>{this.props.order.userOrders.length}</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14} onClick={() => this.setState({...this.state,orderStatus:'Ordered'})}>
                                        <Header as='h3' color='blue'>Ordered</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14} onClick={() => this.setState({...this.state,orderStatus:'Packing'})}>
                                        <Header as='h3' color='blue'>Packing</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14} onClick={() => this.setState({...this.state,orderStatus:'Out For Delivery'})}>
                                        <Header as='h3' color='blue'>Out For Delivery</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14} onClick={() => this.setState({...this.state,orderStatus:'Delivered'})}>
                                        <Header as='h3' color='blue'>Delivered</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14} onClick={() => this.setState({...this.state,orderStatus:'Cancelled'})}>
                                        <Header as='h3' color='blue'>Cancelled</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>

                            <Header as='h3'>Seller Fulfilled</Header>
                            <Grid.Row>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last day</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last 7 days</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>

                            <Header as='h3'>Fulfilled by Amazon</Header>
                            <Grid.Row>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last day</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last 7 days</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Segment textAlign='left'>
                            <OrderCard orders={orders}></OrderCard>
                        </Segment>
                    </Grid.Column>
                </Grid>
            )
        }


        return (
            <Container style={{ marginBottom: '20px' }}>
                <CentralHeader handleNavItem={this.handleNavItem}></CentralHeader>
                <br></br>
                {contentPage}
            </Container>
        )
    }
}

SellerCentral.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    productCategories: PropTypes.array.isRequired,
    getUserOrder:PropTypes.func.isRequired,
    updateStatus:PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    order: state.order,
    categoryList: state.product.categoryList
})

export default connect(mapStateToProps, {
    getUserOrder,
    updateStatus
})(withRouter(SellerCentral))
