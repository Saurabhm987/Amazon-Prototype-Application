import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getCard } from '../../actions/customer'
import { connect } from 'react-redux';
import { updateCard, deleteCard, setDefaultCard } from '../../actions/customer'
import PropTypes from 'prop-types'
import JwtDecode from 'jwt-decode';
import queryString from 'query-string';


import {
    Header,
    Card,
    Button,
    Grid,
    Input,
} from 'semantic-ui-react';


class UserCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCardId: '',
            editmode: false,
            name: '',
            number: '',
            expiryDate: '',
            cvv: '',
            userId: '',
            error: false,
            cvverr: false,
            numerr: false,
            namerr: false,
            daterr: false,
        }
    }


    componentDidMount = async () => {

        let token = localStorage.getItem('token')
        if (token !== null) {
            let userData = JwtDecode(token)
            this.setState({ userId: userData.userId });
            await this.props.getCard(userData.userId)
        } else {
            this.props.history.push('/login')
        }

    }

    handleChange = async (e) => {

        const { name, value } = e.target

        if (name === 'name') {
            console.log('inside')
            if (value.length < 2) {
                await this.setState({ error: true, namerr: true });
            } else {
                await this.setState({ error: false, namerr: false });
            }
        } else if (name === 'number') {

            if (value.length !== 16) {
                await this.setState({ error: true, numerr: true });
            } else {
                await this.setState({ error: false, numerr: false });
            }
        } else if (name === 'expiryDate') {

            let expiry = value.split('/')

            if ((expiry[0] > 12) || (Number(expiry[1]) > 31) || (Number(expiry[2]) < 2020)) {
                await this.setState({ error: true, daterr: true });
            } else {
                await this.setState({ error: false, daterr: false });
            }
        } else if (name === 'cvv') {

            if (value.length !== 3) {
                this.setState({ error: true, cvverr: true });
            } else {
                this.setState({ error: false, cvverr: false });
            }
        }

        await this.setState({ [name]: value })
    }

    handleEdit = async (e) => {

        this.setState({
            editmode: true,
            currentCardId: e.currentTarget.dataset.id
        });
    }

    handleDelete = async (e) => {

        let selecedCard = e.currentTarget.dataset.id

        // let userId = this.state.userId
        // userId should go here
        await this.props.deleteCard(this.state.userId, selecedCard)
    }

    handleSave = async (e) => {

        const {
            currentCardId,
            name,
            expiryDate,
            cvv,
            number,
            userId,
            error,
        } = this.state

        const data = {
            name: name || e.currentTarget.dataset.name,
            cvv: cvv || e.currentTarget.dataset.cvv,
            expiryDate: expiryDate || e.currentTarget.dataset.expiry,
            number: number || e.currentTarget.dataset.number,
        }

        if (!error && data.name !=='' && data.cvv !== ''&& data.expiryDate !== ''&&data.number) {

            await this.props.updateCard(userId, currentCardId, data);
            await this.props.getCard(userId)
            this.setState({ editmode: false });
            window.location.reload();
        }

    }

    render() {
        if (this.props.cardList) {
            var getCard = this.props.cardList.map(card => {
                // var str = queryString.stringify(card);
                return (
                    <Card >
                        {
                        this.state.editmode && this.state.currentCardId === card._id
                            ?
                            (
                                <div style={{ marginTop: '5px' }}>
                                <Card.Content >
                                        <Grid columns={1}>
                                            <Grid.Column style={{ marginLeft: '5px', margin: '5px' }}>
                                                <Grid.Row><Input size='small' defaultValue={card.name || ''} onChange={this.handleChange} error={this.state.namerr} fluid placeholder='Enter card name' type='text' name='name' /></Grid.Row>
                                                <Grid.Row><Input size='small' defaultValue={card.number || ''} onChange={this.handleChange} error={this.state.numerr} fluid placeholder='Enter card number' type='number' name='number' /></Grid.Row>
                                                <Grid.Row><Input size='small' defaultValue={card.expiryDate&&card.expiryDate.substring(0, 10) || ''} onChange={this.handleChange} error={this.state.daterr} fluid placeholder='Enter expiry date' type='data' name='expiryDate' /></Grid.Row>
                                                <Grid.Row><Input size='small' defaultValue={card.cvv || ''} onChange={this.handleChange} error={this.state.cvverr} fluid placeholder='Enter CVV' type='text' name='cvv' /></Grid.Row>
                                            </Grid.Column>
                                        </Grid>
                                    </Card.Content>
                                    <br />
                                    <Card.Content extra textAlign='center'>
                                        <div>
                                            <Link onClick={this.handleSave} data-id={card._id} data-name={card.name} data-number={card.number} data-expiry={card.expiryDate} data-cvv={card.cvv} style={{ margin: '5px', color: '#0066c0', fontSize: '13px', lineHeight: '19px' }} className="nav-link" >
                                                save
                                            </Link>
                                                |
                                            <Link onClick={() => { this.setState({ editmode: false }) }} style={{ margin: '5px', color: '#0066c0', fontSize: '13px', lineHeight: '19px' }} className="nav-link">
                                                cancel
                                            </Link>
                                            |
                                            <Link onClick={() => {this.props.setDefaultCard(card);this.props.history.push(`/checkout`)}} style={{ margin: '5px', color: '#0066c0', fontSize: '13px', lineHeight: '19px' }} >Select</Link>
                                        </div>
                                    </Card.Content>
                                </div>
                            )
                            :
                            (

                                <Card.Content>
                                    <Card.Meta>{card.name}</Card.Meta>
                                    <Card.Meta>{card.number}</Card.Meta>
                                    <Card.Meta>{card.expiryDate&&card.expiryDate.substring(0, 10)}</Card.Meta>
                                    <Card.Meta>{card.cvv}</Card.Meta>
                                    <br />
                                    <br />
                                    <br />
                                </Card.Content>
                            )

                    }
                    {
                        this.state.editmode && this.state.currentCardId === card._id
                            ?
                            null
                            :
                            (
                                <Card.Content extra textAlign='center'>
                                    <div >
                                        <Link onClick={this.handleEdit} data-id={card._id} style={{ margin: '5px', color: '#0066c0', fontSize: '13px', lineHeight: '19px' }} className="nav-link" >
                                            Edit
                                        </Link>
                                        |
                                        <Link onClick={this.handleDelete} data-id={card._id} style={{ margin: '5px', color: '#0066c0', fontSize: '13px', lineHeight: '19px' }} className="nav-link">
                                            Remove
                                        </Link>
                                    </div>
                                </Card.Content>
                            )
                    }
                </Card>
            )
        })
    }

        return (

            <div>
                <br />
                <br />
                <div>
                    <div style={{ marginTop: "72px" }}>
                        <Header as='h1'>Your Payments</Header>
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <Grid columns={1} centered>
                        <Grid.Column width={10}>
                            <Grid.Row textAlign='center'>
                                <Card.Group itemsPerRow={3}>
                                    {getCard}
                                </Card.Group>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                </div>
                <br />
                <br />
                <br />
                <div>
                    <Link to='/addCard' className="nav-link">
                        <Button primary>Add Card</Button>
                    </Link>
                </div>
                <br />
                <br />
            </div>

        )

    }

}

Card.propTypes = {
    cardList: PropTypes.array.isRequired,
    getCard: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
    setDefaultCard: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    cardList: state.customer.cardList
})

export default connect(mapStateToProps, { getCard, updateCard, deleteCard , setDefaultCard})(withRouter(UserCard));