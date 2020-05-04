import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { fetchProduct, productCategories } from '../../actions/product';
import CustomerDashLoader from '../loader/customerDashLoader'

import {
    Header,
    Image,
    Placeholder,
    Card,
    Rating,
} from 'semantic-ui-react';


class CustomerDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchText: '',
            loading: true,
        }
    
    }


    componentDidMount = async () => {

        await this.props.fetchProduct()
        await this.props.productCategories()
        setTimeout(() => {
            this.setState({loading:false});
        }, 1000);
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

                {this.state.loading
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

                <Card.Group itemsPerRow={6} stackable>
                    {this.props.productList.map((item, index) => (
                        <Card key={item._id} data-_id={item._id} onClick={this.onClickHandler}>
                            {this.state.loading ? (
                                <Placeholder>
                                    <Placeholder.Image square size='small' />
                                </Placeholder>
                            ) : (
                                    <Image src={item.images[0]} alt="" style={{ width: '300px', height: '300px' }} />
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
                                            <Card.Header>{item.name}</Card.Header>
                                            <Card.Meta>
                                                <Rating maxRating={5} defaultRating={3} icon='star' size='small' disabled />
                                            </Card.Meta>
                                            <Card.Description>$ {item.price} Save ${item.price - 10}</Card.Description>
                                        </Fragment>
                                    )}
                            </Card.Content>
                        </Card>
                    ))}
                </Card.Group>
            </div>
        );
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
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    productList: state.product.productList,
    categoryList: state.product.categoryList
})

export default connect(mapStateToProps, {
    logout,
    fetchProduct,
    productCategories,
})(CustomerDashboard);