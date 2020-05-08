import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, withRouter } from 'react-router-dom';
import { Container, GridColumn, GridRow } from "semantic-ui-react";
import './orders.css'
import {
    Button,
    Image,
    Grid,
} from 'semantic-ui-react'

class OrderDetail extends Component {
    constructor() {
        super();
    }
    render() {
        let orderDetailsHeader = "";
        let commonInfo = "";
        let totalAmount = 0.0;
        let individualOrderDetailList = "";

        if (this.props.detailedOrder) {
            //todo calculate the total amount, hardcoded here, add .40 tax everytime

            //todo add link to product page , search Link to={""}
            totalAmount = this.props.detailedOrder.totalAmount;
            orderDetailsHeader =
                <Grid columns={3} id="orderdetailHeader">
                    <Grid.Row style={{ "padding-left": "13px", "padding-bottom": "0px" }}>
                        <h2>Order Details</h2>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8} style={{ "padding-top": "10px" }}><h4>Ordered on {this.props.detailedOrder && this.props.detailedOrder.orderDate && this.props.detailedOrder.orderDate.split('T')[0]} <span>|</span>   Order# {this.props.detailedOrder.orderId}</h4></Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={2}></Grid.Column>
                        <Grid.Column width={4} style={{ "text-align": "end" }}><Button>View or Print invoice</Button></Grid.Column>
                    </Grid.Row>
                </Grid>
            commonInfo = <div className="ui card" style={{ "width": "auto" }}>
                <div className="ui placeholder segment" >
                    <Grid columns={3} style={{ "height": "-webkit-fill-available" }}>
                        {
                            this.props.detailedOrder && this.props.detailedOrder.billingAddress
                                ?
                                <Grid.Column width={5} id="commonInfoCol">
                                    <Grid.Row><h3 style={{ "padding-bottom": "10px" }}>Shipping Address</h3></Grid.Row>
                                    <GridRow id="commonInfoColtext">{this.props.detailedOrder.buyerName}</GridRow>
                                    <GridRow id="commonInfoColtext">{this.props.detailedOrder.billingAddress.street1}</GridRow>
                                    <GridRow id="commonInfoColtext">{this.props.detailedOrder.billingAddress.city},</GridRow>
                                    <GridRow id="commonInfoColtext">{this.props.detailedOrder.billingAddress.state}-{this.props.detailedOrder.billingAddress.pincode}</GridRow>
                                    <GridRow id="commonInfoColtext">{this.props.detailedOrder.billingAddress.country}</GridRow>
                                </Grid.Column>
                                : null
                        }
                        <Grid.Column width={4} id="commonInfoCol">
                            <GridRow><h3 style={{ "padding-bottom": "10px" }}>Payment Method</h3></GridRow>
                            <GridRow id="commonInfoColtext">{this.props.detailedOrder.paymentDetails}</GridRow>
                        </Grid.Column>
                        <Grid.Column width={7} id="commonInfoCol">
                            <GridRow><h3 style={{ "padding-bottom": "10px", "text-align": "center" }}>Order Summary</h3></GridRow>
                            <GridRow id="commonInfoColtext">
                                <Grid columns={2}>
                                    <GridColumn style={{ "text-align": "left" }}>Item(s) Subtotal:</GridColumn>
                                    <GridColumn style={{ "text-align": "end" }}>${parseFloat(this.props.detailedOrder.totalAmount).toFixed(2)}</GridColumn>
                                </Grid>
                            </GridRow>
                            <GridRow id="commonInfoColtext">
                                <Grid columns={2}>
                                    <GridColumn style={{ "text-align": "left" }}>Shipping & Handling:</GridColumn>
                                    <GridColumn style={{ "text-align": "end" }}>$0.00</GridColumn>
                                </Grid>
                            </GridRow>
                            <GridRow id="commonInfoColtext">
                                <Grid columns={2}>
                                    <GridColumn style={{ "text-align": "left" }}>Total before tax:</GridColumn>
                                    <GridColumn style={{ "text-align": "end" }}>${parseFloat(this.props.detailedOrder.totalAmount).toFixed(2)}</GridColumn>
                                </Grid>
                            </GridRow>
                            <GridRow id="commonInfoColtext">
                                <Grid columns={2}>
                                    <GridColumn style={{ "text-align": "left" }}>Estimated tax:</GridColumn>
                                    <GridColumn style={{ "text-align": "end" }}>$0.40</GridColumn>
                                </Grid>
                            </GridRow>
                            <GridRow id="commonInfoColtext">
                                <Grid columns={2}>
                                    <GridColumn style={{ "text-align": "left", "font-weight": "600" }}>Grand Total</GridColumn>
                                    <GridColumn style={{ "text-align": "end", "font-weight": "600" }}>${(parseFloat(this.props.detailedOrder.totalAmount) + parseFloat("0.40")).toFixed(2)}</GridColumn>
                                </Grid>
                            </GridRow>
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
            individualOrderDetailList =
                <div className="ui placeholder segment" >
                    <Grid>
                        <GridRow>
                            {
                                this.props.detailedOrder&&this.props.detailedOrder.status
                                ?
                                <Grid columns={2}>
                                    <GridColumn width={10}><h3 id="orderdetailStatus">{this.props.detailedOrder.status.status}</h3></GridColumn>
                                    <GridColumn width={5}><Button id="orderDetailInfoButton" onClick={() => { this.props.history.push('/orderTracking'); }}>Track package</Button></GridColumn>
                                </Grid>
                                : null
                            }
                        </GridRow>
                        <GridRow>
                            <Grid columns={2}>
                                <GridColumn width={10}>
                                    <Grid columns={2}>
                                        <GridColumn width={4}>
                                            <Image src='https://amazon-prototype-application-bucket.s3-us-west-2.amazonaws.com/6539d21e-0598-49d0-9353-bf82eb1cfddc-semantic-pic.jpg' alt="" style={{ width: '82.5px', height: '82.5px' }} />
                                        </GridColumn>
                                        <GridColumn width={12}>
                                            <GridRow id="orderDetailInfo" style={{ "text-align": "left", "padding-top": "10px", "padding-bottom": "10px" }}><Link to={""}>{this.props.detailedOrder.productName}</Link></GridRow>
                                            <GridRow style={{ "text-align": "left" }}><span style={{ "font-weight": "300" }}>Sold by: {this.props.detailedOrder.sellerName}</span></GridRow>
                                            <GridRow style={{ "text-align": "left" }}><span style={{ "font-weight": "600", "color": "#b30202" }}>${this.props.detailedOrder.totalAmount}</span></GridRow>
                                            <GridRow style={{ "text-align": "left", "margin-bottom": "20px" }}><span style={{ "font-weight": "600" }}>Condition: </span><span>New</span></GridRow>
                                            <GridRow style={{ "text-align": "left" }}><Button id="orderDetailBuyAgainButton">Buy it again</Button></GridRow>
                                        </GridColumn>
                                    </Grid>
                                </GridColumn>
                                <GridColumn width={5}>
                                    <GridRow style={{ "margin-top": "10px", "margin-bottom": "10px" }}><Button id="orderDetailInfoButton">Return or replace items</Button></GridRow>
                                    <GridRow style={{ "margin-top": "10px", "margin-bottom": "10px" }}><Button id="orderDetailInfoButton">Share a gift receipt</Button></GridRow>
                                    <GridRow style={{ "margin-top": "10px", "margin-bottom": "10px" }}><Button id="orderDetailInfoButton">Write a product review</Button></GridRow>
                                    <GridRow style={{ "margin-top": "10px", "margin-bottom": "10px" }}><Button id="orderDetailInfoButton">Archive Order</Button></GridRow>
                                </GridColumn>
                            </Grid>
                        </GridRow>
                    </Grid>
                </div>

        }



        try {
            return (
                <Container style={{ marginTop: '80px' }}>
                    {orderDetailsHeader}
                    {commonInfo}
                    {individualOrderDetailList}
                </Container>

            )
        } catch (e) {
            return (
                <div></div>
            )
        }

    }
}

function mapStateToProps(store) {
    return {
        detailedOrder: store.product.productListPerOrder,
    }
}

export default connect(mapStateToProps)(OrderDetail);