import React, { Component, Fragment } from 'react';
import axios from 'axios'
import {Header, Card, Button} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom'

class card extends Component {
    constructor(props) {
        super(props);

    this.state = {
        cardDetails: []
    }
    }
    
    componentDidMount = async () => {
        
        const card = () => {
            return axios
              .get('http://localhost:3001/card/getCard')
              .then(response => {
                console.log(response.data)
                return response.data
              })
              .catch(err => {
                console.log(err)
              })
          }
        const cardDetails = await card()
        this.setState({
            cardDetails
        })
    }

    render() {
        console.log(this.state.cardDetails);
        var getCard = this.state.cardDetails.map(card => {
            return (
                <div>
                    <Card.Group itemsPerRow={3}>
                        <Card fluid>
                        <Card.Content>
                            <Card.Meta>{card.name}</Card.Meta>
                            <Card.Meta>{card.number}</Card.Meta>
                            <Card.Meta>{card.expiryDate}</Card.Meta>
                            <Card.Meta>{card.cvv}</Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <div >
                            <Link to='/updateAddress' className="nav-link" >
                                Edit 
                            </Link>
                             | 
                            <Link to='/deleteAddress' className="nav-link">
                                Remove
                            </Link>
                            </div>
                        </Card.Content>
                        </Card>
                    </Card.Group>
                </div> 
            )
        }) 
        return(
            <div>
                <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                <div style={{ marginTop: "72px" }}>
                    <Header as='h1'>Your Payments</Header>
                </div>
            </div>
            {getCard}
            <div>
            <Link to='/addcard' className="nav-link">
            <Button primary>Add Card</Button>
            </Link>
            </div>
            </div>
            
        )
         
    }           
                
}

export default withRouter(card);