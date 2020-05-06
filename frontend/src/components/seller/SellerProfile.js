import React, { Component } from 'react'
import Feedback from './Feedback'
import queryString from 'query-string';

import {
    Tab,
    Grid,
    Segment,
    Header,
    Rating,
    TextArea,
    Button,
} from 'semantic-ui-react'
import { connect } from 'react-redux';
import JwtDecode from 'jwt-decode';


class SellerProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            activeIndex: 1,
            adminAccess: false
        }

    }

    componentDidMount = async () => {

        // const { userId } = this.props.user
        let user = localStorage.getItem('token')
        if(user !== null){
            let data = JwtDecode(user)
            var userId = data.userId
        }
        const sellerId = await queryString.parse(this.props.location.search);

        if(userId === sellerId.id){
            this.setState({ adminAccess : true });
        }

    }

    descriptionHandler = async () => {
        this.setState({ editMode: true });
    }

    sellerProductHandler = async () => {
        console.log('handling')
    }

    tabChangeHandler = async (e, data) => {

        const { userId } = this.props.user

        const sellerId = await queryString.parse(this.props.location.search);

        if (sellerId.id === null) {
            if (data.activeIndex === 3) {
                this.props.history.push(`/sellerproducts/?id=${userId}`)
            }
        } else {
            if (data.activeIndex === 3) {
                this.props.history.push(`/sellerproducts/?id=${sellerId.id}`)
            }
        }

    }

    render() {

        console.log('adminAccess ---- ', this.state.adminAccess)

        const panes = [
            {
                menuItem: 'Feedback',
                pane: { key: 'tab1', content: <Feedback />, size: 'massive' },
            },
            {
                menuItem: 'Help',
                pane: {
                    key: 'tab2',
                    content:
                        (
                            <div style={{ margin: '20px' }}>
                                <Grid columns={1} textAlign='left'>
                                    <Grid.Row>
                                        <Grid.Column>
                                            For questions about a charge that has been
                                            made to your credit card, please contact Amazon.
                                            Questions about how to place an order? Search Amazon Help.
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>

                            </div>
                        ),
                    textAlign: 'center',
                },
            },
            {
                menuItem: 'Gift Wrap',
                pane: {
                    key: 'tab3',
                    content: (
                        <div style={{ margin: '15px' }}>
                            <Grid columns={1} textAlign='left'>
                                <br />
                                <Header>Gift Wrap and Gift Messaging</Header>
                                <br />
                                <Grid.Row>
                                    <Grid.Column>
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry. Lorem Ipsum has been the industry's
                                        standard dummy text ever since the 1500s, when an unknown
                                        printer took a galley of type and scrambled it to make a
                                        type specimen book. It has survived not only five centuries,
                                        but also the leap into electronic typesetting, remaining
                                        essentially unchanged. It was popularised in the 1960s with
                                        the release of Letraset sheets containing Lorem Ipsum passages,
                                        and more recently with desktop publishing software like Aldus
                                        PageMaker including versions of Lorem Ipsum.
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </div>
                    ),
                },
            },
            {
                menuItem: 'Products',
                pane: (
                    <Tab.Pane key='tab4'></Tab.Pane>
                ),
            },
        ]

        return (
            <div style={{ margin: '80px 20px 20px 20px' }}>
                <Grid columns={1} width={16} textAlign='left'>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Grid.Row>
                                    <Grid columns={2}>
                                        <Grid.Column width={2}>
                                            <Header as='h2'>Seller Name</Header>
                                        </Grid.Column>
                                        <Grid.Column>
                                        </Grid.Column>
                                    </Grid>
                                </Grid.Row>
                                <Grid.Row>
                                    <a href='#'>Seller products</a>
                                </Grid.Row>
                                <Grid.Row>
                                    <Rating maxRating={5} defaultRating={3} icon='star' size='small' disabled />
                                    <span style={{ color: 'blue' }}>100% positive in the last 12 months </span>
                                </Grid.Row>
                                <br />
                                <Grid.Row>
                                    About
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column columns={1}>
                                        {this.state.editMode && this.state.adminAccess
                                            ?
                                            (
                                                <Grid columns={1} style={{ margin: '5px' }}>
                                                    <Grid.Row>
                                                        <TextArea rows={5} style={{ width: '50%' }} />
                                                    </Grid.Row>
                                                    <Grid.Row>
                                                        <Button green>Save</Button>
                                                        <Button red onClick={() => this.setState({ editMode: false })}>Cancel</Button>
                                                    </Grid.Row>
                                                </Grid>
                                            )
                                            :
                                            (
                                                <Grid.Column onClick={this.descriptionHandler}>
                                                    Lorem Ipsum is simply dummy text of the printing and
                                                    typesetting industry. Lorem Ipsum has been the industry's
                                                    standard dummy text ever since the 1500s, when an unknown
                                                    printer took a galley of type and scrambled it to make a
                                                    type specimen book. It has survived not only five centuries,
                                                    but also the leap into electronic typesetting, remaining
                                                    essentially unchanged. It was popularised in the 1960s with
                                                    the release of Letraset sheets containing Lorem Ipsum passages,
                                                    and more recently with desktop publishing software like Aldus
                                                    PageMaker including versions of Lorem Ipsum.
                                                </Grid.Column>
                                            )
                                        }
                                    </Grid.Column>
                                </Grid.Row>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <br />

                <Tab
                    panes={panes}
                    renderActiveOnly={false}
                    onTabChange={this.tabChangeHandler}
                    menuPosition={"left"}
                />

            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(SellerProfile)