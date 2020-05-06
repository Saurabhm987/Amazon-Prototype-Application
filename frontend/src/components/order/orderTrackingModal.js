import React, { Component } from 'react';
import {connect} from "react-redux";
import {Grid,GridColumn, GridRow} from "semantic-ui-react";


class OrderTrackingModal extends Component {
    constructor() {
        super();
    }

    render() {
        let track=this.props.monthlyDetailedBillingArray.statusHistory.map(status=>{
            return(
                    <GridRow style={{"text-align":"left"}}>
                        <Grid columns={4}>
                            <GridColumn width={2} style={{"font-weight":"600"}}>{status.timestamps.split('.')[0].replace('T',', ')}</GridColumn>
                            <GridColumn width={1}><span>|</span></GridColumn>
                            <GridColumn width={3}>
                                <GridRow style={{"font-weight":"600"}}>{status.status}</GridRow>
                                <GridRow>{status.location}</GridRow>
                            </GridColumn>
                            <GridColumn width={10}></GridColumn>
                        </Grid>
                    </GridRow>
            )
        })
        return (
            <div className="ui placeholder segment" >
                    <div style={{"text-align":"left","margin-bottom":"20px"}}>
                        <GridRow><h3 style={{"font-size":"x-large"}}>Shipped with USPS</h3></GridRow>
                        <GridRow><h3>Tracking ID: {this.props.monthlyDetailedBillingArray.status._id}</h3></GridRow>
                    </div>

                    <div>
                        {track}
                    </div>

            </div>
        );
    }
}


function mapStateToProps(store){
    return{
        monthlyDetailedBillingArray:store.product.productListPerOrder,
    }
}

export default connect(mapStateToProps)(OrderTrackingModal);