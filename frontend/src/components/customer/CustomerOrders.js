import React, { Component } from 'react'
import OrderCard from '../order/OrderCard'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { getUserOrder } from '../../actions/order';
import { Input, Menu, Segment, Container } from 'semantic-ui-react'


class CustomerOrders extends Component {
    state = { activeItem: 'All' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    componentDidMount = async () => {
        let token = await localStorage.getItem('token')
        if (token === null) {
            this.props.history.push('/login')
        }
        await this.props.getUserOrder();
    }


    render() {
        let orders = this.props.order.userOrders
        if (this.state.activeItem !== 'All') {
            orders = this.props.order.userOrders.filter(order => {
                return (this.state.activeItem === 'Active' ?
                    ((order.status.status.indexOf('Cancelled') === -1) && (order.status.status.indexOf('Delivered') === -1)) : order.status.status.indexOf('Cancelled') !== -1)
            })
        }

        const { activeItem } = this.state
        return (
            <Container style={{minHeight: '400px', margin: '100px'}}>
                <Menu attached='top' tabular>
                    <Menu.Item
                        name='All'
                        active={activeItem === 'All'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Active'
                        active={activeItem === 'Active'}
                        onClick={this.handleItemClick}
                    />
                    <Menu.Item
                        name='Cancelled'
                        active={activeItem === 'Cancelled'}
                        onClick={this.handleItemClick}
                    />
                </Menu>

                <Segment attached='bottom'>
                    <Container>
                        <OrderCard orders={orders}></OrderCard>
                    </Container>
                </Segment>
            </Container>

        )
    }
}

CustomerOrders.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    getUserOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    order: state.order,
    categoryList: state.product.categoryList
})

export default connect(mapStateToProps, {
    getUserOrder
})(CustomerOrders)
