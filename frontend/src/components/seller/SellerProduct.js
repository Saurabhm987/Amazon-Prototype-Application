import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import {Link} from 'react-router-dom';
import { productCategories, updateProduct, deleteProduct, getSellerProductsPaginated, getSellerProducts } from '../../actions/product'

import {

    Placeholder,
    Grid,
    Rating,
    Image,
    Divider,
    Button,
    Form,
    Segment,
    Header,
    Modal,
    Dropdown,
    Input,
    Select,
    Pagination,
    Portal,

} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';

class SellerProduct extends Component {
    constructor(props) {
        super(props);

        this.state = {

            loading: true,
            editmode: false,
            modalOpen: false,
            selectedProduct: '',
            adminAccess: false,
            portalOpen: false,
            name: '',
            description: '',
            quantity: '',
            price: '',
            data: [{ key: '', text: '', value: '' }],
            selectedCategory: '',
            selectedProduct: '',
            userId: '',
            searchText: '',
            offset: 1,
            searchCategory: '',
            sortType: '',
            sellerId: '',
            activePage: 1,
            count: 0,

        }
    }

    componentDidMount = async () => {

        const sellerId = await queryString.parse(this.props.location.search);
        await this.setState({ sellerId: sellerId.id })
        let token = localStorage.getItem('token')

        if (token !== null) {
            let user = jwtDecode(token);
            this.setState({ userId: user.userId });
            if (user.userId === sellerId.id) {
                this.setState({ adminAccess: true });
            }
        } else {
            this.props.history.push('/login')
        }

        await this.props.getSellerProductsPaginated('', '', this.state.offset, '', sellerId.id)
        await this.props.productCategories()
        await this.createOptions()
        await this.setState({ loading: false })

    }

    createOptions = async () => {

        await this.setState({
            data: this.props.categoryList.map(
                item => {
                    return { key: item._id, text: item.name, value: item.name }
                }
            )
        });

    }

    handleInputChange = async (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleClose = () => {
        this.setState({ modalOpen: false })
    }

    editHandler = async (e) => {
        e.preventDefault()
        this.setState({
            selectedProduct: e.currentTarget.dataset.productid,
            modalOpen: true,
        });
    }

    categoryHandler = async (e, { value }) => {
        this.setState({ selectedCategory: value });
    }

    handleSearchCategory = async (e, { value }) => {
        this.setState({ searchCategory: value });
    }

    handlePaginationChange = async (e, { activePage }) => {
        await this.setState({ activePage });
        await this.handleSearch()
    }

    handleRoute = async (e) => {

        this.props.history.push(`/productdetails/?id=${e.currentTarget.dataset.id}`)

    }

    handleSearch = async () => {

        await window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })

        await this.setState({ loading: true });

        const {
            searchText,
            searchCategory,
            activePage,
            sortType,
        } = this.state

        var userId = ''

        if (this.state.adminAccess) {
            userId = this.state.userId
        } else if (!this.state.adminAccess) {
            userId = this.state.sellerId
        }

