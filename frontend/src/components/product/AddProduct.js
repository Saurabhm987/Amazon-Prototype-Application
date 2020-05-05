import React, { Component } from 'react';
import ProductCategoryDropdown from './productCategoryDropdown'
import PropTypes from 'prop-types'
import { addProduct } from '../../actions/product'
import FormData from 'form-data'
import { connect } from 'react-redux';

import {
  Button,
  Header,
  Image,
  Modal,
  Input,
  Grid,
  Segment,
  Form,
} from 'semantic-ui-react'

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      test: '',
      quantity: '',
      price: '',
      giftPrice: '',
      modalOpen: false,
      files: []
    }

    this.handleInputChange = this.handleInputChange.bind(this)

  }

  hanldeFileChange = async (e) => {
    e.preventDefault()
    await this.setState({
      files: [...this.state.files, ...e.target.files],
    });

  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }


  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addproduct = async () => {

    const formdata = new FormData()

    console.log('length - ', this.state.files.length)

    for (var x = 0; x < this.state.files.length; x++) {
      formdata.append('images', this.state.files[x])
    }

    for (var pair of formdata.entries()) {
      console.log(pair[0] + ', ' + JSON.stringify(pair[1]));
    }

    const { name, description, quantity, price, category, giftPrice } = this.state

    const{ userId }  = this.props.user

    console.log('userId', userId)

    formdata.append('name', name)
    formdata.append('description', description)
    formdata.append('quantity', quantity)
    formdata.append('price', price)
    formdata.append('category', category)
    formdata.append('giftPrice', giftPrice)
    formdata.append('sellerId', userId)
    formdata.append('sellerName', 'selllerName1')

    for (var pair of formdata.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    await this.props.addProduct(formdata)

    await this.setState({ modalOpen: false});

    await alert('Product Added')

  }

  render() {

    return (
      <div>
        <Modal trigger={<Button onClick={ () => this.setState({modalOpen: true})}>Add Product</Button>} centered={false} open={this.state.modalOpen} onClose={this.handleClose} closeIcon>
          <Modal.Header>Add a product</Modal.Header>
          <Modal.Content image>
            <Grid.Column columns={2}>
              <Header>Product Images</Header>
              <Segment style={{ height: '330px' }}>
                <Grid columns={2}>
                  <Grid.Row>
                    {this.state.files.map((item, index) =>
                      <Grid.Column>
                        <Image wrapped size='medium' src={URL.createObjectURL(item)} key={index} alt="Image Preview" style={{ width: "80px", height: "80px", margin: '5px'}} />
                      </Grid.Column>
                    )
                    }
                  </Grid.Row>
                </Grid>
              </Segment>
              <Grid.Row>
                <Input type="file" multiple onChange={this.hanldeFileChange} />
              </Grid.Row>
            </Grid.Column>
            <Modal.Description>
              <Grid columns={1}>
                <Header>Rquired Info</Header>
                <Grid.Row style={{ width: '100%' }}>
                  <Grid.Column>
                    <Form onSubmit={this.addproduct}>
                      <Segment stacked >
                        <Form.TextArea name='name' type="text" label="Product Name" value={this.state.name || ""} onChange={this.handleInputChange} />
                        <Form.TextArea name='description' type="text" label="Product Description" value={this.state.description || ""} onChange={this.handleInputChange} />
                        <Form.Input name='quantity' type="number" label="Quantity" value={this.state.quantity || ''} onChange={this.handleInputChange} />
                        <Form.Input name='price' type="number" label="Standard Price" value={this.state.price || ''} onChange={this.handleInputChange} />
                        <Form.Input name='giftPrice' type="number" label="Gift Price" value={this.state.giftPrice || ''} onChange={this.handleInputChange} />
                        <Form.Field>
                          <label>Category Options</label>
                          <ProductCategoryDropdown />
                        </Form.Field>
                        <Form.Field>
                          <Form.Button color='teal' type='submit'>Add Product </Form.Button>
                        </Form.Field>
                      </Segment>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div >
    );
  }
}


AddProduct.propTypes = {
  addproduct: PropTypes.func.isRequired,
  productList: PropTypes.array.isRequired,
}

const mapStatToProps = state => ({
  productList: state.productList,
  user : state.auth.user
})

export default connect(mapStatToProps, { addProduct })(AddProduct)
