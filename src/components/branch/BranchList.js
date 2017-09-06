import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import { activateBranch, loadBranches, showCreateBranch } from '../../actions';

const cardStyle = {
    display: 'inline-block',
    margin: '-25px 32px 16px 0',
    flexGrow: 1,
    width: 1500
};

const style = {
    card: {
        width: 360,
        maxWidth: 360,
        marginTop: 10,
        marginRight: 13,
        display: 'inline-block',
        verticalAlign:'top',
        //backgroundColor: '#A5D6A7'
    },
    activeBg: {
        backgroundColor: '#4FC3F7'
    },
    deactiveBg: {
        backgroundColor: '#E0E0E0'
    },
    div: {
        width: 1495,
        maxWidth: 1495
    }
};

class BranchList extends Component {
    constructor(props) {
        super(props);
        this.props.loadBranches();
    }

    active(id) {
        const { activateBranch, loadBranches } = this.props;
        activateBranch(id)
            .then(res=> {
                loadBranches();
            });
    }

    render() {
        const {branches} = this.props;
        return (
            <div style={style.div}>
            <h2>Branches</h2>
                {branches.map(branch=>
                    <Card key={branch._id} style={style.card} containerStyle={branch.isActive===1 ? style.activeBg : style.deactiveBg} >
                        <CardHeader style={{width:400}}
                            title={
                                <span style={{fontWeight: 'bold', color: '#3F51B5'}}>
                                    {branch.name} 
                                </span>
                            } 
                            subtitle={
                                <span>
                                    <p>Display Name : {branch.displayName}</p>
                                    <p>Office :{branch.officeNo}</p>
                                    <p>GSM :{branch.mobileNo}</p>
                                    {/* <Toggle label="Activate" 
                                        defaultToggled={branch.isActive===1 ? true : false } 
                                        disabled={branch.isActive===1 ? true : false}
                                        onToggle={(e, input) => console.info(e, input)} /> */}
                                </span>
                            } />
                        <CardActions>
                            <RaisedButton label="Edit" />
                            <RaisedButton label="Export" />
                            {(!branch.isActive || branch.isActive===0) && <RaisedButton label="Activate" primary={true} onClick={this.active.bind(this, branch._id)} />}
                        </CardActions>
                    </Card>
                )}
                <Card key={-1} style={style.card} containerStyle={style.deactiveBg} >
                        <CardHeader style={{width:400}}
                            title={
                                <span style={{fontWeight: 'bold', color: '#3F51B5'}}>
                                    Create New / Import 
                                </span>
                            } 
                            subtitle={
                                <span>
                                    <p>Branch</p>
                                </span>
                            } />
                        <CardActions>
                            <RaisedButton label="New" onClick={()=> this.props.showCreateBranch()} />
                            <RaisedButton label="Import" />
                        </CardActions>
                    </Card>
                </div>
        );
    }
}


// const BranchList = ({branches}) => {
//     return (
//         // <Card style={cardStyle} >
//         //     <CardHeader title="Branch " subtitle="Listing" />
                
//         //         <GridList
//         //             cellHeight={180}>
//         //             <Subheader>Branch Listing</Subheader>
//         //             {branches.map(branch => 
//         //                  <GridTile
//         //                     key={branch._id} 
//         //                     title={branch.name}
//         //                     subtitle={
//         //                         <span>
//         //                             <b>{branch.displayName}</b>
//         //                         </span>}
//         //                     titlePosition="top"
                            
//         //                     actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
//         //                     cols={2}
//         //                     rows={2}
//         //                 >
//         //                 </GridTile>
//         //             )}
//         //         </GridList>          
//         // </Card>

//         <div style={style.div}>
//             <h2>Branches</h2>
//         {branches.map(branch=>
//             <Card key={branch._id} style={style.card} >
//                 <CardHeader style={{width:400}}
//                     title={
//                         <span style={{fontWeight: 'bold', color: '#3F51B5'}}>
//                             {branch.name} 
//                         </span>
//                     } 
//                     subtitle={
//                         <span>
//                             <p>Display Name : {branch.displayName}</p>
//                             <p>Office :{branch.officeNo}</p>
//                             <p>GSM :{branch.mobileNo}</p>
//                             {/* <Toggle label="Activate" 
//                                 defaultToggled={branch.isActive===1 ? true : false } 
//                                 disabled={branch.isActive===1 ? true : false}
//                                 onToggle={(e, input) => console.info(e, input)} /> */}
//                         </span>
//                     } />
//                 <CardActions>
//                     <RaisedButton label="Edit" />
//                     {(!branch.isActive || branch.isActive===0) && <RaisedButton label="Activate" />}
//                 </CardActions>
//             </Card>
//         )}
//         </div>
//     );
// }

function mapStateToProps(state, params) {
    return {
        branches: state.branch.all
    }
}

export default connect( mapStateToProps, { loadBranches, activateBranch, showCreateBranch })(BranchList);