import React, { Component } from 'react';
import { connect } from 'react-redux';
import BlockUi from 'react-block-ui';
import Order from '../../components/Order/Order';
import * as exportedActions from '../../store/actions/exportedActions'; 

class Orders extends Component {
    state = {
        error: null
    };

    componentDidMount(){
        this.props.fetchOrders(this.props.token);
    };

    render() {
        const ordersOutput = [];
        for (let i = 0; i < this.props.orders.length; i++) {
            const element = <Order key={i+5} ingridients={this.props.orders[i]} />
            ordersOutput.push(element);
        }
        return (
            <div>
                <BlockUi blocking={this.props.blocking}>
                    {ordersOutput}
                </BlockUi>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        blocking: state.order.blocking,
        token: localStorage.getItem('token')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (token) => { 
            return dispatch(exportedActions.fetchOrders(token));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);