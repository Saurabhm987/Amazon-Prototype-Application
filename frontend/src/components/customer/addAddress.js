// import React, {Component} from 'react'
// import { Button, Form, Grid, Header, Segment} from 'semantic-ui-react'
// import axios from 'axios'
// import JwtDecode from 'jwt-decode'
// const qs = require('querystring')

// const config = {
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// }

// class addAddress extends Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         street1: '',
//         street2: '',
//         city: '',
//         state: '',
//         country: '',
//         pincode: '',
//         phone: ''
//       }
//     }

//     onchange = e => {
//         this.setState({ [e.target.name]: e.target.value })
//         console.log(e.target)
//     }

//     onSubmit = async e => {
//         e.preventDefault()

//         const newAddress = {
//             street1: this.state.street1,
//             street2: this.state.street2,
//             city: this.state.city,
//             state: this.state.state,
//             country: this.state.country,
//             pincode: this.state.pincode,
//             phone: this.state.phone
//         }
        
//         let user = localStorage.getItem("token")
//         let data = JwtDecode(user)
//         let customer_id = data.userId

//         console.log("new address",newAddress)

//         const address = (newAddress) => {
//             return axios
//               .put(`http://localhost:3001/address/addAddress/${customer_id}`, newAddress)
//               .then(response => {
//                 console.log(response.data)
//                 this.props.history.push('/youraddresses')
//                 return response.data
//               })
//               .catch(err => {
//                 console.log(err)
//               })
//           }
//         const customerAddress = await address()
//         console.log(customerAddress);
        
//     }

// render(){
//     return (  
//         <div>
//             <div style={{ marginLeft: '10px', marginRight: '10px' }}>
//             <div style={{ marginTop: "72px" }}>
//             <Header as='h1'>Add a New Address</Header>
//             </div>
//             <br></br>
//         </div>
        
//         <Grid textAlign='center' style={{ height: '100vh' }} horizontalAlign='middle'>
//         <Grid.Column textAlign='left' style={{ maxWidth: 450 }}>
//             <Form size='large'>
//             <Segment stacked>
//                 <Form.Input fluid
//                 name='street1'
//                 value = {this.state.street1}
//                 onChange = {this.onchange}
//                 label="Street1"  placeholder='Street1' />
//                 <Form.Input fluid 
//                 name='street2'
//                 value = {this.state.street2}
//                 onChange = {this.onchange}
//                 label="Street2"  placeholder='Street2' />
//                 <Form.Input fluid
//                 name='city'
//                 value = {this.state.city}
//                 onChange = {this.onchange}
//                 label="City"  placeholder='City' />
//                 <Form.Input
//                 name='state'
//                 value = {this.state.state}
//                 onChange = {this.onchange}
//                 label="State"  placeholder='State' />
//                 <Form.Input
//                 name='country'
//                 value = {this.state.country}
//                 onChange = {this.onchange}
//                 label="Country"  placeholder='Country' />
//                 <Form.Input
//                 name='pincode'
//                 value = {this.state.pincode}
//                 onChange = {this.onchange}
//                 label="Pincode"  placeholder='Pincode' />
//                 <Form.Input
//                 name='phone'
//                 value = {this.state.phone}
//                 onChange = {this.onchange}
//                 label="Phone"  placeholder='Phone' />
//                 <Button fluid
//                 onClick = {this.onSubmit}
//                 color='yellow'  
//                 size='small' 
//                 style={{border:"solid 1px black"}}>
//                     Add Address
//                 </Button>
//             </Segment>
//             </Form>
//         </Grid.Column>
//         </Grid>
//         </div>
//         )
//     }
//   }


//   export default addAddress;