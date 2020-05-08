import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { addProduct } from '../../actions/product'
import { connect } from 'react-redux';
import { productCategories } from '../../actions/product'

import {
  Button,
  Header,
  Image,
  Modal,
  Input,
  Grid,
  Segment,
  Form,
  Dropdown,
  Popup
} from 'semantic-ui-react'

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productname: '',
      description: '',
      test: '',
      quantity: '',
      price: '',
      modalOpen: false,
      files: [],
      data: [{ key: '', text: '', value: '' }],
      selectedCategory: '',
      error: true,
      nerr: false,
      derr: false,
      qerr: false,
      perr: false,
      drerr: false,
    }

    const style = {
      borderRadius: 0,
      opacity: 0.7,
      padding: '2em',
    }

    this.handleInputChange = this.handleInputChange.bind(this)

  }

  componentDidMount = async () => {

    await this.props.productCategories()
    await this.createOptions()

    // if(this.props.open){
    //   this.setState({modalOpen: true});
    // }

  }

  createOptions = async () => {

    await this.setState({
      data: this.props.categoryList.map(item => { return { key: item._id, text: item.name, value: item.name } })
    });

  }

  hanldeFileChange = async (e) => {
    e.preventDefault()

    if (this.state.files.length < 5) {
      await this.setState({
        files: [...this.state.files, ...e.target.files],
      });
    } else {
      // this.setState({ error: true });
      alert('Can not add more than 5 images')
    }
  }

  categoryHandler = (e, { value }) => {
    this.setState({ selectedCategory: value });
  }

  handleClose = () => {
    this.setState({ modalOpen: false })
  }

  handleInputChange = async (e) => {

    const { name, value } = e.target

    if (name === 'productname') {

      if (value.length < 2) {
        await this.setState({ error: true, nerr: true });
      } else {
        await this.setState({ error: false, nerr: false });
      }
    } else if (name === 'description') {

      if (value.length < 2) {
        await this.setState({ error: true, derr: true });
      } else {
        await this.setState({ error: false, derr: false });
      }
    } else if (name === 'quantity') {

      if (value.length < 2) {
        await this.setState({ error: true, qerr: true });
      } else {
        await this.setState({ error: false, qerr: false });
      }
  }

       await this.setState({ [name]: value })

}



  addproduct = async () => {

    const formdata = new FormData()

    for (var x = 0; x < this.state.files.length; x++) {
      formdata.append('images', this.state.files[x])
    }

    const { productname, description, quantity, price, selectedCategory, error } = this.state

    const { userId, name } = this.props.user

    formdata.append('name', productname)
    formdata.append('description', description)
    formdata.append('quantity', quantity)
    formdata.append('price', price)
    formdata.append('category', selectedCategory)
    formdata.append('sellerId', userId)
    formdata.append('sellerName', name)

    console.log('selecte cat - ', selectedCategory)

    if (!error && selectedCategory !== undefined && selectedCategory !=='' && selectedCategory !== null ) {
      await this.props.addProduct(formdata)
      await this.setState({ modalOpen: false });
      await alert('Product Added')
    }else{
      alert('Please enter all detials!')
    }
  }

  render() {

    return (
      <div>
        <Modal trigger={<Button onClick={() => this.setState({ modalOpen: true })}>Add Product</Button>} centered={false} open={this.state.modalOpen} onClose={this.handleClose} closeIcon>
          <Modal.Header>Add a product</Modal.Header>
          <Modal.Content image>
            <Grid.Column columns={2}>
              <Header>Product Images</Header>
              <Segment style={{ height: '330px' }}>
                <Grid columns={2}>
                  <Grid.Row>
                    {
                      this.state.files.map((item, index) =>
                        <Grid.Column>
                          <Image wrapped size='medium' src={URL.createObjectURL(item)} key={index} alt="Image Preview" style={{ width: "80px", height: "80px", margin: '5px' }} />
                        </Grid.Column>
                      )
                    }
                  </Grid.Row>
                </Grid>
              </Segment>
              <Grid.Row>
                <Input type="file" multiple onChange={this.hanldeFileChange} />
              </Grid.Row>
              <Grid.Row>
                {/* <Popup
                  trigger={true}
                  content='Popup with a custom style prop'
                  style={this.style}
                  inverted
                /> */}
              </Grid.Row>
            </Grid.Column>
            <Modal.Description>
              <Grid columns={1}>
                <Header>Rquired Info</Header>
                <Grid.Row style={{ width: '100%' }}>
                  <Grid.Column>
                    <Form onSubmit={this.addproduct}>
                      <Segment stacked >
                        <Form.TextArea name='productname' error={this.state.nerr} type="text" label="Product Name" value={this.state.productname || ""} onChange={this.handleInputChange} />
                        <Form.TextArea name='description' error={this.state.derr} type="text" label="Product Description" value={this.state.description || ""} onChange={this.handleInputChange} />
                        <Form.Input name='quantity' error={this.state.qerr} type="number" label="Quantity" value={this.state.quantity || ''} onChange={this.handleInputChange} />
                        <Form.Input name='price' error={this.state.perr} type="number" label="Standard Price" value={this.state.price || ''} onChange={this.handleInputChange} />
                        <Form.Field>
                          <label>Category Options</label>
                          {
                            this.props.categoryList
                              ? <Dropdown
                                selection
                                search
                                error={this.state.cerr}
                                options={this.state.data}
                                value={this.state.data.value}
                                onChange={this.categoryHandler}
                                placeholder='choose category'
                              />
                              : null
                          }

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
  productCategories: PropTypes.array.isRequired,
}

const mapStatToProps = state => ({
  productList: state.product.productList,
  user: state.auth.user,
  categoryList: state.product.categoryList
})

export default connect(mapStatToProps, { addProduct, productCategories })(AddProduct)
