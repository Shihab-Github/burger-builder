import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';

class Layout extends Component {
    render() {
        return (
            <Aux>
                <Toolbar isAuthenticated={this.props.isAuthenticated} />
                <main className="container">
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token ? true : false 
    };
};


export default connect(mapStateToProps)(Layout);