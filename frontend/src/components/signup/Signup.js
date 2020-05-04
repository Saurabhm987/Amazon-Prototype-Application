import React, {useState} from 'react'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment, Radio } from 'semantic-ui-react'
import AlertMessage from '../common/AlertMessage';

import { USER_ADMIN, USER_CUSTOMER, USER_SELLER } from '../controller/config';

import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { registerUser } from '../../actions/auth';
import PropTypes from 'prop-types';


const Signup = (props) => {
  const [userType, setUserType] = useState(USER_CUSTOMER);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [rePass, setRePass] = useState({ pass: '', error: false });

  const handleSubmit = (e) => {
    if ( !rePass.error ) {
    console.log(formData);
    console.log('send for user: ', userType);
    props.registerUser(formData, userType);
    }
  }

  const handleInput = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePassCheck = (e) => {
    if (e.target.value !== formData.password) {
      setRePass({ pass: e.target.value, error: true });
    } else {
      setRePass({ pass: e.target.value, error: false });
    }
  }
  
  if (props.user) {
    const { userType } = props.user;
    switch (userType) {
        case USER_CUSTOMER:
            return <Redirect to='/dashboard' />;
            break;
        case USER_SELLER:
            return <Redirect to='/sellerCentral' />;
            break;
        case USER_ADMIN:
            return <Redirect to='' />;
            break;
        default:
            console.log(`Error: redirect for userType: ${userType} not defined`);
    }
  }

  return (  
  <Grid textAlign='center' style={{ height: '100vh' }} horizontalAlign='middle'>
    <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/amazonsignup.png' style={{margin:"0px" , height:"100px", width:"100px"}}/>
      </Header>
      <Form size='large'>
        <Segment stacked>
        <Header size="large">Create an account</Header>
        <AlertMessage />
        <Form.Field>
          <Radio
            label='Customer Account'
            name='userType'
            value={USER_CUSTOMER}
            checked={userType === USER_CUSTOMER}
            onChange={e => setUserType(USER_CUSTOMER)}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Seller Account'
            name='userType'
            value={USER_SELLER}
            checked={userType === USER_SELLER}
            onChange={e => setUserType(USER_SELLER)}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Admin Account'
            name='userType'
            value={USER_ADMIN}
            checked={userType === USER_ADMIN}
            onChange={e => setUserType(USER_ADMIN)}
          />
        </Form.Field>
          <Form.Input fluid
          name='name'
          value = {formData.name}
          onChange = {handleInput}
          label="Your Name"  placeholder='Your Name' />
          <Form.Input fluid 
          name='email'
          value = {formData.email}
          onChange = {handleInput}
          label="Email"  placeholder='Email' />
          <Form.Input fluid
          name='password'
          value = {formData.password}
          onChange = {handleInput}
          label="Password"
          placeholder='At least characters'
          type='password'
          />
        <Form.Input
            error = {rePass.error}
            onChange = { handlePassCheck }
            fluid
            label="Re-enter password"
            placeholder='Password'
            type='password'
          />
          <div style={{marginBottom: "20px"}}>
              By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
          </div>
          <Button fluid
          onClick = {handleSubmit}
          color='yellow'  
          size='large' 
          style={{border:"solid 1px black"}}>
              Create your Amazon Account
          </Button>
        </Segment>
      </Form>
      <Message>
          Already have an account? <Link to='/login'> Sign In</Link>
      </Message>
    </Grid.Column>
  </Grid>
  )
}

Signup.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps, {
  setAlert,
  registerUser
})(Signup);