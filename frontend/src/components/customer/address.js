import React, { Component, Fragment } from 'react';
import axios from 'axios'
import {Header, Card, Button} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom'

class address extends Component {
    constructor(props) {
        super(props);

    this.state = {
        customerAddress: []
    }
    }
    
    componentDidMount = async () => {
        
        const address = () => {
            return axios
              .get('http://localhost:3001/address/getAddress')
              .then(response => {
                console.log(response.data)
                return response.data
              })
              .catch(err => {
                console.log(err)
              })
          }
        const customerAddress = await address()
        this.setState({
            customerAddress
        })
    }

    render() {
        console.log(this.state.customerAddress);
        if(this.state.customerAddress){
            var getAddress = this.state.customerAddress.map(address => {
                return (
                    <div>
                        <Card.Group itemsPerRow={3}>
                            <Card fluid>
                            <Card.Content>
                                <Card.Meta>{address.street1}</Card.Meta>
                                <Card.Meta>{address.street2}</Card.Meta>
                                <Card.Meta>{address.city}</Card.Meta>
                                <Card.Meta>{address.state}</Card.Meta>
                                <Card.Meta>{address.country}</Card.Meta>
                                <Card.Meta>{address.pincode}</Card.Meta>
                                <Card.Meta>{address.phone}</Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <div >
                                <Link style={{ color: 'blue' }} to='/updateAddress' className="nav-link" >
                                    Edit 
                                </Link>
                                 | 
                                <Link style={{ color: 'blue' }} to='/deleteAddress' className="nav-link">
                                    Remove
                                </Link>
                                </div>
                            </Card.Content>
                            </Card>
                        </Card.Group>
                    </div> 
                )
            }) 
        }
        
        return(
            <div>
                <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                <div style={{ marginTop: "72px" }}>
                    <Header as='h1'>Your Addresses</Header>
                </div>
            </div>
            {getAddress}
            <div>
            <Link to='/addAddress' className="nav-link">
            <Button primary>Add Address</Button>
            </Link>
            </div>
            </div>
            
        )
         
    }           
                
}

export default withRouter(address);