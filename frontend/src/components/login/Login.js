import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import AlertMessage from '../common/AlertMessage';

import { USER_ADMIN, USER_CUSTOMER, USER_SELLER } from '../controller/config';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { loginUser } from '../../actions/auth';

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }

        this.clickHandler = this.clickHandler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
    }

    loginHandler = (e) => {
        const { email, password } = this.state;
        this.props.loginUser(email, password);
        // this.props.history.push('/dashboard')
    }
        
    clickHandler = () => {
        this.props.history.push('/signup')
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }
        

    render() {
        if (this.props.user) {
            const { userType } = this.props.user;
            switch (userType) {
                case USER_CUSTOMER:
                    return <Redirect to='/dashboard' />;
                    break;
                case USER_SELLER:
                    return <Redirect to='/sellerCentral' />;
                    break;
                case USER_ADMIN:
                    return <Redirect to='/admindashboard' />;
                    break;
                default:
                    console.log(`Error: redirect for userType: ${userType} not defined`);
            }
        }

        return (
            <div>
                <Grid textAlign='center' style={{ height: '100vh' }} horizontalAlign='middle'>
                <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/amazonsignup.png' style={{margin:"0px" , height:"100px", width:"100px"}}/>
                    </Header>

                    <AlertMessage />

                    <Form size='large'>
                        <Segment stacked>
                        <Header size="large">Sign-in</Header>
                        <Form.Input fluid
                        name = 'email'
                        value = {this.state.email}
                        onChange = {this.handleInput}
                        label="Email (phone for mobile accounts)"  
                        placeholder='Your Name' />
                        <Form.Input fluid 
                        name = 'password'
                        type = 'password'
                        value = {this.state.password}
                        onChange = {this.handleInput}
                        label="Password"  
                        placeholder='Password' />
                        <Button fluid 
                        onClick={this.loginHandler}
                        color='yellow'   
                        size='large' 
                        style={{border:"solid 1px black", textColor:"black"}} 
                        >
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

LoginForm.propTypes = {
    user: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps, {
    loginUser,
    setAlert
})(LoginForm);