import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Image, Container, Button, Header, Segment, Input, Comment, Rating } from 'semantic-ui-react'
import Photo from './face.jpeg'
import { getCustomerProfile, updateCustomerProfile } from '../../actions/customer'
import { connect } from 'react-redux'
import JwtDecode from 'jwt-decode'
import { Link } from 'react-router-dom'
import CustomerComment from './CustomerComment'

class CustomerProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            editmode: false,
            name: '',
            userId: '',
        }
    }

    componentDidMount = async e => {
        let token = localStorage.getItem('token')
        let user = JwtDecode(token)

        if (user !== null) {

            await this.props.getCustomerProfile(user.userId)
            this.setState({ userId: user.userId });

        } else {

            this.props.history.push('/login')
        }

    }

    handleLink = async (e) => {

        this.props.history.push(`/productdetails/?id=${e.currentTarget.dataset.id}`)
    }

    handleFileChange = async e => {
        this.setState({ file: e.target.files[0] });
    }

    handleChane = async e => {

        const { value } = e.target
        this.setState({ name: value });

    }

    handleSubmit = async e => {

        const { file, name, userId } = this.state

        let formdata = new FormData()

        formdata.append('image', file || e.currentTarget.dataset.image)
        formdata.append('name', name || e.currentTarget.dataset.name)

        await this.props.updateCustomerProfile(formdata, userId)

        this.setState({ editmode: false });
    }


    render() {

        if (this.props.customerComments) {

            const { customerComments } = this.props
            var votes = 0;
            var comments = 0;
            customerComments.forEach(item => {
                votes += item.review.rating
                comments++
            });
        }

        return (
            <Container style={{ marginTop: '70px' }}>
                <Container style={{ padding: '30px' }} fluid>
                    <Grid columns={2}>
                        <Grid.Column width={4}>
                            {
                                !this.state.editmode
                                    ?
                                    <Card>
                                        <Image src={this.props.profile.image || ''} wrapped ui={false} style={{ height: '250px', width: '246px' }} />
                                        <Card.Content>
                                            <Card.Header>{this.props.profile.name || ''}</Card.Header>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button
                                                onClick={() => this.setState({ editmode: true })}
                                                style={{ background: '#febd69', backgroundColor: '#a88734 #9c7e31 #846a29', color: 'rgb(17, 17, 17)' }}
                                            >Edit Profile</Button>
                                        </Card.Content>
                                    </Card>
                                    :
                                    <Card>
                                        <Image
                                            src={this.state.file && URL.createObjectURL(this.state.file) || this.props.profile && this.props.profile.image}
                                            alt='' style={{ width: '250px', height: '246px' }}
                                        />
                                        <Input type='file' onChange={this.handleFileChange} />
                                        <br />
                                        <Card.Content textAlign='left'>
                                            <Grid.Row>
                                                <label>Name: </label>
                                            </Grid.Row>
                                            <Grid.Row>
                                                <Input type='text' defaultValue={this.props.profile.name || ''} onChange={this.handleChane} />
                                            </Grid.Row>
                                            <br />
                                            <Grid.Row>
                                                <Button
                                                    onClick={this.handleSubmit}
                                                    style={{ background: '#febd69', backgroundColor: '#a88734 #9c7e31 #846a29', color: 'rgb(17, 17, 17)' }}
                                                    data-image={this.props.profile.image}
                                                    data-name={this.props.profile.name}
                                                >Save</Button>
                                                <Button
                                                    onClick={() => this.setState({ editmode: false })}
                                                    style={{ background: '#febd69', backgroundColor: '#a88734 #9c7e31 #846a29', color: 'rgb(17, 17, 17)' }}
                                                >Cancel</Button>
                                            </Grid.Row>
                                        </Card.Content>
                                    </Card>
                            }
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Container style={{ marginLeft: '300px' }}>
                                <Grid columns={2} textAlign='left'>
                                    <Grid.Column width={3} textAlign='center'>
                                        <div></div>
                                    </Grid.Column>
                                    <Grid.Column width={6} textAlign='center'>
                                        <Segment circular inverted style={{ width: 175, height: 175 }}>
                                            <Header as='h2' inverted>
                                                Votes
                                        <Header.Subheader>{votes}</Header.Subheader>
                                            </Header>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width={6} textAlign='center'>
                                        <Segment circular inverted style={{ width: 175, height: 175 }}>
                                            <Header as='h2' inverted>
                                                Comments
                                        <Header.Subheader>{comments}</Header.Subheader>
                                            </Header>
                                        </Segment>
                                    </Grid.Column>
                                </Grid>


                            </Container>
                            <br />
                            <Header>Comments</Header>
                            <Grid columns={1}>
                                <Grid.Column textAlign='left'>
                                    <Comment.Group size='huge'>
                                        {
                                            this.props.customerComments && this.props.customerComments.map(item => (
                                                <Comment>
                                                    <Comment.Avatar as='a' src='/userpreview.png' />
                                                    <Comment.Content>
                                                        <Comment.Author as='a' onClick={this.handleLink} data-id={item.productId}>{item.review.header}</Comment.Author>
                                                        <Comment.Metadata>
                                                            <Comment.Text><Rating maxRating={5} defaultRating={item.review.rating} icon='star' size='small' disabled /></Comment.Text>
                                                        </Comment.Metadata>
                                                        <Comment.Text>{item.review.comment}</Comment.Text>
                                                    </Comment.Content>
                                                </Comment>
                                            ))
                                        }
                                    </Comment.Group>
                                </Grid.Column>
                            </Grid>

                            {/* {
                                this.props.customerComments
                                    ?
                                    <Comment.Group size='mini'>
                                        {
                                            this.props.customerComments.map(item => (header
                                                <Comment textAlign='left'>
                                                    <Comment.Avatar src='/userpreview.png' square />
                                                    <Comment.Content>
                                                        <Comment.Author as='a'>{item.header}</Comment.Author>
                                                        <Comment.Text><Rating maxRating={5} defaultRating={item.rating} icon='star' size='small' disabled /></Comment.Text>
                                                        <Comment.Text>{item.comment}</Comment.Text>
                                                    </Comment.Content>
                                                </Comment>
                                            ))
                                        }
                                    </Comment.Group>
                                    :
                                    <Grid columns={1}>
                                        <Grid.Column>
                                            <Header>No Comment Posted!</Header>
                                        </Grid.Column>
                                    </Grid>
                            } */}
                        </Grid.Column>
                    </Grid>
                </Container>
            </Container>
        )
    }
}

CustomerProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    customerComments: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    profile: state.customer.profile,
    customerComments: state.customer.customerComments
})

export default connect(mapStateToProps, { getCustomerProfile, updateCustomerProfile })(CustomerProfile)