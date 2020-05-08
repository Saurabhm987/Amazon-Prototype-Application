import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { fetchProduct, productCategories } from '../../actions/product';
import CustomerDashLoader from '../loader/customerDashLoader'
import { Divider, Input, Button } from 'semantic-ui-react'

import {

    Header,
    Image,
    Placeholder,
    Card,
    Rating,
    Grid,
    Pagination,

} from 'semantic-ui-react';


class CustomerDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            loading: true,
            hovered: false,
            activePage: 1,
            price: -1,
            rating: 0,
        }

    }


    componentDidMount = async () => {
        await this.props.fetchProduct()
        await this.props.productCategories()
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }

    handlePaginationChange = async (e, { activePage }) => {
        await this.setState({ activePage });
        await this.handleSearch()
    }

    handleSearch = async () => {

        await window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

        await this.setState({ loading: true });

        console.log('activePage', this.state.activePage)

        await this.props.fetchProduct('', '', this.state.activePage, '')

        await setTimeout(() => {
            this.setState({ loading: false });
        }, 500);
    }


    handleRateFilter = async (e) => {
        let rat = e.currentTarget.dataset.rating
        this.setState({ rating: rat });
        console.log('rat - ', rat)
        await this.props.fetchProduct('', '', this.state.activePage, '', rat, -1)
    }

    handlePriceFilter = async () => {

        await this.props.fetchProduct('', '', this.state.activePage, '', this.state.rating, this.state.price)
    }

    onClickHandler = async (e) => {
        let id = e.currentTarget.dataset._id
        this.props.history.push(`/productdetails/?id=${id}`)
    }

    render() {
        return (
            <div style={{ marginLeft: '10px', marginRight: '10px' }}>
                <div style={{ marginTop: "72px" }}>
                    <Header as='h1'>Amazon Essesntials</Header>
                </div>

                {
                    this.state.loading
                        ? <CustomerDashLoader />
                        : <Card.Group itemsPerRow={4} style={{ marginTop: '15px' }}>
                            <Card >
                                <Card.Content >
                                    <Image square size='medium' src={"prod3.jpg"} alt="" />
                                </Card.Content>
                            </Card>
                            <Card >
                                <Card.Content >
                                    <Image square size='medium' src={"prod4.jpg"} alt="" />
                                </Card.Content>
                            </Card>
                            <Card >
                                <Card.Content >
                                    <Image square size='medium' src={"prod5.jpg"} alt="" />
                                </Card.Content>
                            </Card>
                            <Card >
                                <Card.Content >
                                    <Image square size='medium' src={"prod6.jpg"} alt="" />
                                </Card.Content>
                            </Card>
                        </Card.Group>
                }

                <Header as='h1'>Products for you </Header>
                <Grid columns={2} centered textAlign='center'>
                    <Grid.Column width={1}>
                        <Grid.Row>
                            <Header style={{ fontSize: '1em' }}>Avg. customer review</Header>
                            <Rating maxRating={5} data-rating='4' defaultRating={4} onClick={this.handleRateFilter} icon='star' size='large' disabled />
                            <Rating maxRating={5} data-rating='3' defaultRating={3} onClick={this.handleRateFilter} icon='star' size='large' disabled />
                            <Rating maxRating={5} data-rating='2' defaultRating={2} onClick={this.handleRateFilter} icon='star' size='large' disabled />
                            <Rating maxRating={5} data-rating='1' defaultRating={1} onClick={this.handleRateFilter} icon='star' size='large' disabled />
                        </Grid.Row>
                        <br />
                        <Grid.Row>
                            <Input name='price' onChange={(e) => this.setState({ price: e.target.value })} type='text' size='small' fluid />
                            <Button onClick={this.handlePriceFilter}>Filter</Button>
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column width={1} style={{ width: '50%' }}>
                        <Divider vertical fitted><span color='grey'></span></Divider>
                    </Grid.Column>
                    <Grid.Column width={14}>
                        <Card.Group itemsPerRow={6} stackable>
                            {this.props.productList.map((item, index) => (
                                <Card key={item._id} data-_id={item._id} onClick={this.onClickHandler}>
                                    {this.state.loading ? (
                                        <Placeholder>
                                            <Placeholder.Image square size='small' />
                                        </Placeholder>
                                    ) : (
                                            <Image
                                                src={item.images[0]} alt=""
                                                style={{ width: '300px', height: '250px' }}
                                            />
                                        )}

                                    <Card.Content extra textAlign='left'>
                                        {this.state.loading ? (
                                            <Placeholder>
                                                <Placeholder.Header>
                                                    <Placeholder.Line length='very short' />
                                                    <Placeholder.Line length='medium' />
                                                </Placeholder.Header>
                                                <Placeholder.Paragraph>
                                                    <Placeholder.Line length='short' />
                                                </Placeholder.Paragraph>
                                            </Placeholder>
                                        ) : (
                                                <Fragment>
                                                    <Card.Header style={{ fontWeight: 400 }}>{item.name}</Card.Header>
                                                    <Card.Meta>
                                                        <Rating maxRating={5} defaultRating={item.overallRating || 1} icon='star' size='small' disabled />
                                                    </Card.Meta>
                                                    <Card.Description>$ {item.price} Save ${item.price - 10}</Card.Description>
                                                </Fragment>
                                            )}
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    </Grid.Column>
                </Grid>
                <br />
                <br />
                <Grid columns={1}>
                    <Grid.Column>
                        <Grid.Row>
                            {
                                this.props.productCount && this.props.productCount > 1
                                    ?
                                    (
                                        <Pagination
                                            activePage={this.state.activePage}
                                            onPageChange={this.handlePaginationChange}
                                            totalPages={(Math.trunc(this.props.productCount / 12)) + 1}
                                        />
                                    ) :
                                    (
                                        <Pagination
                                            activePage={this.state.activePage}
                                            onPageChange={this.handlePaginationChange}
                                            totalPages={1}
                                        />
                                    )
                            }

                        </Grid.Row>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
    catch(e) {
        return (<div>Loading...</div>)
    }
}


// const FixedMenuLayout = (props) => {
//   // if (!props.user) {
//   //   return <Redirect to = '/' />
//   // }
//   return (
//     <div>

//     </div>
//   )

// }

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    fetchProduct: PropTypes.func.isRequired,
    categoryList: PropTypes.array.isRequired,
    productList: PropTypes.array.isRequired,
    productCount: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    productList: state.product.productList,
    categoryList: state.product.categoryList,
    productCount: state.product.productCount,
})

export default connect(mapStateToProps, {
    logout,
    fetchProduct,
    productCategories,
})(CustomerDashboard);