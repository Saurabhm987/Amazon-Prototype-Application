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
            fullname:'',
        }
    }

    componentDidMount = async () => {

        const token = localStorage.getItem('token')
        if (token !== null) {

            const { id, userId } = await this.props.location.state

            await this.props.getAddressDetail('5ea91dccebe1b9a0fc721a67', id)

        } else {
            this.props.history.push('/login')
        }


        // const { street1, street2, city, state, country, pincode, phone} = await this.props.addressDetail
        // await this.setState({
        //     street1: street1,
        //     street2: street2,
        //     city:city,
        //     state: state,
        //     coutnry:country,
        //     pincode: pincode,
        //     phone: phone
        // });

    }

    handleInput = async (e, { value, name }) => {
        this.setState({ [name]: value });
    }

    // handleSubmit = async () => {

    //     this.props.udpdateAddress()
    // }

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

        console.log('update data --', data)
        

        await this.props.updateAddress(userId, selectedAddress, data);

        this.props.history.push('/customer/address')
        // await this.props.getCard('5ea91dccebe1b9a0fc721a67')
        // this.setState({ editmode: false });
        // window.location.reload();
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
                                            label="Mobile Number"
                                            placeholder='10 digit mobile number'
                                            type='text'
                                            size='small'
                                            defaultValue={addressDetail.phone || ''}


                                        />
                                        <Form.Input fluid
                                            name='pincode'
                                            size='small'
                                            onChange={this.handleInput}
                                            label="Pincode"
                                            placeholder='6 digits [0-9] pincode'
                                            type='text'
                                            defaultValue={addressDetail.pincode || ''}

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
                                        />
                                        <Form.Input
                                            onChange={this.handleInput}
                                            fluid
                                            size='small'
                                            label="State"
                                            type='text'
                                            name='state'
                                            defaultValue={addressDetail.state || ''}
                                        />
                                        <Button fluid
                                            onClick={this.handleSave}
                                            size='large'
                                            style={{ background: '#febd69', backgroundColor: '#a88734 #9c7e31 #846a29', color: 'rgb(17, 17, 17)' }}
                                            data-city={addressDetail.city}
                                            data-street1={addressDetail.street1}
                                            data-street2={addressDetail.street2}
                                            data-phone={addressDetail.phone}
                                            data-pincode={addressDetail.pincode}
                                            data-state={addressDetail.state}
                                            data-country={addressDetail.country}
                                            data-name={addressDetail.name}
                                            data-selectedid = {addressDetail._id}
                                        >   
                                            Save Changes
                                        </Button>
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