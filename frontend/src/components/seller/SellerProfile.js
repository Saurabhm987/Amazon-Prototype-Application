import React, { Component } from 'react'
import Feedback from './Feedback'
import queryString from 'query-string';
import jwtDecode from 'jwt-decode';
import PropTypes from 'prop-types'
import { getSellerProfile, updateSellerProfile } from '../../actions/seller'

import {
    Tab,
    Grid,
    Segment,
    Header,
    Rating,
    Button,
    Placeholder,
    Input,
    Image,
    Form,
} from 'semantic-ui-react'
import { connect } from 'react-redux';

class SellerProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            activeIndex: 1,
            adminAccess: false,
            sellerName: '',
            street: '',
            pincode: '',
            city: '',
            state: '',
            country: '',
            userId: '',
            email: '',
            password: '',
            file: null
        }
    }

    componentDidMount = async () => {

        let token = localStorage.getItem('token')
        if (token !== null) {
            const user = jwtDecode(token)
            const sellerId = queryString.parse(this.props.location.search);

            if (sellerId.id === user.userId) {
                this.setState({
                    adminAccess: true,
                    userId: user.userId
                });
            }

            await this.props.getSellerProfile(sellerId.id)

        } else {
            this.props.history.push('/login')
        }
    }

    hanldeFileChange = async (e) => {
        e.preventDefault()

        this.setState({
            file: e.target.files[0],
        });

    }

    handleInput = async (e, { name, value }) => {
        this.setState({ [name]: value });
    }

    descriptionHandler = async () => {
        this.setState({ editMode: true });
    }

    sellerProductHandler = async () => {
        console.log('handling')
    }

    handleSave = async (e) => {

        const {
            street1,
            city,
            state,
            country,
            pincode,
            fullname,
            file,
            userId,
            email,
            password
        } = this.state

        const data = {
            street1: street1 || e.currentTarget.dataset.street1,
            city: city || e.currentTarget.dataset.city,
            state: state || e.currentTarget.dataset.state,
            country: country || e.currentTarget.dataset.country,
            pincode: pincode || e.currentTarget.dataset.pincode,
            name: fullname || e.currentTarget.dataset.sellername,
            file: file || e.currentTarget.dataset.currfile,
            email: email || e.currentTarget.dataset.email,
            password: password
        }

        const formdata = new FormData()

        formdata.append('name', data.name)
        formdata.append('city', data.city)
        formdata.append('state', data.state)
        formdata.append('country', data.country)
        formdata.append('pincode', data.pincode)
        formdata.append('street1', data.street1)
        formdata.append('email', data.email)
        formdata.append('password', data.password)
        formdata.append('image', data.file)

        for (var pair of formdata.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        await this.props.updateSellerProfile(formdata, userId)

        alert('profil updated!')

        this.setState({ editMode: false });

    }

    tabChangeHandler = async (e, data) => {

        const { userId } = this.props.user

        const sellerId = await queryString.parse(this.props.location.search);

        if (sellerId.id === null) {
            if (data.activeIndex === 3) {
                this.props.history.push(`/sellerproducts/?id=${userId}`)
            }
        } else {
            if (data.activeIndex === 3) {
                this.props.history.push(`/sellerproducts/?id=${sellerId.id}`)
            }
        }

    }

    render() {

        console.log('acces -', this.state.adminAccess)

        const { profileDetail } = this.props

        if (profileDetail) {
            var address = profileDetail.address
        }

        const panes = [
            {
                menuItem: 'Feedback',
                pane: { key: 'tab1', content: <Feedback />, size: 'massive' },
            },
            {
                menuItem: 'Help',
                pane: {
                    key: 'tab2',
                    content:
                        (
                            <div style={{ margin: '20px' }}>
                                <Grid columns={1} textAlign='left'>
                                    <Grid.Row>
                                        <Grid.Column>
                                            For questions about a charge that has been
                                            made to your credit card, please contact Amazon.
                                            Questions about how to place an order? Search Amazon Help.
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                            </div>
                        ),
                    textAlign: 'center',
                },
            },
            {
                menuItem: 'Gift Wrap',
                pane: {
                    key: 'tab3',
                    content: (
                        <div style={{ margin: '15px' }}>
                            <Grid columns={1} textAlign='left'>
                                <br />
                                <Header>Gift Wrap and Gift Messaging</Header>
                                <br />
                                <Grid.Row>
                                    <Grid.Column>
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the industry's
                                        standard dummy text ever since the 1500s, when an unknown
                                        printer took a galley of type and scrambled it to make a
                                        type specimen book. It has survived not only five centuries,
                                        but also the leap into electronic typesetting, remaining
                                        essentially unchanged. It was popularised in the 1960s with
                                        the release of Letraset sheets containing Lorem Ipsum passages,
                                        and more recently with desktop publishing software like Aldus
                                        PageMaker including versions of Lorem Ipsum.
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    ),
                },
            },
            {
                menuItem: 'Products',
                pane: (
                    <Tab.Pane key='tab4'></Tab.Pane>
                ),
            },
        ]

        return (
            <div style={{ margin: '80px 20px 20px 20px' }}>
                <Grid columns={1} width={16} textAlign='left'>
                    {/* <Grid.Row> */}
                    <Grid.Column>
                        <Segment>
                            {!this.state.editMode
                                ?
                                (
                                    <Grid columns={2} onClick={() => { this.setState({ editMode: true && this.state.adminAccess }) }}>
                                        <Grid.Column width={1}>
                                            {
                                                profileDetail
                                                    ?
                                                    <Image square src={profileDetail.image} alt="" />
                                                    : <Placeholder>
                                                        <Placeholder.Image square></Placeholder.Image>
                                                    </Placeholder>
                                            }
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                            {
                                                profileDetail
                                                    ?
                                                    <Grid.Row>
                                                        <Header as='h2'>{profileDetail.name}</Header>
                                                    </Grid.Row>
                                                    :
                                                    <Placeholder>
                                                        <Placeholder.Line></Placeholder.Line>
                                                    </Placeholder>
                                            }
                                            {
                                                profileDetail.address
                                                    ?
                                                    <Grid.Row>
                                                        {profileDetail.address.street1} {profileDetail.address.city} {profileDetail.address.state} {profileDetail.address.country} {profileDetail.address.picode}
                                                    </Grid.Row>
                                                    :
                                                    <Placeholder>
                                                        <Placeholder.Line></Placeholder.Line>
                                                    </Placeholder>
                                            }
                                            <Grid.Row>
                                                <a href='#'>Seller products</a>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Rating maxRating={5} defaultRating={3} icon='star' size='small' disabled />
                                                <span style={{ color: 'blue' }}>100% positive in the last 12 months </span>
                                            </Grid.Row>
                                        </Grid.Column>
                                    </Grid>
                                )
                                :
                                (
                                    <Grid columns={2}>
                                        <Grid.Column with={2}>
                                            <Grid.Row>
                                                <Grid columns={2}>
                                                    <Grid.Column width={5}>
                                                        Profil Image
                                                        <Segment>
                                                            <Image src={this.state.file && URL.createObjectURL(this.state.file) || profileDetail.image} alt="" style={{ width: '290px', height: '250px' }} />
                                                        </Segment>
                                                        <Input type='file' name='file' size='small' onChange={this.hanldeFileChange} />
                                                    </Grid.Column>
                                                    <Grid.Column>
                                                        <Grid.Column>

                                                            {/* {
                                                                profileDetail && profileDetail.address
                                                                    ? */}
                                                            <Form size='large'>
                                                                <Header size="large" style={{ fontWeight: '400', fontSize: '1.71428571em' }}>Edit Your Address</Header>
                                                                <Form.Input fluid
                                                                    name='email'
                                                                    onChange={this.handleInput}
                                                                    label="Email"
                                                                    size='small'
                                                                    defaultValue={profileDetail.email || ''}
                                                                />

                                                                <Form.Input fluid
                                                                    name='password'
                                                                    size='small'
                                                                    onChange={this.handleInput}
                                                                    label="Password"
                                                                    placeholder='password'
                                                                    type='password'
                                                                />
                                                                <Form.Input fluid
                                                                    name='fullname'
                                                                    onChange={this.handleInput}
                                                                    label="Full Name"
                                                                    size='small'
                                                                    defaultValue={profileDetail.name || ''}
                                                                />

                                                                <Form.Input fluid
                                                                    name='pincode'
                                                                    size='small'
                                                                    onChange={this.handleInput}
                                                                    label="Pincode"
                                                                    placeholder='6 digits [0-9] pincode'
                                                                    type='text'
                                                                    defaultValue={address && address.pincode || ''}

                                                                />
                                                                <Form.Input
                                                                    onChange={this.handleInput}
                                                                    fluid
                                                                    size='small'
                                                                    label="Stree Address"
                                                                    placeholder='Flat /House No. /Floor /Building'
                                                                    type='text'
                                                                    name='street1'
                                                                    defaultValue={address && address.street1 || ''}

                                                                />
                                                                <Form.Input
                                                                    onChange={this.handleInput}
                                                                    fluid
                                                                    name='city'
                                                                    size='small'
                                                                    label="City"
                                                                    type='text'
                                                                    defaultValue={address && address.city || ''}
                                                                />
                                                                <Form.Input
                                                                    onChange={this.handleInput}
                                                                    fluid
                                                                    size='small'
                                                                    label="State"
                                                                    type='text'
                                                                    name='state'
                                                                    defaultValue={address && address.state || ''}
                                                                />
                                                                <Form.Input fluid
                                                                    name='country'
                                                                    onChange={this.handleInput}
                                                                    defaultValue={address && address.country || ''}
                                                                    label="Country"
                                                                    size='small'
                                                                />
                                                                <Button
                                                                    onClick={this.handleSave}
                                                                    style={{ background: '#febd69', backgroundColor: '#a88734 #9c7e31 #846a29', color: 'rgb(17, 17, 17)' }}
                                                                    data-city={address && address.city}
                                                                    data-street1={address && address.street1}
                                                                    data-pincode={address && address.pincode}
                                                                    data-state={address && address.state}
                                                                    data-country={address && address.country}
                                                                    data-sellername={profileDetail.name}
                                                                    data-currfile={profileDetail.image}
                                                                    data-email={profileDetail.email}
                                                                >
                                                                    Save Changes
                                                                        </Button>
                                                                <Button
                                                                    onClick={() => this.setState({ editMode: !this.state.editMode })}
                                                                    style={{ background: '#febd69', backgroundColor: '#a88734 #9c7e31 #846a29', color: 'rgb(17, 17, 17)' }}
                                                                >Cancel</Button>
                                                            </Form>
                                                            {/* : null
                                                            } */}
                                                        </Grid.Column>
                                                    </Grid.Column>
                                                </Grid>
                                            </Grid.Row>
                                        </Grid.Column>

                                    </Grid>
                                )

                            }
                            <br />
                            <Grid.Row>
                                About
                                </Grid.Row>
                            <Grid.Row>
                                <Grid.Column columns={1}>
                                    <Grid.Column>
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the industry's
                                        standard dummy text ever since the 1500s, when an unknown
                                        printer took a galley of type and scrambled it to make a
                                        type specimen book. It has survived not only five centuries,
                                        but also the leap into electronic typesetting, remaining
                                        essentially unchanged. It was popularised in the 1960s with
                                        the release of Letraset sheets containing Lorem Ipsum passages,
                                        and more recently with desktop publishing software like Aldus
                                        PageMaker including versions of Lorem Ipsum.
                                        </Grid.Column>
                                </Grid.Column>
                            </Grid.Row>
                        </Segment>
                    </Grid.Column>
                </Grid>
                <br />
                <Tab
                    panes={panes}
                    renderActiveOnly={false}
                    onTabChange={this.tabChangeHandler}
                    menuPosition={"left"}
                />
            </div>
        );
    }
}

SellerProfile.propTypes = {
    user: PropTypes.object.isRequired,
    profileDetail: PropTypes.object.isRequired,
    getSellerProfile: PropTypes.func.isRequired,
    updateSellerProfile: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    user: state.auth.user,
    profileDetail: state.seller.profileDetail
})

export default connect(mapStateToProps, { getSellerProfile, updateSellerProfile })(SellerProfile)