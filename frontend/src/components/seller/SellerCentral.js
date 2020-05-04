import React, { Component } from 'react'
import { Container, Grid, Segment, Menu, Header } from 'semantic-ui-react'
import CentralHeader from '../header/CentralHeader'
import AddProduct from '../product/AddProduct'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class SellerCentral extends Component {
    constructor(props) {
        super(props);

        this.state = { activeItem: 'Growth' }

    }

    componentDidMount = () => {
        if(!this.props.isAuthenticated){
            this.props.history.push('/login')
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const { activeItem } = this.state
        return (
            <Container style={{marginBottom:'20px'}}>
                <CentralHeader></CentralHeader>
                <br></br>
                <Grid columns={2}>
                    <Grid.Column width={5}>
                        <Segment textAlign='left'>
                            <Header as='h3'>Your Orders</Header>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14}>
                                        <Header as='h3' color='blue'>Pending</Header>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Header as='h3' color='blue'>0</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14}>
                                        <Header as='h3' color='blue'>Premium unshipped</Header>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Header as='h3' color='blue'>0</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14}>
                                        <Header as='h3' color='blue'>Unshipped</Header>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Header as='h3' color='blue'>0</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                            <Segment inverted color='blue' tertiary key='mini' size='mini'>
                                <Grid columns={2}>
                                    <Grid.Column width={14}>
                                        <Header as='h3' color='blue'>Return Requests</Header>
                                    </Grid.Column>
                                    <Grid.Column width={2}>
                                        <Header as='h3' color='blue'>0</Header>
                                    </Grid.Column>
                                </Grid>
                            </Segment>

                            <Header as='h3'>Seller Fulfilled</Header>
                            <Grid.Row>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last day</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last 7 days</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>

                            <Header as='h3'>Fulfilled by Amazon</Header>
                            <Grid.Row>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last day</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                                <Grid.Column>
                                    <Grid columns={2}>
                                        <Grid.Column width={14}>
                                            <Header as='h5' color='grey'>In last 7 days</Header>
                                        </Grid.Column>
                                        <Grid.Column width={2}>
                                            <Header as='h5' color='blue'>0</Header>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Column>
                            </Grid.Row>
                            <br></br>
                            <Container textAlign='center'>
                                <Header as='h4' color='blue' >View your Orders</Header>
                            </Container>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <Segment textAlign='left'>
                            <Header as='h2'>Title</Header>
                        The Paragraphs module allows content creators to choose which kinds of paragraphs they want to place on the page, and the order in which they want to place them. They can do all of this through the familiar node edit screen. There is no need to resort to code, the dreaded block placement config screen or Panelizer overrides. They just use node edit form where all content is available to them in one place.
                        </Segment>
                        <br></br>
                        <Segment textAlign='left'>
                            <Header as='h2'>Amazon Selling Coach</Header>
                            <AddProduct />
                            <Grid columns={2}>
                                <Grid.Column width={5}>
                                    <Menu pointing vertical>
                                        <Menu.Item
                                            name='Top'
                                            active={activeItem === 'Top'}
                                            onClick={this.handleItemClick}
                                        />
                                        <Menu.Item
                                            name='Inventory'
                                            active={activeItem === 'Inventory'}
                                            onClick={this.handleItemClick}
                                        />
                                        <Menu.Item
                                            name='Pricing'
                                            active={activeItem === 'Pricing'}
                                            onClick={this.handleItemClick}
                                        />
                                        <Menu.Item
                                            name='Growth'
                                            active={activeItem === 'Growth'}
                                            onClick={this.handleItemClick}
                                        />
                                        <Menu.Item
                                            name='Advertising'
                                            active={activeItem === 'Advertising'}
                                            onClick={this.handleItemClick}
                                        />
                                        <Menu.Item
                                            name='Fulfillment'
                                            active={activeItem === 'Fulfillment'}
                                            onClick={this.handleItemClick}
                                        />
                                    </Menu>
                                </Grid.Column>

                                <Grid.Column stretched width={11}>
                                    <Container>
                                        This is an stretched grid column. This segment will always match the
                                        tab height. This will change wrt {this.state.activeItem} tab.
                                    </Container>
                                </Grid.Column>
                            </Grid>
                        </Segment>
                    </Grid.Column>
                </Grid>

            </Container>
        )
    }
}

SellerCentral.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, null)(SellerCentral)
