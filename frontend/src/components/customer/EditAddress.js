import React, { Component } from 'react';
import { Divider, Button, Form, Grid, Header, Image, Message, Segment, Radio } from 'semantic-ui-react'
import { getAddressDetail, updateAddress } from '../../actions/customer'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import JwtDecode from 'jwt-decode';

class EditAddress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            street1: '',
            street2: '',
            city: '',
            state: '',
            country: '',
            pincode: '',
            phone: '',
            fullname: '',
            st1err: false,
            pherr: false,
            cerr: false,
            cnerr: false,
            perr: false,
            sterr: false,
            error: false,
            userId:'',

        }
    }

    componentDidMount = async () => {

        const token = localStorage.getItem('token')
        if (token !== null) {

            const { id, userId } = await this.props.location.state

            let user = JwtDecode(token)

            this.setState({userId: user.userId});

            await this.props.getAddressDetail(user.userId, id)

        } else {
            this.props.history.push('/login')
        }
    }

    handleCancel = async () => {
        this.props.history.push('address')
    }

    handleInput = async (e) => {

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

    handleSave = async (e) => {

        let selectedAddress = e.currentTarget.dataset.selectedid

        const {
            street1,
            street2,
            city,
            state,
            country,
            pincode,
            phone,
            fullname,
            userId,
            error,
        } = this.state

        const data = {
            street1: street1 || e.currentTarget.dataset.street1,
            street2: street2 || e.currentTarget.dataset.street2,
            city: city || e.currentTarget.dataset.city,
            state: state || e.currentTarget.dataset.state,
            country: country || e.currentTarget.dataset.country,
            pincode: pincode || e.currentTarget.dataset.pincode,
            phone: phone || e.currentTarget.dataset.phone,
            name: fullname || e.currentTarget.dataset.name,
        }
        console.log('11111111111111111111')
        
        console.log(data);
        
        if (!error) {

            console.log('data ----', data)
            await this.props.updateAddress(userId, selectedAddress, data);
            this.props.history.push('/customer/address')
        }

    }

    render() {

        const { addressDetail } = this.props

        return (
            <div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />

                {
                    addressDetail
                        ?
                        (
                            <Grid textAlign='center' style={{ height: '100vh' }} horizontalAlign='middle'>
                                <Grid.Column textAlign='left' style={{ maxWidth: 500 }}>

                                    <Form size='large'>
                                        <Header size="large" style={{ fontWeight: '400', fontSize: '1.71428571em' }}>Edit Your Address</Header>

                                        <Form.Input fluid
                                            name='country'
                                            onChange={this.handleInput}
                                            defaultValue={addressDetail.country || ''}
                                            label="Country"
                                            size='small'
                                            error={this.state.cnerr}

                                        />
                                        {/* <Form.Input fluid
                                            name='fullname'
                                            onChange={this.handleInput}
                                            label="Full Name"
                                            size='small'
                                            defaultValue={addressDetail.name || ''}
                                        /> */}
                                        <Form.Input fluid
                                            name='phone'
                                            onChange={this.handleInput}
                                            type='number'
                                            label="Mobile Number"
                                            placeholder='10 digit mobile number'
                                            size='small'
                                            defaultValue={addressDetail.phone || ''}
                                            error={this.state.pherr}

                                        />
                                        <Form.Input fluid
                                            name='pincode'
                                            size='small'
                                            onChange={this.handleInput}
                                            label="Pincode"
                                            placeholder='6 digits [0-9] pincode'
                                            type='number'
                                            defaultValue={addressDetail.pincode || ''}
                                            error={this.state.perr}
                                        />
                                        <Form.Input
                                            onChange={this.handleInput}
                                            fluid
                                            size='small'
                                            label="Stree Address"
                                            placeholder='Flat /House No. /Floor /Building'
                                            type='text'
                                            name='street1'
                                            defaultValue={addressDetail.street1 || ''}
                                            error={this.state.st1err}
                                        />
                                        <Form.Input
                                            onChange={this.handleInput}
                                            fluid
                                            placeholder='Colony / Street / Locality'
                                            type='text'
                                            size='small'
                                            name='street2'
                                            defaultValue={addressDetail.street2 || ''}
                                        />
                                        <Form.Input
                                            onChange={this.handleInput}
                                            fluid
                                            name='city'
                                            size='small'
                                            label="City"
                                            type='text'
                                            defaultValue={addressDetail.city || ''}
                                            error={this.state.cerr}
                                        />
                                        <Form.Input
                                            onChange={this.handleInput}
                                            fluid
                                            size='small'
                                            label="State"
                                            type='text'
                                            name='state'
                                            defaultValue={addressDetail.state || ''}
                                            error={this.state.sterr}
                                        />
                                        <Button
                                            onClick={this.handleSave}
                                            style={{ background: '#febd69', backgroundColor: '#a88734 #9c7e31 #846a29', color: 'rgb(17, 17, 17)' }}
                                            data-city={addressDetail.city}
                                            data-street1={addressDetail.street1}
                                            data-street2={addressDetail.street2}
                                            data-phone={addressDetail.phone}
                                            data-pincode={addressDetail.pincode}
                                            data-state={addressDetail.state}
                                            data-country={addressDetail.country}
                                            data-name={addressDetail.name}
                                            data-selectedid={addressDetail._id}
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            style={{ background: '#febd69', backgroundColor: '#a88734 #9c7e31 #846a29', color: 'rgb(17, 17, 17)' }}
                                            onClick={this.handleCancel}
                                        >Cancel</Button>
                                    </Form>
                                </Grid.Column>
                            </Grid>
                        )
                        :
                        null
                }

            </div>
        );
    }
}

EditAddress.propTypes = {
    addressDetail: PropTypes.object.isRequired,
    getAddressDetail: PropTypes.func.isRequired,
    updateAddress: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    addressDetail: state.customer.addressDetail
})

export default connect(mapStateToProps, { getAddressDetail, updateAddress })(EditAddress);