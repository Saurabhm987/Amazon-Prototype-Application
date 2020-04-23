import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react'


class LoginForm extends Component {
    constructor(props){
        super(props)
            this.state ={

            }

            this.clickHandler = this.clickHandler.bind(this)
            this.loginHandler = this.loginHandler.bind(this)
        }

    loginHandler = () => {
        this.props.history.push('/dashboard')
    }
        
    clickHandler = () => {
        this.props.history.push('/signup')
    }
        

    render() {
        return (
            <div>
                     <Grid textAlign='center' style={{ height: '100vh' }} horizontalAlign='middle'>
                        <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
                            <Header as='h2' color='teal' textAlign='center'>
                                <Image src='/amazonsignup.png' style={{margin:"0px" , height:"100px", width:"100px"}}/>
                            </Header>
                            <Form size='large'>
                                <Segment stacked>
                                <Header size="large">Sign-in</Header>
                                <Form.Input fluid label="Email (phone for mobile accounts)"  placeholder='Your Name' />
                                <Form.Input fluid label="Password"  placeholder='Password' />
                                <Button color='yellow'  fluid size='large' style={{border:"solid 1px black", color: 'black'}} onClick={this.loginHandler}>
                                        Continue
                                </Button>
                                <div style={{marginTop:"20px"}}>
                                        By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
                                </div>
                                </Segment>
                            </Form>
                            <div style={{textAlign: "center", margin:"15px"}}>
                                ---------------New to Account-----------------
                            </div>
                            <Button fluid size='large' style={{border:"solid 1px black", textColor:"black"}} onClick={this.clickHandler} >
                                    Create your Amazon Account
                            </Button>
                        </Grid.Column>
                    </Grid>
            </div>
        );
    }
}

export default LoginForm