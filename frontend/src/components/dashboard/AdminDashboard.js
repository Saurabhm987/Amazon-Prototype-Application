import React, { Component } from 'react'
import { Container, Grid, Image, Menu, Input, Header, Placeholder, Dropdown, Button, Card, Modal, Segment } from 'semantic-ui-react'
import CentralHeader from '../header/CentralHeader'
import AddProduct from '../product/AddProduct'
import OrderCard from '../order/OrderCard'
import Graph from '../common/Graph'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import SellerProduct from '../seller/SellerProduct'
import { getUserOrder, getAdminAllOrders } from '../../actions/order'
import { getCategories, addCategory, deleteCategory } from '../../actions/product'
import axios from 'axios'
/**
 * Using action:  this.props.getAdminAllOrders(page, limit);
 * 
 * // this.props.order.userOrders will contain all orders
 * const { paginationNext } = this.props.order;
 * if(paginationNext) { // onClick next page button
 *      this.props.getAdminAllOrders(paginationNext.page, limit);
 * }
 */

class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeNavItem: 'ANALYTICS',
            salesAnalytics: {},
            productAnalytics: {},
            statsMonthly: {},
            seller: [],
            paginationLimit: 5,
            orderStatus: '',
            sellerName: '',
            sellerNameList: '',
            addValue: '',
            deleteValue: ''
        }
    }

    componentDidMount = async () => {
        // if (!this.props.isAuthenticated) {
        //     this.props.history.push('/login')
        // }
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

        await this.props.getAdminAllOrders();
        await this.props.getCategories()
    }

    orderPageNext = (e) => {
        if (this.props.order.paginationNext) {
            console.log('getting next page..');
            const { page, limit } = this.props.order.paginationNext;
            this.props.getAdminAllOrders(page, limit);
        }
    }

    orderPagePrev = (e) => {
        if (this.props.order.paginationPrev) {
            console.log('getting Prev page..');
            const { page, limit } = this.props.order.paginationPrev;
            this.props.getAdminAllOrders(page, limit);
        }
    }

    handleNavItem = (e, { name }) => this.setState({ activeNavItem: name })

    statsClick = async (e) => {
        const statMonthly = (v) => {
            return axios
                .get('analytics/staticticsmonthlyseller/' + '5e9e769c53ba4429d4835ade')
                .then(response => {
                    return response.data
                })
                .catch(err => {
                    console.log(err)
                })
        }
        const statsMonthly = await statMonthly(e.target.value)
        this.setState({
            ...this.state,
            statsMonthly
        })
    }

    render() {

        const activeNavItem = this.state.activeNavItem

        var contentPage = (
            <div>
                In process
            </div>
        )

        console.log(activeNavItem);

        if (activeNavItem == 'Manage Inventory') {
            this.props.history.push('/dashboard')
        }

        else if (activeNavItem == 'SELLERS') {
            const sellers = this.state.seller.filter(seller => {
                return (seller.name.toLowerCase().indexOf(this.state.sellerNameList.toLowerCase()) !== -1)
            })

            contentPage = (<Card fluid>
                <Input placeholder='Search Seller' onChange={(e, v) => this.setState({ ...this.state, sellerNameList: v.value })} fluid />
                {
                    sellers.map(slr => {
                        return (
                            <Card.Content>
                                <Grid columns={3}>
                                    <Grid.Column width={5}>
                                        <Placeholder>
                                            {slr.image ? (
                                                <Image src={slr.image} size='small' />
                                            ) : (
                                                    <Placeholder.Image style={{ width: '60px', height: '60px' }}></Placeholder.Image>
                                                )}

                                        </Placeholder>
                                    </Grid.Column>
                                    <Grid.Column width={8} textAlign='left'>
                                        <Header as='h5' onClick={() => this.props.history.push('/sellerprofile?id='+slr._id)}>NAME: {slr.name}</Header>
                                        <Header as='h5'>EMAIL: {slr.email}</Header>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                        <Modal trigger={<Button color='blue' onClick={this.statsClick} value={slr._id}>Monthly Statistics</Button>} centered={false}>
                                            <Modal.Content>
                                                <Graph statsMonthly={this.state.statsMonthly} />
                                            </Modal.Content>
                                        </Modal>
                                    </Grid.Column>
                                </Grid>
                            </Card.Content>
                        )
                    })}
            </Card>)
        }
        else if (activeNavItem == 'ANALYTICS') {
            contentPage = (<Graph salesAnalytics={this.state.salesAnalytics} productAnalytics={this.state.productAnalytics} />)
        }

        else if (activeNavItem == 'ORDERS') {

            const orders = this.props.order.userOrders.filter(order => {
                return ((order.status.status.indexOf(this.state.orderStatus) !== -1) && order.sellerId ?
                    (order.sellerId.name.toLowerCase().indexOf(this.state.sellerName.toLowerCase()) !== -1) : false)
            })

            contentPage = (
                <Grid columns={2}>
                    <Grid.Column width={5}>
                        <Segment textAlign='left'>
                            <Header as='h3'>Your Orders</Header>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={12} onClick={() => this.setState({ ...this.state, orderStatus: '' })}>
                                        <Header as='h3' color='blue'>All</Header>
                                    </Grid.Column>
                                    <Grid.Column width={4}>
                                        <Header as='h3' color='blue'>{this.props.order.userOrders.length}</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14} onClick={() => this.setState({ ...this.state, orderStatus: 'Ordered' })}>
                                        <Header as='h3' color='blue'>Ordered</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14} onClick={() => this.setState({ ...this.state, orderStatus: 'Packing' })}>
                                        <Header as='h3' color='blue'>Packing</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14} onClick={() => this.setState({ ...this.state, orderStatus: 'Out For Delivery' })}>
                                        <Header as='h3' color='blue'>Out For Delivery</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14} onClick={() => this.setState({ ...this.state, orderStatus: 'Delivered' })}>
                                        <Header as='h3' color='blue'>Delivered</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14} onClick={() => this.setState({ ...this.state, orderStatus: 'Cancelled' })}>
                                        <Header as='h3' color='blue'>Cancelled</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>

                            <Header as='h3'>Search by Seller</Header>
                            <Grid.Row>
                                <Input placeholder='Search...' onChange={(e, v) => this.setState({ ...this.state, sellerName: v.value })} fluid />
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

        const options = this.props.categories? this.props.categories.map(category => {return ({ key: category.name, text: category.name, value: category.name })}) : []

        // { key: 1, text: 'Ordered', value: 'Ordered' },
        // { key: 2, text: 'Packing', value: 'Packing' },
        // { key: 3, text: 'Out For Delivery', value: 'Out For Delivery' },


        return (
            <Container style={{ marginBottom: '20px',minHeight: '400px' }}>

                {/* Header Nav Bar */}
                <div style={{ margin: '65px 0px 0px 0px' }}>
                    <Menu pointing secondary>
                        <Dropdown text='INVENTORY' pointing className='link item'>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    name='Manage Inventory'
                                    active={activeNavItem === 'Manage Inventory'}
                                    onClick={this.handleNavItem}>Manage Inventory</Dropdown.Item>
                                <Modal trigger={<Dropdown.Item name='Add a Category'>Add a Category</Dropdown.Item>} centered={false}>
                                    <Modal.Header>Manage Category</Modal.Header>
                                    <Modal.Content>
                                        <Grid columns={2}>
                                            <Grid.Column width={12}>
                                                <Input placeholder='Add a Category' onChange={(e, v) => this.setState({ ...this.state, addValue: v.value })} fluid />
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Button color='blue' onClick={async () => {await this.props.addCategory({ category: this.state.addValue.toUpperCase() });await this.props.getCategories() }}>Add</Button>
                                            </Grid.Column>
                                        </Grid>
                                        <Grid columns={2}>
                                            <Grid.Column width={12}>
                                                <Menu compact>
                                                    <Dropdown placeholder='Delete Category' options={options} simple item compact onChange={(e, v) => this.setState({ ...this.state, deleteValue: v.value })} />
                                                </Menu>
                                            </Grid.Column>
                                            <Grid.Column width={4}>
                                                <Button color='red' onClick={async () => {await this.props.deleteCategory(this.state.deleteValue);await this.props.getCategories() }}>Delete</Button>
                                            </Grid.Column>
                                        </Grid>
                                    </Modal.Content>
                                </Modal>
                            </Dropdown.Menu>
                        </Dropdown>
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
    order: PropTypes.object.isRequired,
    getAdminAllOrders: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    order: state.order,
    categories: state.product.categoriesList
})

export default connect(mapStateToProps, { getUserOrder, getAdminAllOrders, getCategories, addCategory, deleteCategory })(AdminDashboard)
