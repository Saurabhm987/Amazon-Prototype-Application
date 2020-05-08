import React, { Component } from 'react';

import {

    Rating,
    Comment,
    Grid,
    Progress,

} from 'semantic-ui-react';

class Feedback extends Component {
    componentDidMount = async () => {

    }

    render() {
        return (
            <div style={{ margin: '20px' }}>
                <Grid columns='equal'>
                    <Grid.Column width={4}>
                        <br />
                        <Grid.Row>
                            Average Customer Review
                        </Grid.Row>
                        <br />
                        <Grid.Row>
                            <Comment.Text><Rating maxRating={5} defaultRating={3} icon='star' size='small' disabled /></Comment.Text>
                        </Grid.Row>
                        <br />
                        <Grid.Row>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        5 Star
                                    </Grid.Column>
                                    <Grid.Column width={13}>
                                        <Progress percent={80} size='small' indicating></Progress>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        4 Star
                                    </Grid.Column>
                                    <Grid.Column width={13}>
                                        <Progress percent={70} size='small' indicating></Progress>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        3 Star
                                    </Grid.Column>
                                    <Grid.Column width={13}>
                                        <Progress percent={40} size='small' indicating></Progress>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        2 Star
                                    </Grid.Column>
                                    <Grid.Column width={13}>
                                        <Progress percent={30} size='small' indicating></Progress>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid columns={2}>
                                <Grid.Row>
                                    <Grid.Column width={3}>
                                        1 Star
                                    </Grid.Column>
                                    <Grid.Column width={13}>
                                        <Progress percent={10} size='small' indicating></Progress>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={2}></Grid.Column>
                    <Grid.Column width={8} textAlign='left'>
                        <Comment.Group style={{ width: '100%' }} size='large'>
                            <Comment textAlign='left'>
                                <Comment.Avatar src='/userpreview.png' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Matt</Comment.Author>
                                    <Comment.Text><Rating maxRating={5} defaultRating={3} icon='star' size='small' disabled /></Comment.Text>
                                    <Comment.Text>How artistic!</Comment.Text>
                                </Comment.Content>
                            </Comment>

                            <Comment>
                                <Comment.Avatar src='/userpreview.png' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Elliot Fu</Comment.Author>
                                    <Comment.Text>
                                        <p>This has been very useful for my research. Thanks as well!</p>
                                    </Comment.Text>
                                </Comment.Content>
                                <Comment.Group>
                                    <Comment>
                                        <Comment.Avatar src='/userpreview.png' />
                                        <Comment.Content>
                                            <Comment.Author as='a'>Jenny Hess</Comment.Author>
                                            <Comment.Metadata>
                                                <div>Just now</div>
                                            </Comment.Metadata>
                                            <Comment.Text>Elliot you are always so right :)</Comment.Text>
                                        </Comment.Content>
                                    </Comment>
                                </Comment.Group>
                            </Comment>

                            <Comment>
                                <Comment.Avatar src='/userpreview.png' />
                                <Comment.Content>
                                    <Comment.Author as='a'>Joe Henderson</Comment.Author>
                                    <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                                </Comment.Content>
                            </Comment>

                            {/* <Form reply>
                                <Form.TextArea />
                                <Button content='Add Reply' labelPosition='left' icon='edit' primary />
                            </Form> */}
                        </Comment.Group>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default Feedback;