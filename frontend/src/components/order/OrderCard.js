import React, { Component } from 'react'
import { Container, Grid, Segment, Menu, Header, Placeholder, Dropdown, Button, Card, Image } from 'semantic-ui-react'
var _ = require('lodash');


export default class orderCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var orders = _.mapValues(_.groupBy(this.props.orders, 'orderId'),clist => clist.map(order => _.omit(order, 'orderId')));

        console.log(orders);
        
        const options = [
            { key: 1, text: 'Ordered', value: 1 },
            { key: 2, text: 'Packing', value: 2 },
            { key: 3, text: 'Out For Delivery', value: 3 },
        ]
        return (
            <div>
                {Object.keys(orders).map(orderId => {

                    return (
                        <Card fluid>
                            <Card.Content>
                                <Header as='h3'>ORDER ID: {orderId}</Header>
                            </Card.Content>
                            {orders[orderId].map(product => {
                                return (
                                    <Card.Content>
                                        <Grid columns={3}>
                                            <Grid.Column width={3}>
                                                <Placeholder>
                                                    {product.productId.images[0] ? (
                                                        <Image src={product.productId.images[0]} size='small' />
                                                    ) : (
                                                            <Placeholder.Image style={{ width: '100px', height: '100px' }}></Placeholder.Image>
                                                        )}

                                                </Placeholder>
                                            </Grid.Column>
                                            <Grid.Column width={8}>
                                                <Grid.Row>
                                                    <Header as='h4'>{product.productId.name}</Header>
                                                </Grid.Row>
                                                <br></br>
                                                <Grid.Row>
                                                    <Header as='h5' color='grey'>Current Status: {product.status.status}</Header>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Menu compact>
                                                        <Dropdown placeholder='Change Status' options={options} simple item compact />
                                                    </Menu>
                                                </Grid.Row>
                                            </Grid.Column>
                                            <Grid.Column width={5}>
                                                <Grid.Row>
                                                    <Button color='blue' floated='right' style={{ height: '35px', width: '150px', margin: '5px' }}>Details</Button>
                                                </Grid.Row>
                                                <Grid.Row>
                                                    <Button color='grey' floated='right' style={{ height: '35px', width: '150px', margin: '5px' }}>Products Page</Button>
                                                </Grid.Row>
                                            </Grid.Column>
                                        </Grid>
                                    </Card.Content>
                                )
                            }
                            )}
                        </Card>
                    )
                })}
            </div>
        )
    }
}
