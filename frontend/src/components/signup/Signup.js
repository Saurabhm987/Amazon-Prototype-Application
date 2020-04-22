import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const SignupForm = () => (
  <Grid textAlign='center' style={{ height: '100vh' }} horizontalAlign='middle'>
    <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
        <Image src='/amazonsignup.png' style={{margin:"0px" , height:"100px", width:"100px"}}/>
      </Header>
      <Form size='large'>
        <Segment stacked>
        <Header size="large">Create an account</Header>
          <Form.Input fluid label="Your Name"  placeholder='Your Name' />
          <Form.Input fluid label="Email"  placeholder='Email' />
          <Form.Input
            fluid
            label="Password"
            placeholder='At least characters '
            type='password'
          />
        <Form.Input
            fluid
            label="Re-enter password"
            placeholder='Password'
            type='password'
          />
          <div style={{marginBottom: "20px"}}>
              By creating an account, you agree to Amazon's Conditions of Use and Privacy Notice.
          </div>
          <Button color='yellow' fluid size='large' style={{border:"solid 1px black"}}>
              Create your Amazon Account
          </Button>
        </Segment>
      </Form>
      <Message>
          Already have an account? <Link to='/'> Sign In</Link>
      </Message>
    </Grid.Column>
  </Grid>
)

export default SignupForm