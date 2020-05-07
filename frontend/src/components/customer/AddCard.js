import React, {Component} from 'react'
import { Button, Form, Grid, Header, Segment} from 'semantic-ui-react'
import {addCard} from '../../actions/customer'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

class AddCard extends Component {
    constructor(props) {
      super(props)
      this.state = {
        name: '',
        number: '',
        expiryDate: '',
        cvv: '',
      }
    }

    onchange = e => {
        this.setState({ [e.target.name]: e.target.value })
        console.log(e.target)
    }

    onSubmit = async e => {
        e.preventDefault()

        const newCard = {
            name: this.state.name,
            number: this.state.number,
            expiryDate: this.state.expiryDate,
            cvv: this.state.cvv,
        }

        console.log('card details',newCard)

        await this.props.addCard(newCard)

        this.props.history.push('/customer/card')

    }

render(){
    return (  
        <div>
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
            <div style={{ marginTop: "72px" }}>
            <Header as='h1'>Add New Payment Method</Header>
            </div>
        </div>

        <Grid textAlign='center' style={{ height: '100vh' }} horizontalAlign='middle'>
        <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
            <Form size='large'>
            <Segment stacked>
            <Header size="large">Add new Payment Method</Header>
                <Form.Input fluid
                name='name'
                value = {this.state.name}
                onChange = {this.onchange}
                label="Name"  placeholder='Name' />
                <Form.Input fluid 
                name='number'
                value = {this.state.number}
                onChange = {this.onchange}
                label="Number"  placeholder='Number' />
                <Form.Input fluid
                name='expiryDate'
                value = {this.state.expiryDate}
                onChange = {this.onchange}
                label="Expiry Date"  placeholder='Expiry Date' />
                <Form.Input
                name='cvv'
                value = {this.state.cvv}
                onChange = {this.onchange}
                label="CVV"  placeholder='CVV' />
                <Button fluid
                onClick = {this.onSubmit}
                primary
                style={{border:"solid 1px black"}}>
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
    addCard : PropTypes.func.isRequired,
    cardList: PropTypes.array.isRequired,
  }

  const mapStateToProps = state => ({
    cardList: state.customer.cardlist
  })

  export default connect(mapStateToProps, {addCard})(AddCard);