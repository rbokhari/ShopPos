import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { materialTextField, materialCheckBox } from '../controls/index';
import { createBranch } from '../../actions';

class BranchNew extends Component {

    handleFormSubmit ( {name, displayName, location, officeNo, mobileNo, status} ) {
        this.props.createBranch({name, displayName, location, officeNo, mobileNo, status});
    }

    handleClose() {
        //this.props.changeBranch();
        this.props.closeBranchDialog();
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>
                    <strong>
                        Oops ! 
                    </strong> 
                    {this.props.errorMessage}
                </div>
            );
        }
    }

    

    render() {
        const dialogActions = [
            <RaisedButton label="Cancel" secondary={true} onTouchTap={this.handleClose.bind(this)} />,
            <RaisedButton type="submit" label="Create" primary={true} />
        ];

        const {handleSubmit, pristine, reset, submitting, touched, error, warning }  = this.props;

        return (
            
            <Dialog
                    title="Create Branch" actions={dialogActions}
                    modal={true} open={this.props.open}
                    autoScrollBodyContent={true} >
                    
                    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                        <div>
                            <Field name="name" component={materialTextField} label="Name" autoFocus />
                        </div>
                        <div>
                            <Field name="displayName" component={materialTextField} label="Display Name" />
                        </div>
                        <div>
                            <Field name="location" component={materialTextField} label="Location" />
                        </div>
                        <div>
                            <Field name="officeNo" component={materialTextField} label="Office No" />
                        </div>
                        <div>
                            <Field name="mobileNo" component={materialTextField} label="Mobile No" />
                        </div>
                        <div>
                            <Field name="status" component={materialCheckBox} label="Status"  />
                        </div>
                        <div>
                            <RaisedButton type="submit" label="Create" primary={true} />
                        </div>
                    </form>
            </Dialog>
            
        );
    }
}

function mapStateToProps(state) {
    return { 
        errorMessage: state.auth.error,
        open: state.branch.isCreateLoad 
    };
}

// export default reduxForm({
//     form: 'branch',
//     fields: ['name', 'displayName', 'location', 'officeNo', 'mobileNo', 'status']
// }, mapStateToProps, actions)(BranchNew);

BranchNew = reduxForm({
    form: 'branch',
})(BranchNew);

BranchNew = connect(
    mapStateToProps, 
    { createBranch: createBranch }
)(BranchNew);


export default BranchNew;
