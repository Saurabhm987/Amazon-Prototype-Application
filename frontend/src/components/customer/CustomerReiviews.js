import React, { Component } from 'react';
import queryString from 'query-string';
import {addReview} from '../../actions/customer'
import {
    Divider,
    Grid,
    Rating,
    Header,
    Input,
    TextArea,
    Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';

class CustomerReiviews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 1,
            header:'',
            productId:'',
            comment:''
        }
    }

    componentDidMount = async () => {
        
        await window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
        const productId = await queryString.parse(this.props.location.search);
        console.log('id -----', productId.pid)
        this.setState({ productId: productId.pid});
    }

    hanldeChange = async (e, {name, value}) => {

        this.setState({[name] : value});
    }

    handleSubmit = async (e, {value}) => {

        const{
            rating,
            header,
            comment,
            productId,
        } = this.state

        const body = {
            rating: rating,
            header: header,
            comment: comment,
        }

        await this.props.addReview(productId, body)
        
        this.props.history.push(`/productdetails/?id=${productId}`)
    }

    render() {
        return (
            <div className='container' style={{ marginTop: '80px' }}>
                <br />
                <br />
                <br />
                <Grid columns={3} textAlign='left'>
                    <Grid.Column></Grid.Column>
                    <Grid.Column>
                        <Grid.Row>
                            <Header>Create Review</Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Divider />
                        </Grid.Row>
                        <Grid.Row>
                            <Header>Overall Rating</Header>
                        </Grid.Row>
                        <br />
                        <Grid.Row>
                            <Rating maxRating={5} name='rating' defaultRating={this.state.rating} onRate={(e, {rating}) => {this.setState({rating: rating})}} icon='star' size='massive'/>
                        </Grid.Row>
                        <Grid.Row>
                            <Divider />
                        </Grid.Row>
                        <Grid.Row>
                            <Header>Add a headline</Header>
                        </Grid.Row>
                        <br />
                        <Grid.Row>
                            <Input fluid placeholder='headline' name='header' onChange={this.hanldeChange} />
                        </Grid.Row> 
                        <br />
                        <Grid.Row>
                            <Header>Write your review</Header>
                        </Grid.Row>
                        <br />
                        <Grid.Row >
                            <TextArea placeholder='Reiview' name='comment' rows={5} onChange={this.hanldeChange} style={{width:'100%'}}/>
                        </Grid.Row>
                        <br />
                        <Grid.Row style={{ float:'left'}}>
                            <Button onClick={this.handleSubmit}>Submit</Button>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column></Grid.Column>
                </Grid>
            </div>
        );
    }
}


export default connect(null, {addReview})(CustomerReiviews);