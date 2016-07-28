import React from 'react';

import {Card, List} from 'material-ui';

import Channel from './Channel.jsx';

class ChannelList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            channels: [
                `Dogs`,
                'Cats'
            ]
        };

    }
    
    render() {
        var channelNodes = this.state.channels.map((channel)=> {
           return (
               <Channel channel={channel} />
           ); 
        });
        
        return (
            <Card style={{ flexGrow:1 }}>
                <List>
                    {channelNodes}
                </List>
            </Card>
        );
    }
}

export default ChannelList;