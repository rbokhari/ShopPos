import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import { connect } from 'react-redux';
import { loadSuppliers } from '../../actions';
import SupplierList from './SupplierList';

const cardHeight = 400;

const cardStyle = {
  display: 'inline-block',
  margin: '-25px 32px 16px 0',
  flexGrow: 1
};

const fabStyle = {
    marginTop: 10,
    marginLeft: '90%'
};

class SupplierPage extends Component {

    constructor(props, context) {
        super(props, context);

        this.props.loadSuppliers();
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.branch.branchId !== localStorage.getItem('officeId')) {
        //     this.props.loadCategories();
        // }
    }

    render() {
        const {suppliers} = this.props;

        return (
            <div>
                <FloatingActionButton style={fabStyle} secondary={true} linkButton containerElement={<Link to="/supplier/new" />}>
                    <ContentAdd />
                </FloatingActionButton>
                <SupplierList suppliers={suppliers} />
            </div>
        );
    }

}

SupplierPage.propTypes = {
    suppliers: PropTypes.array.isRequired
}

function mapStateToProps(state, ownProps) {
    return { 
        suppliers: state.suppliers,
        user: state.auth.user ,
        branch: state.branch.current
    };
}

export default connect(mapStateToProps, {loadSuppliers: loadSuppliers})(SupplierPage);