        await this.props.getSellerProductsPaginated(searchText, searchCategory, activePage, sortType, userId)
        await setTimeout(() => {
            this.setState({ loading: false });
        }, 500);
    }

    updateHandler = async (e) => {

        let id = e.currentTarget.dataset.id

        const {
            name,
            description,
            price,
            quantity,
            selectedCategory,
            activePage,
            sellerId,
        } = this.state

        const body = {
            name: name || e.currentTarget.dataset.productname,
            description: description || e.currentTarget.dataset.description,
            quantity: quantity || e.currentTarget.dataset.quantity,
            price: price || e.currentTarget.dataset.price,
            category: selectedCategory || e.currentTarget.dataset.category,
        }

        await this.props.updateProduct(id, body)
        await this.props.getSellerProductsPaginated('', selectedCategory, activePage, '', sellerId)
        await alert('Product Updated!')
        await this.setState({ modalOpen: false }); 
        window.location.reload();

    }

    deleteHandler = async (e) => {
        e.preventDefault()

        const {
            selectedCategory,
            activePage,
            sellerId
        } = this.state

        this.setState({ loading: true });
        let productId = e.currentTarget.dataset.deleteid
        await this.props.deleteProduct(productId)
        await this.props.getSellerProductsPaginated('', selectedCategory, activePage, '', sellerId)
        await this.setState({ loading: false });
        await this.setState({ portalOpen: true });

        await setTimeout(() => {
            this.setState({ portalOpen: false });
        }, 1500);
    }

    render() {

        let token = localStorage.getItem('token')
        if (token === null) {
            return <Redirect to='/login' />
        }

        let placeholder = (
            <Fragment>
                <Grid columns={3}>
                    <Grid.Row style={{ width: '100%' }}>
                        <Grid.Column width={1}></Grid.Column>
                        <Grid.Column width={2}>
                            <Placeholder>
                                <Placeholder.Image square style={{ width: '210px', height: '210px' }}></Placeholder.Image>
                            </Placeholder>
                        </Grid.Column>
                        <Grid.Column>
                            <Placeholder>
                                <Placeholder.Line length='full' />
                                <Placeholder.Line length='full' />
                                <Placeholder.Line length='full' />
                                <Placeholder.Line length='full' />
                                <Placeholder.Line length='short' />
                                <Placeholder.Line length='short' />
                                <Placeholder.Line length='short' />
                                <Placeholder.Line length='short' />
                                <Placeholder.Line length='short' />
                            </Placeholder>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Fragment>
        )

        if (this.state.selectedProduct !== undefined) {
            if (this.props.productList && this.props.productList.length > 0) {

                var editOption = []

                editOption = this.props.productList.filter((item) => item._id === this.state.selectedProduct)

            }
        }

        let portal = (
            <Portal open={this.state.portalOpen}>
                <Segment
                    style={{
                        left: '40%',
                        position: 'fixed',
                        top: '50%',
                        zIndex: 1000,
                    }}
                >

                <Header style={{ fontWeight: 400 }}>Product has been deleted!</Header>
  
                </Segment>
            </Portal>
        )

        let modal = (
            <Modal centered={false} open={this.state.modalOpen} onClose={this.handleClose} closeIcon>
                <Modal.Header>Add a product</Modal.Header>
                <Modal.Content image>
                    <Grid.Column columns={2}>
                        <Header>Product Images</Header>
                        <Segment style={{ height: '330px' }}>
                            <Grid columns={2}>
                                {
                                    editOption && editOption.length > 0
                                        ?
                                        (
                                            <Grid.Row>
                                                {
                                                    editOption[0].images.map((item, index) =>
                                                        <Grid.Column>
                                                            <Image wrapped size='medium' src={item} key={index} alt="Image Preview" style={{ width: "80px", height: "80px", margin: '5px' }} />
                                                        </Grid.Column>
                                                    )
                                                }
                                            </Grid.Row>
                                        )
                                        :
                                        (
                                            <Placeholder>
                                                <Placeholder.Image style={{ width: '80px', height: '80px' }}></Placeholder.Image>
                                            </Placeholder>
                                        )
                                }

                            </Grid>
                        </Segment>
                        <Grid.Row>
                            {/* <Input type="file" multiple onChange={this.hanldeFileChange} /> */}
                        </Grid.Row>
                    </Grid.Column>
                    <Modal.Description>
                        <Grid columns={1}>
                            <Header>Rquired Info</Header>
                            <Grid.Row style={{ width: '100%' }}>
                                <Grid.Column>
                                    {
                                        editOption && editOption.length > 0
                                            ?
                                            (
                                                <Form onSubmit={this.addproduct}>
                                                    <Segment stacked >
                                                        <Form.TextArea name='name' type="text" label="Product Name" defaultValue={editOption[0].name || ''} onChange={this.handleInputChange} />
                                                        <Form.TextArea name='description' type="text" label="Product Description" defaultValue={editOption[0].description || ''} onChange={this.handleInputChange} />
                                                        <Form.Input name='quantity' type="number" label="Quantity" defaultValue={editOption[0].quantity || ''} onChange={this.handleInputChange} />
                                                        <Form.Input name='price' type="number" label="Standard Price" defaultValue={editOption[0].price || ''} onChange={this.handleInputChange} />
                                                        <Form.Field>
                                                            <label>Category Options</label>
                                                            {
                                                                this.props.categoryList
                                                                    ? <Dropdown
                                                                        selection
                                                                        search
                                                                        options={this.state.data}
                                                                        defaultValue={editOption[0].category || ''}
                                                                        onChange={this.categoryHandler}
                                                                        placeholder='choose category'
                                                                    />
                                                                    : null
                                                            }
                                                        </Form.Field>
                                                        <Form.Field>
                                                            <Form.Button
                                                                color='teal'
                                                                type='submit'
                                                                data-id={editOption[0]._id}
                                                                onClick={this.updateHandler}
                                                                data-productname={editOption[0].name}
                                                                data-description={editOption[0].description}
                                                                data-price={editOption[0].price}
                                                                data-quantity={editOption[0].quantity}
                                                                data-category={editOption[0].category}
                                                            >Update Product
                                                            </Form.Button>
                                                        </Form.Field>
                                                    </Segment>
                                                </Form>
                                            )
                                            : null
                                    }

                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )


        return (
            <div style={{ marginTop: '80px', backgroundColor: 'white' }}>
                <Grid style={{ marginLeft: '80px' }}>
                    <Grid.Row style={{ marginLeft: '40px' }}>
                        <Input size='large' type='text' name='searchText' placeholder='Search...' style={{ width: '70%' }} action onChange={this.handleInputChange}>
                            <input />
                            <Select onChange={this.handleSearchCategory} options={this.state.data} value={this.state.data.value} />
                            <Button type='submit' onClick={this.handleSearch}>Search</Button>
                        </Input>
                    </Grid.Row>
                    {
                        this.props.productList && this.props.productList.length && !this.state.loading > 0
                            ?
                            (
                                <Grid.Row style={{ marginLeft: '40px' }}>
                                    <h3>Price and other details may vary based on size and color</h3>
                                </Grid.Row>
                            )
                            : null
                    }
                </Grid>
                <br />
                {
                    this.props.productList && this.props.productList.length > 0 && !this.state.loading
                        ?
                        (
                            <div>
                                {
                                    this.props.productList.map((item, index) =>
                                        <Grid columns={1} textAlign='left'>
                                            <Fragment>
                                                <Grid columns={3} textAlign='left'>
                                                    <Grid.Row>
                                                        <Grid.Column width={1}>
                                                        </Grid.Column>
                                                        <Grid.Column width={2}>
                                                            <Image src={item.images[0]} style={{ width: '210px', height: '210px' }} />
                                                        </Grid.Column>
                                                        <Grid.Column style={{marginTop:'10px'}}>
                                                            <Grid.Row>
                                                                <Header style={{ fontWeight: '400' }} data-id={item._id} onClick={this.handleRoute}>{item.name}</Header>
                                                            </Grid.Row>
                                                            <Grid.Row>
                                                                <Rating maxRating={5} defaultRating={item.overallRating ||1} icon='star' size='small' disabled />
                                                            </Grid.Row>
                                                            <Grid.Row>
                                                                <b>Best Price: $ {item.price} </b>
                                                            </Grid.Row>
                                                            {/* <Grid.Row>
                                                                <b>Gift Price: $ {item.giftPrice} </b>
                                                            </Grid.Row> */}
                                                            <Grid.Row>
                                                                <b>Quantity: {item.quantity} </b>
                                                            </Grid.Row>
                                                            <Grid.Row>
                                                                <span style={{ color: 'blue' }}><b>prime</b></span>
                                                            </Grid.Row>
                                                            <br />
                                                            {
                                                                this.state.adminAccess
                                                                    ?
                                                                    <Grid.Row verticalAlign='bottom' >
                                                                        <Button color='green' data-productid={item._id} onClick={this.editHandler}>Edit</Button>
                                                                        {modal}
                                                                        {portal}
                                                                        <Button color='red' data-deleteid={item._id} onClick={this.deleteHandler}>Delete</Button>
                                                                    </Grid.Row>
                                                                    : null
                                                            }
                                                        </Grid.Column>
                                                    </Grid.Row>
                                                    <Divider />
                                                </Grid>
                                            </Fragment>
                                        </Grid>
                                    )
                                }
                            </div>
                        )
                        :
                        (
                            <div style={{ marginLeft: '30px' }}>
                                {
                                    !this.state.loading && this.props.productList && this.props.productList.length === 0
                                        ?
                                        <Grid style={{ marginTop: '20px' }}>
                                            <Grid.Column>
                                                <Header>Result not found</Header>
                                            </Grid.Column>
                                        </Grid>
                                        :
                                        (
                                            <div>
                                                {placeholder}
                                                {placeholder}
                                                {placeholder}
                                            </div>

                                        )
                                }
                            </div>
                        )
                }

                <br />
                <Grid columns={1}>
                    <Grid.Column>
                        <Grid.Row>
                            {
                                this.props.productCount && this.props.productCount > 1
                                    ?
                                    (this.props.productCount % 3 !== 0
                                        ?
                                        <Pagination
                                            activePage={this.state.activePage}
                                            onPageChange={this.handlePaginationChange}
                                            totalPages={(Math.trunc(this.props.productCount / 3)) + 1}
                                        />
                                        :
                                        <Pagination
                                            activePage={this.state.activePage}
                                            onPageChange={this.handlePaginationChange}
                                            totalPages={this.props.productCount / 3}
                                        />

                                    )
                                    :
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
}

SellerProduct.propTypes = {
    getSellerProducts: PropTypes.func.isRequired,
    productList: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    productCategories: PropTypes.func.isRequired,
    categoryList: PropTypes.array.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    getSellerProductsPaginated: PropTypes.func.isRequired,
    productCount: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
    productList: state.product.productList,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    categoryList: state.product.categoryList,
    productCount: state.product.productCount,
})

export default connect(
    mapStateToProps,
    {
        getSellerProducts,
        productCategories,
        updateProduct,
        deleteProduct,
        getSellerProductsPaginated,

    })(SellerProduct)