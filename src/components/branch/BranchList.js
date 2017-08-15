import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import * as actions from '../../actions';

const cardStyle = {
    display: 'inline-block',
    margin: '-25px 32px 16px 0',
    flexGrow: 1,
    width: 1500
};

const BranchList = ({branches}) => {
    return (
        <Card style={cardStyle} >
            <CardHeader title="Branch " subtitle="Listing" />
                
                <GridList
                    cellHeight={180}>
                    <Subheader>Branch Listing</Subheader>
                    {branches.map(branch => 
                         <GridTile
                            key={branch._id}
                            title={branch.name}
                            subtitle={
                                <span>
                                    <b>{branch.displayName}</b>
                                </span>}
                            titlePosition="top"
                            
                            actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                            cols={2}
                            rows={2}
                        >
                        </GridTile>
                    )}
                </GridList>          
        </Card>
    );
}

export default BranchList;