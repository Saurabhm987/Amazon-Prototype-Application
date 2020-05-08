import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import './header.css'
import { logout } from '../../actions/auth'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { fetchProduct, productCategories } from '../../actions/product';
import { connect } from 'react-redux';

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react';
import JwtDecode from 'jwt-decode';


class AppHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      searchText: '',
      data: [{ key: '', text: '', value: '' }],
      searchCategory: '',
      user: '',
      filterText: '',
    }
  }

  componentDidMount = async () => {

    let token = localStorage.getItem('token')

    if (token === null) {
      this.props.history.push('/login')
    }

    let user = JwtDecode(token)
    this.setState({ user: user });

    await this.props.productCategories()
    await this.createOptions()
  }

  categoryHandler = async (e, { value }) => {
    console.log('calling cate hand --', value)
    await this.setState({ searchCategory: value });
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


  onLogout = async () => {
    await this.props.logout()
    await this.props.history.push('/login')
  }

  onChangeHandler = async (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
  }

  handlelow = async (e) => {
    console.log('hitting')
    await this.props.history.push('/dashboard')
    await this.props.fetchProduct('', '', '', 'PriceLowtoHigh')

  }

  handlehigh = async (e) => {

    await this.props.history.push('/dashboard')
    await this.props.fetchProduct('', '', '', 'PriceHightoLow')

  }

  onSearch = async (e) => {

    const { searchText, searchCategory } = this.state

    await this.props.fetchProduct(searchText, searchCategory)

    await this.props.history.push('/dashboard')

  }

  onProfileClick = async () => {

    const { userId, userType } = this.props.user

    if (userType === 'customer') {

      this.props.history.push(`/customerprofile/?id=${userId}`)

    } else if (userType === 'seller') {

      this.props.history.push(`/sellerprofile/?id=${userId}`)

    } else if (userType === 'admin') {

      this.props.history.push(`/adminprofile/id?=${userId}`)

    }
  }

  render() {

    const user = localStorage.getItem('token')

    if (user === null) {
      return <Redirect to='/login' />
    }

    return (

      <div>
        <Menu id="headerMenu" fixed='top' inverted>
          <Menu.Item as='a' header>
            <i className="align justify icon"></i>
            {
              this.props.categoryList
                ? <Dropdown
                  selection
                  search
                  options={this.state.data}
                  value={this.state.data.value}
                  onChange={this.categoryHandler}
                  placeholder='choose category'
                />
                : null
            }
          </Menu.Item>

          <Menu.Item as='a' header>
            <Link to={'/dashboard'}><Image size='tiny' src='/amazon-logo.png' style={{ padding: "none" }} /></Link>
          </Menu.Item>

          <Grid.Row columns={1} style={{ width: "100%",marginTop:'7px' }}>
            <Grid.Column>
              <Menu.Item as='a'>
                <div className="ui action input">
                  <input type="text" placeholder="Search..." name="searchText" onChange={this.onChangeHandler} />
                  <button className="ui icon button" onClick={this.onSearch} style={{ backgroundColor: '#febd69' }}><i aria-hidden="true" className="search icon"></i></button>
                </div>
              </Menu.Item>
            </Grid.Column>
          </Grid.Row>

          {/* <Grid.Row>
            <Grid.Column style={{marginTop:'13px'}}>
              <Menu.Item as='a'>
                Sort
              </Menu.Item>
            </Grid.Column>
          </Grid.Row> */}
          <Dropdown item simple text='Sort by'>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.handlelow} data-cat='PriceLowtoHigh'>
                Price: Low to High
              </Dropdown.Item>
              <Dropdown.Item onClick={this.handlehigh} data-cat1='PriceHightoLow'>
                Price : High to low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown item simple text={this.state.user.name}>
            <Dropdown.Menu>
              <Dropdown.Item onClick={this.onProfileClick}>Profile</Dropdown.Item>
              {
                this.props.user && this.props.user.userType === 'seller'
                  ?
                  <Dropdown.Item><Link to='/sellercentral' style={{ color: 'black' }}>Sellercentral</Link></Dropdown.Item>
                  : null
              }
              <Dropdown.Divider />
              {
                this.state.user.userType === 'customer'
                  ? (
                    <Dropdown.Item>
                      <i className='dropdown icon' />
                      <span className='text'>Account</span>
                      <Dropdown.Menu>
                        <Dropdown.Item as='a' header>
                          <Link style={{ color: 'black' }} to={"/customer/address"}>
                            Your Addresses
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item as='a' header>
                          <Link style={{ color: 'black' }} to={"/customer/card"}>
                            Your Payments
                          </Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown.Item>
                  )
                  :
                  null
              }
              <Dropdown.Item onClick={this.onLogout}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {
            this.state.user.userType === 'customer'
              ?
              <Menu.Item as='a' header>
                <Link to='/customerorders'>
                  Return &  Orders
                </Link>
              </Menu.Item>
              : null
          }

          {
            this.state.user.userType === 'customer'
              ?
              <Menu.Item as='a' header>
                <Link to={"/cart"}>
                  Cart
                    </Link>
              </Menu.Item>
              : null
          }

        </Menu>

        <Segment inverted vertical style={{ margin: '5em 0em 0em 0em', padding: '2em 0em ' }}>
          <Container textAlign='center'>
            <Grid divided inverted stackable>
              <Grid.Column width={4}>
                <Header inverted as='h4' content='Get to Know Us' />
                <List link inverted>
                  <List.Item as='a'>Careers</List.Item>
                  <List.Item as='a'>Blog</List.Item>
                  <List.Item as='a'>Press Center</List.Item>
                  <List.Item as='a'>Investor Relations</List.Item>
                  <List.Item as='a'>Amazon Devices</List.Item>
                  <List.Item as='a'>Amazon Devices</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header inverted as='h4' content='Make Money with Us' />
                <List link inverted>
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header inverted as='h4' content='Amazon Payment Products' />
                <List link inverted>
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={4}>
                <Header inverted as='h4' content='Let Us Help You' />
                <List link inverted>
                  <List.Item as='a'>Link One</List.Item>
                  <List.Item as='a'>Link Two</List.Item>
                  <List.Item as='a'>Link Three</List.Item>
                  <List.Item as='a'>Link Four</List.Item>
                </List>
              </Grid.Column>
            </Grid>

            <Divider inverted section />
            <Image centered size='mini' src='/logo.png' />
            <List horizontal inverted divided link size='small'>
              <List.Item as='a' href='#'>
                Site Map
              </List.Item>
              <List.Item as='a' href='#'>
                Contact Us
              </List.Item>
              <List.Item as='a' href='#'>
                Terms and Conditions
              </List.Item>
              <List.Item as='a' href='#'>
                Privacy Policy
              </List.Item>
            </List>
          </Container>
        </Segment>

      </div>
    );
  }
}


AppHeader.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  productCategories: PropTypes.func.isRequired,
  categoryList: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  categoryList: state.product.categoryList,
})

export default connect(mapStateToProps, { logout, fetchProduct, productCategories })(AppHeader);