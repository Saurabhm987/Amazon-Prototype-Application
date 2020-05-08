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

class ProductComment extends Component {
    constructor(props) {
        super(props);
        
        this.state= { rating: 1}
    }
    

    componentDidMount = async () => {

        let id = this.props.productId
        let rating = this.props.rating

        await this.setState({rating: rating});

        await this.props.getReview(id)
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
                        {
                            this.props.productDetail.overallRating
                            ?
                            <Grid.Row>
                                <Comment.Text><Rating maxRating={5} defaultRating={this.props.productDetail.overallRating} icon='star' size='small' disabled /></Comment.Text>
                            </Grid.Row>
                            :null
                        }
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
                    {
                        this.props.reviews && this.props.reviews.length > 0
                            ?
                            <Grid.Column width={8} textAlign='left'>
                                <Comment.Group style={{ width: '100%' }} size='large'>
                                    {
                                        this.props.reviews && this.props.reviews.map(item => (
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

                </Grid>
            </div>
        );
    }
}

ProductComment.propTypes = {
    reviews: PropTypes.array.isRequired,
    getReview: PropTypes.func.isRequired,
    productDetail: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    reviews: state.product.reviews,
    productDetail: state.product.productDetail
})

export default connect(mapStateToProps, { getReview })(ProductComment);