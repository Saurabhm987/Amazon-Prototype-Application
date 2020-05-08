import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios'
import JwtDecode from 'jwt-decode'
import { addAddress, setDefaultAddress } from '../../actions/customer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import queryString from 'query-string';
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
            phone: '',
            st1err: false,
            pherr: false,
            cerr: false,
            cnerr: false,
            perr: false,
            sterr: false,
            error: true,

        }



    }

    onchange = async e => {

        const { name, value } = e.target

        if (name === 'street1') {
            console.log('inside')
            if (value.length < 2) {
                await this.setState({ error: true, st1err: true });
            } else {
                await this.setState({ error: false, st1err: false });
            }
        } else if (name === 'city') {

            if (value.length < 2) {
                await this.setState({ error: true, cerr: true });
            } else {
                await this.setState({ error: false, cerr: false });
            }
        } else if (name === 'pincode') {

            if (value.length !== 5) {
                await this.setState({ error: true, perr: true });
            } else {
                await this.setState({ error: false, perr: false });
            }
        } else if (name === 'state') {

            if (value.length < 2) {
                this.setState({ error: true, sterr: true });
            } else {
                this.setState({ error: false, sterr: false });
            }
        } else if (name === 'country') {

            if (value.length < 2) {
                this.setState({ error: true, cnerr: true });
            } else {
                this.setState({ error: false, cnerr: false });
            }
        } else if (name === 'phone') {

            if (value.length !== 10) {
                this.setState({ error: true, pherr: true });
            } else {
                this.setState({ error: false, pherr: false });
            }
        }

        await this.setState({ [name]: value })
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
        await this.props.setDefaultAddress(newAddress)

        if (!this.state.error && newAddress.street1 !== '' && newAddress.street2 !== '' && newAddress.city !== '' && newAddress.state !== '' && newAddress.country !== '' && newAddress.pincode !== '' && newAddress.phone !== '') {

            if (queryString.parse(this.props.location.search).id !== '1') { await this.props.addAddress(newAddress); this.props.history.push('/customer/address') }
            else { await this.props.history.push(`/checkout`) }
            this.props.history.push('/customer/address')

        } else {

            alert('Please enter valid details ')
        }

    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <div style={{ marginTop: "72px" }}>
                        <Header as='h1'>Add a New Address</Header>
                    </div>
                    <br></br>
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
                                    label="Street1" placeholder='Street1'
                                    error={this.state.st1err}
                                />
                                <Form.Input fluid
                                    name='street2'
                                    value={this.state.street2}
                                    onChange={this.onchange}
                                    label="Street2" placeholder='Street2'

                                />
                                <Form.Input fluid
                                    name='city'
                                    value={this.state.city}
                                    onChange={this.onchange}
                                    label="City" placeholder='City'
                                    error={this.state.cerr}
                                />
                                <Form.Input
                                    name='state'
                                    value={this.state.state}
                                    onChange={this.onchange}
                                    error={this.state.sterr}

                                    label="State" placeholder='State' />
                                <Form.Input
                                    name='country'
                                    value={this.state.country}
                                    onChange={this.onchange}
                                    error={this.state.cnerr}
                                    label="Country" placeholder='Country' />
                                <Form.Input
                                    name='pincode'
                                    value={this.state.pincode}
                                    onChange={this.onchange}
                                    error={this.state.perr}
                                    type='number'
                                    label="Pincode" placeholder='Pincode' />
                                <Form.Input
                                    name='phone'
                                    value={this.state.phone}
                                    onChange={this.onchange}
                                    error={this.state.pherr}
                                    type='number'
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
    addressList: state.customer.addressList,
    defaultAddress: state.customer.defaultAddress
})


export default connect(mapStateToProps, { addAddress, setDefaultAddress })(AddAddress);