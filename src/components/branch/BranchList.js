import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { Icons, Colors } from '../theme';

import { activateBranch, loadBranches, showCreateBranch } from '../../actions';

const cardStyle = {
    display: 'flex',
    margin: '-25px 32px 16px 0',
    flex: 1,
    width: '100%'
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
        backgroundColor: Colors.enabledColor
    },
    deactiveBg: {
        backgroundColor: Colors.disabledColor
    },
    div: {
        width: '100%',
        margin: '0 auto'
        //maxWidth: 1495
    }
};

class BranchList extends Component {
    constructor(props) {
        super(props);
        this.props.loadBranches();
    }

    active(branch) {
        const { activateBranch } = this.props;
        activateBranch(branch);
    }

    render() {
        const { branches, current } = this.props;
        return (
            <div style={style.div}>
                <h2>Branches</h2>
                {branches.map(branch=>
                    <Card key={branch._id} style={style.card} containerStyle={branch._id === current.branchId ? style.activeBg : style.deactiveBg } >
                        <CardHeader style={{width:400}}
                            title={
                                <span style={{fontWeight: 'bold', color: '#3F51B5'}}>
                                    Display Name : {branch.displayName}
                                </span>
                            } 
                            subtitle={
                                <span>
                                    <p>Name : {branch.name}</p>
                                    <p>Location : {branch.location}</p>
                                    <p>Office :{branch.officeNo}</p>
                                    <p>GSM :{branch.mobileNo}</p>
                                </span>
                            } />
                        <CardActions>
                            {branch._id != current.branchId && 
                                <IconButton tooltip='Activate Branch' onClick={this.active.bind(this, branch)}>
                                    <Icons.Done color={Colors.primaryColor} />
                                </IconButton>}
                            <IconButton tooltip='Edit Branch'><Icons.Edit color={Colors.accentColor1} /></IconButton>
                            <IconButton tooltip='Export Branch'><Icons.Redo /></IconButton>
                            <IconButton tooltip='Delete Branch'><Icons.Delete color='red' /></IconButton>
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
                        <IconButton onClick={()=> this.props.showCreateBranch()} tooltip='Add Branch'><Icons.Add /></IconButton>
                        <IconButton tooltip='Import Branch'><Icons.Undo /></IconButton>
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
        branches: state.branch.all,
        current: state.branch.current
    }
}

export default connect( mapStateToProps, { loadBranches, activateBranch, showCreateBranch })(BranchList);