import React from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Input,
  Menu,
  Segment,
  Placeholder,
  GridColumn
} from 'semantic-ui-react';

import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import './header.css'


const FixedMenuLayout = (props) => {
  if (!props.user) {
    return <Redirect to = '/' />
  }
  return (
  <div>
    <Menu id="headerMenu" fixed='top' inverted>
    
        <Menu.Item as='a' header>
            <Image size='mini' src='/amazon-prime.jpg' style={{padding:"none"}} />
        </Menu.Item>
        
      <Grid.Row columns={1} style={{width:"100%"}}>
        <Grid.Column>
        <Menu.Item as='a' >
        <Input fluid icon='search' placeholder='Search...' />
            {/* <Input action='Search' placeholder='Search...' /> */}
        </Menu.Item>
        </Grid.Column>
      </Grid.Row>
        
        <Dropdown item simple text='Hello Your Name'>
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className='dropdown icon' />
              <span className='text'>Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item onClick={(e) => props.logout()}>Sign Out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Menu.Item as='a' header>
            Return &  Orders
        </Menu.Item>
        <Menu.Item as='a' header>
            Cart    
        </Menu.Item>
    </Menu>

    <Container style={{ marginTop: '7em' }}>
      <Header as='h1'>Amazon Prototpe Application development</Header>
      <p>This is a basic fixed menu template using fixed size containers.</p>
      <p>
        A text container is used for the main container, which is useful for single column layouts.
      </p>

      <Grid columns={3} stackable>
        <Grid.Column>
            <Segment>
                <Placeholder>
                    <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='large' />
                        <Placeholder.Line length='large' />
                        <Placeholder.Line length='large' />
                        <Placeholder.Line length='large' />
                        <Placeholder.Line length='large' />
                        <Placeholder.Line length='large' />
                        <Placeholder.Line length='large' />
                        <Placeholder.Line length='large' />
                        <Placeholder.Line length='large' />
                        <Placeholder.Line length='large' />

                    </Placeholder.Paragraph>
                </Placeholder>
            </Segment>
        </Grid.Column>

    <Grid.Column>
      <Segment raised>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
          <Placeholder.Line length='large' />
            <Placeholder.Line length='large' />
            <Placeholder.Line length='large' />
            <Placeholder.Line length='large' />
            <Placeholder.Line length='large' />
            <Placeholder.Line length='large' />
            <Placeholder.Line length='large' />
            <Placeholder.Line length='large' />
            <Placeholder.Line length='large' />
            <Placeholder.Line length='large' />

          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    </Grid.Column>

    <Grid.Column>
      <Segment raised>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
          <Placeholder.Line length='large' />
        <Placeholder.Line length='large' />
        <Placeholder.Line length='large' />
        <Placeholder.Line length='large' />
        <Placeholder.Line length='large' />
        <Placeholder.Line length='large' />
        <Placeholder.Line length='large' />
        <Placeholder.Line length='large' />
        <Placeholder.Line length='large' />
        <Placeholder.Line length='large' />

          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>
    </Grid.Column>
  </Grid>

  <Grid columns={1} stackable>
        <Grid.Column>
            <Segment>
            <Placeholder fluid>
                <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                </Placeholder.Paragraph>
            </Placeholder>
            </Segment>
        </Grid.Column>
    </Grid>

    <Grid columns={1} stackable>
        <Grid.Column>
            <Segment>
            <Placeholder fluid>
                <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                </Placeholder.Paragraph>
            </Placeholder>
            </Segment>
        </Grid.Column>
    </Grid>
    </Container>

    <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '2em 0em ' }}>
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
)

}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, {
  logout
})(FixedMenuLayout);