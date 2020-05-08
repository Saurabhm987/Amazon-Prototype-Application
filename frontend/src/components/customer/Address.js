import React, { Component } from 'react';
import { Header, Card, Button, Grid } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'
import { getAddress, updateAddress, removeAddress, setDefaultAddress } from '../../actions/customer'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import queryString from 'query-string';
import JwtDecode from 'jwt-decode';

class Address extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentAddressId: '',
        }
    }

    componentDidMount = async () => {

        let token = localStorage.getItem('token')
        if (token !== null) {
            let userData = JwtDecode(token)
            this.setState({ userId: userData.userId });
            await this.props.getAddress(userData.userId)

        } else {
            this.props.history.push('/login')
        }
    }

    handleChange = async (e, { name, value }) => {

        this.setState({ [name]: value });
    }

    handleRemove = async (e) => {

        let selectedAddress = e.currentTarget.dataset.id

        await this.props.removeAddress(this.state.userId, selectedAddress);
    }

    handleEdit = async (e) => {

        this.props.history.push(`customer/addressupdate/?id=${e.currentTarget.dataset.id}`)

    }

    render() {
        console.log(this.state.customerAddress);
        if (this.props.addressList) {
            var getAddress = this.props.addressList.map(address => {
                // var str = queryString.stringify(address);
                return (
                    <Card >
                        <Card.Content onClick={() => {this.props.setDefaultAddress(address);this.props.history.push(`/checkout`)}}>
                            <Card.Meta>{address.street1}</Card.Meta>
                            <Card.Meta>{address.street2}</Card.Meta>
                            <Card.Meta>{address.city}</Card.Meta>
                            <Card.Meta>{address.state}</Card.Meta>
                            <Card.Meta>{address.country}</Card.Meta>
                            <Card.Meta>{address.pincode}</Card.Meta>
                            <Card.Meta>{address.phone}</Card.Meta>
                        </Card.Content>
                        <Card.Content extra textAlign='center'>
                            <div>
                                <Link to={{ pathname: '/customer/addressupdate', state: { id: address._id, userId: this.state.userId } }} style={{ margin: '5px', color: '#0066c0', fontSize: '13px', lineHeight: '19px' }} className="nav-link" >
                                    Edit
                                </Link>
                                 |
                                <Link onClick={this.handleRemove} data-id={address._id} style={{ margin: '5px', color: '#0066c0', fontSize: '13px', lineHeight: '19px' }} className="nav-link">
                                    Remove
                                </Link>
                            </div>
                        </Card.Content>
                    </Card>
                )
            })
        }

        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <div>
                    <Header as='h1'>Your Addresses</Header>
                </div>
                <br />
                <br />
                <Grid columns={1} centered>
                    <Grid.Column width={10}>
                        <Grid.Row textAlign='center'>
                            <Card.Group itemsPerRow={3}>
                                {getAddress}
                            </Card.Group>
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
                <br />
                <br />
                <br />
                <div>
                    <Link to='/addAddress' className="nav-link">
                        <Button primary>Add Address</Button>
                    </Link>
                </div>
                <br />
                <br />
            </div >

        )
    }
}


Address.propTypes = {
    addressList: PropTypes.func.isRequired,
    getAddress: PropTypes.array.isRequired,
    updateAddress: PropTypes.func.isRequired,
    removeAddress: PropTypes.func.isRequired,
    setDefaultAddress: PropTypes.func.isRequired
}


const maptStateToProps = state => ({
    addressList: state.customer.addressList
})

export default connect(maptStateToProps, { getAddress, updateAddress, removeAddress, setDefaultAddress })(withRouter(Address));