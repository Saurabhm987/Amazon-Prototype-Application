import React, { Component } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { addCard, setDefaultCard } from '../../actions/customer'
import PropTypes, { bool } from 'prop-types'
import { connect } from 'react-redux'

class AddCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            number: '',
            expiryDate: '',
            cvv: '',
            error: false,
            cvverr: false,
            numerr: false,
            namerr: false,
            daterr: false,
        }
    }

    onchange = async e => {

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

            if ((expiry[0] > 12) || (Number(expiry[1]) > 31) || (Number(expiry[2]) < 2019)) {
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


    onSubmit = async e => {
        e.preventDefault()

        console.log('hitting ....!!!')

        const { error, name, number, expiryDate, cvv } = this.state

        if (!error && name !== '' && number !== '' && expiryDate !== '' && cvv !== ''   ) {

            const newCard = {
                name: this.state.name,
                number: this.state.number,
                expiryDate: this.state.expiryDate,
                cvv: this.state.cvv,
            }

            await console.log('new card --', newCard)

            await this.props.addCard(newCard)
            // await this.props.setDefaultCard(newCard)
            console.log('card details', newCard)
            this.props.history.push('/customer/card')
        }else{
            alert('Please enter valid details')
        }
    }

    render() {
        return (
            <div>
                <br />
                <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <div style={{ marginTop: "72px" }}>
                        <Header as='h1'>Add New Payment Method</Header>
                    </div>
                </div>
                <br />
                <Grid textAlign='center' style={{ height: '100vh' }} horizontalAlign='middle'>
                    <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
                        <Form size='large'>
                            <Segment stacked>
                                {/* <Header size="large">Add new Payment Method</Header> */}
                                <Form.Input fluid
                                    name='name'
                                    value={this.state.name}
                                    error={this.state.namerr}
                                    onChange={this.onchange}
                                    label="Name" placeholder='Name' />
                                <Form.Input fluid
                                    name='number'
                                    value={this.state.number}
                                    type='number'
                                    error={this.state.numerr}
                                    onChange={this.onchange}
                                    label="Number" placeholder='Number' />
                                <Form.Input fluid
                                    name='expiryDate'
                                    value={this.state.expiryDate}
                                    onChange={this.onchange}
                                    error={this.state.daterr}
                                    label="Expiry Date" placeholder='Expiry Date' />
                                <Form.Input
                                    name='cvv'
                                    value={this.state.cvv}
                                    onChange={this.onchange}
                                    error={this.state.cvverr}
                                    type='number'
                                    label="CVV" placeholder='CVV' />
                                <Button fluid
                                    onClick={this.onSubmit}
                                    primary
                                    style={{ border: "solid 1px black" }}>
                                    Add Your Card
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

AddCard.propTypes = {
    addCard: PropTypes.func.isRequired,
    cardList: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
    cardList: state.customer.cardlist,
    defaultCard: state.customer.defaultCard
})

  export default connect(mapStateToProps, {addCard, setDefaultCard})(AddCard);
