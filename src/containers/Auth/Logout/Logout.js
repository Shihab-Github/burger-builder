import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as exportedActions from '../../../store/actions/exportedActions';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    };

    render() {
        return <Redirect to="/" />;
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => {
            dispatch(exportedActions.logOut());
        }
    }
};

export default connect(null, mapDispatchToProps)(Logout);