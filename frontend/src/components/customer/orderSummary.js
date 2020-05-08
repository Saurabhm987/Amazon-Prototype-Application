import React, { Component } from 'react'
import { Menu, Image, Grid, Header, Segment , Button, Container} from 'semantic-ui-react'

class OrderSummary extends Component {


    render() {
        return (
            <div>
                <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                    <div style={{ marginTop: "72px" }}>
                    <Header as='h1'>Your Order Summary</Header>
                    </div>
                    <br/>
                    <br/>
                </div>
                <Segment>
                    <Header>
                    No documents are listed for this customer.
                    </Header>
                </Segment>
            </div>
        )

    }
}

export default OrderSummary