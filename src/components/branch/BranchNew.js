import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

import { materialTextField, materialCheckBox } from '../controls/index';
import { createBranch, loadBranches, closeBranchDialog, successNotification, errorNotification } from '../../actions';


class BranchNew extends Component {

    handleFormSubmit (props) {
        const { createBranch, successNotification, errorNotification, loadBranches } = this.props;
        createBranch(props)
            .then(res=> {
                successNotification('New branch created !');
                loadBranches();
            })
            .catch(err => { 
                errorNotification(err.response.data.name);
            });
    }

    handleClose() {
        //this.props.changeBranch();
        //alert('close');
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
        const {handleSubmit, pristine, reset, submitting, touched, error, warning }  = this.props;

        const dialogActions = [
            <RaisedButton type="submit" label="Create" primary={true} onClick={handleSubmit(this.handleFormSubmit.bind(this))} />,
            <RaisedButton label="Cancel" secondary={true} style={{marginLeft: 10}} onClick={this.handleClose.bind(this)} />
        ];

        return (
            <Dialog title="Create Branch" actions={dialogActions}
                    modal={true} open={this.props.open}
                    autoScrollBodyContent={true} >
                    <form>
                        <div>
                            <Field name="name" component={materialTextField} label="Name" />
                        </div>
                        <div>
                            <Field name="displayName" component={materialTextField} label="Display Name"  />
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
                        {/* <div>
                            <RaisedButton type="submit" label="Create" primary={true} />
                        </div> */}
                    </form>
            </Dialog>
            
        );
    }
}

function mapStateToProps(state) {
    return { 
        errorMessage: state.error,
        open: state.branch.isCreateLoad 
    };
}

function validateForm(values) {
    const errors = {};
    if (!values.name) {
        errors.name = 'Name is required';
    }
    if (!values.displayName) {
        errors.displayName = 'Display Name required';
    }
    return errors;
}

// export default reduxForm({
//     form: 'branch',
//     fields: ['name', 'displayName', 'location', 'officeNo', 'mobileNo', 'status']
// }, mapStateToProps, actions)(BranchNew);

BranchNew = reduxForm({
    form: 'branch',
    validate: validateForm
})(BranchNew);

BranchNew = connect(
    mapStateToProps, 
    { createBranch, loadBranches, closeBranchDialog, successNotification, errorNotification }
)(BranchNew);


export default BranchNew;
