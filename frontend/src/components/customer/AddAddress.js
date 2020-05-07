import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios'
import JwtDecode from 'jwt-decode'
import { addAddress } from '../../actions/customer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
const qs = require('querystring')

class AddAddress extends Component {
    constructor(props) {
        super(props)

        this.state = {
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            pincode: '',
            phone: ''
        }
    }

    onchange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = async e => {
        e.preventDefault()

        const newAddress = {
            street1: this.state.street1,
            street2: this.state.street2,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            pincode: this.state.pincode,
            phone: this.state.phone
        }

        await this.props.addAddress(newAddress)

        this.props.history.push('/customer/address')
    }   

    render() {
        return (
            <div>
                <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <div style={{ marginTop: "72px" }}>
                        <Header as='h1'>Add a New Address</Header>
                    </div>
                    <br></br>
                </div>

                <Grid textAlign='center' style={{ height: '100vh' }} horizontalAlign='middle'>
                    <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid
                                    name='street1'
                                    value={this.state.street1}
                                    onChange={this.onchange}
                                    label="Street1" placeholder='Street1' />
                                <Form.Input fluid
                                    name='street2'
                                    value={this.state.street2}
                                    onChange={this.onchange}
                                    label="Street2" placeholder='Street2' />
                                <Form.Input fluid
                                    name='city'
                                    value={this.state.city}
                                    onChange={this.onchange}
                                    label="City" placeholder='City' />
                                <Form.Input
                                    name='state'
                                    value={this.state.state}
                                    onChange={this.onchange}
                                    label="State" placeholder='State' />
                                <Form.Input
                                    name='country'
                                    value={this.state.country}
                                    onChange={this.onchange}
                                    label="Country" placeholder='Country' />
                                <Form.Input
                                    name='pincode'
                                    value={this.state.pincode}
                                    onChange={this.onchange}
                                    label="Pincode" placeholder='Pincode' />
                                <Form.Input
                                    name='phone'
                                    value={this.state.phone}
                                    onChange={this.onchange}
                                    label="Phone" placeholder='Phone' />
                                <Button fluid
                                    onClick={this.onSubmit}
                                    color='yellow'
                                    size='small'
                                    style={{ border: "solid 1px black" }}>
                                    Add Address
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

AddAddress.propTypes = {
    addressList: PropTypes.array.isRequired,
    addAddress: PropTypes.func.isRequired,
}


const mapStateToProps = state => ({
    addressList: state.customer.addressList
})


export default connect(mapStateToProps, { addAddress })(AddAddress);