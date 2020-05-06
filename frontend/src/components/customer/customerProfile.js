import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Image, Container, Button, Header, Segment } from 'semantic-ui-react'
import Photo from './face.jpeg'


export default class CustomerProfile extends Component {
    static propTypes = {
        prop: PropTypes
    }

    render() {
        return (
            <Container style={{ marginTop: '70px' }}>
                <Container style={{ padding: '30px' }} fluid>
                    <Grid columns={2}>
                        <Grid.Column width={4}>
                            {/* <Image src={Photo} size='small' circular /> */}
                            <Card>
                                <Image src={Photo} wrapped ui={false} />
                                <Card.Content>
                                    <Card.Header>Matthew</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>Joined in 2015</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        Matthew is a musician living in Nashville.
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button>Edit Profile</Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Segment fluid>
                                <Segment circular inverted style={{ width: 175, height: 175 }}>
                                    <Header as='h2' inverted>
                                        Votes
                                    <Header.Subheader>1000</Header.Subheader>
                                    </Header>
                                </Segment>
                                <Segment circular inverted style={{ width: 175, height: 175 }}>
                                    <Header as='h2' inverted>
                                        Comments
                                <Header.Subheader>560</Header.Subheader>
                                    </Header>
                                </Segment>
                            </Segment>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Container>
        )
    }
}
