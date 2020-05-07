import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { getCard } from '../../actions/customer'
import { connect } from 'react-redux';
import { updateCard, deleteCard } from '../../actions/customer'
import PropTypes from 'prop-types'
import JwtDecode from 'jwt-decode';


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
        }
    }


    componentDidMount = async () => {

        let token = localStorage.getItem('token')
        if (token !== null) {
            let userData = JwtDecode(token)
            this.setState({ userId: userData.userId });
            await this.props.getCard('5ea91dccebe1b9a0fc721a67')
        } else {
            this.props.history.push('/login')
        }

    }

    handleChange = async (e, { name, value }) => {

        this.setState({ [name]: value});
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
        await this.props.deleteCard('5ea91dccebe1b9a0fc721a67', selecedCard)
    }

    handleSave = async (e) => {

        const {
            currentCardId,
            name,
            expiryDate,
            cvv,
            number,
            userId,
        } = this.state

        const data = {
            name: name || e.currentTarget.dataset.name,
            cvv: cvv || e.currentTarget.dataset.cvv,
            expiryDate: expiryDate || e.currentTarget.dataset.expiry,
            number: number || e.currentTarget.dataset.number,
        }
        await this.props.updateCard(userId, currentCardId, data);
        await this.props.getCard('5ea91dccebe1b9a0fc721a67')
        this.setState({ editmode: false });
        window.location.reload();
    }

    render() {

        var getCard = this.props.cardList.map(card => {
            return (
                <Card>
                    {
                        this.state.editmode && this.state.currentCardId === card._id
                            ?
                            (
                                <div style={{ marginTop: '5px' }}>
                                    <Card.Content>
                                        <Grid columns={1}>
                                            <Grid.Column style={{ marginLeft: '5px', margin: '5px' }}>
                                                <Grid.Row><Input size='small' defaultValue={card.name || ''} onChange={this.handleChange} fluid placeholder='Enter card name' type='text' name='name' /></Grid.Row>
                                                <Grid.Row><Input size='small' defaultValue={card.number || ''} onChange={this.handleChange} fluid placeholder='Enter card number' type='number' name='number' /></Grid.Row>
                                                <Grid.Row><Input size='small' defaultValue={card.expiryDate || ''} onChange={this.handleChange} fluid placeholder='Enter expiry date' type='data' name='expiryDate' /></Grid.Row>
                                                <Grid.Row><Input size='small' defaultValue={card.cvv || ''} onChange={this.handleChange} fluid placeholder='Enter CVV' type='text' name='cvv' /></Grid.Row>
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
                                        </div>
                                    </Card.Content>
                                </div>
                            )
                            :
                            (
                                
                                <Card.Content>
                                    <Card.Meta>{card.name}</Card.Meta>
                                    <Card.Meta>{card.number}</Card.Meta>
                                    <Card.Meta>{card.expiryDate}</Card.Meta>
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
}

const mapStateToProps = state => ({
    cardList: state.customer.cardList
})

export default connect(mapStateToProps, { getCard, updateCard, deleteCard })(withRouter(UserCard));