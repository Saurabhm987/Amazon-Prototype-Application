import React from 'react'
import { Message } from 'semantic-ui-react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const AlertMessage = ({ alerts }) => 
    alerts !== null && alerts.length > 0 && alerts.map(alert => {
        const type = alert.alertType;
        return (
            <Message {...type} key={alert.id} >
                <Message.Header> {alert.msg} </Message.Header>
            </Message>
            );
    });

AlertMessage.propTypes = {
    alerts: PropTypes.array.isRequired
}

// alerts is the redux state array state.alert
const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps)(AlertMessage);
