import React, { Component, PropTypes } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import StockForm from './StockForm';

class StockNew extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            stock: Object.assign({}, this.props.stock),
            errors: {}
        };

        this.updateStockState = this.updateStockState.bind(this);
        this.saveStock = this.saveStock.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.stock.id != nextProps.stock.id) {
            this.setState({stock: Object.assign({}. nextProps.stock)});
        }
    }

    updateStockState(event) {
        const field = event.target.name;
        const stock = this.state.stock;
        stock[field] = event.target.value;
        this.setState({
            stock: stock
        });
    }

    saveStock(event) {
        event.preventDefault();
        //console.log(`new value is ${this.state.item}`);
        this.props.createStock(this.state.stock);
        this.context.router.push('/item');
    }

    render() {
        return (
            <StockForm onChange={this.updateStockState} onSave={this.saveStock}
                stock={this.state.stock} errors={this.state.errors} />
        );
    }

}

StockNew.propTypes = {
    stock: PropTypes.object.isRequired,
    createStock: PropTypes.func.isRequired,
}

// Pull in the React Router context so router is available on this.context.router
StockNew.contextTypes = {
    router: PropTypes.object.isRequired
}

function getStockById(stocks, id) {
    const stock = stocks.filter(stock => stock.id == id);
    if (stock) return stock[0];
    return null;
}

function mapStateToProps(state, ownProps) {
    const stockId = ownProps.params.id;

    let stock = {
        id: '', billNo: '', billDate: new Date().getDate(), quantity:0
    };

    if (stockId && state.stocks.length > 0 ) {
        stock = getStockById(state.stocks, stockId);
    }

    return {
        stock: stock
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createStock: bindActionCreators(actions.createStock, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemNew);