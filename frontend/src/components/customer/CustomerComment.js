
import React, { Component } from 'react'
import { getReview } from "../../actions/product"
import PropTypes from 'prop-types'
import {
    Rating,
    Comment,
    Grid,
    Progress,
    Header,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

class CustomerComment extends Component {

    render() {
        return (
            <div>
                {
                    this.props.customerComments
                        ?
                        <Grid.Column width={8} textAlign='left'>
                            <Comment.Group style={{ width: '100%' }} size='large'>
                                {
                                    this.props.customerComments.map(item => (
                                        <Comment textAlign='left'>
                                            <Comment.Avatar src='/userpreview.png' square />
                                            <Comment.Content>
                                                <Comment.Author as='a'>{item.header}</Comment.Author>
                                                <Comment.Text><Rating maxRating={5} defaultRating={item.rating} icon='star' size='small' disabled /></Comment.Text>
                                                <Comment.Text>{item.comment}</Comment.Text>
                                            </Comment.Content>
                                        </Comment>
                                    ))
                                }
                            </Comment.Group>
                        </Grid.Column>
                        :
                        <Grid columns={1}>
                            <Grid.Column>
                                <Header>No Comment Posted!</Header>
                            </Grid.Column>
                        </Grid>
                }
            </div>
        );
    }
}

CustomerComment.propTypes = {
    profile: PropTypes.object.isRequired,
    customerComments: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    profile: state.customer.profile,
    customerComments: state.customer.customerComments
})

export default connect(mapStateToProps, null)(CustomerComment);