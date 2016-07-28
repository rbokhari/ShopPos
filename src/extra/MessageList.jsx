import React from 'react';
import Firebase from 'firebase';
import _ from 'lodash';

import {Card, List} from 'material-ui';

import Message from './Message.jsx';

class MessageList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            messages: []
        };
        
        this.firebaseRef = new Firebase('https://react-bundle.firebaseio.com/messages');
        this.firebaseRef.on("child_added", (msg)=> {
            if (this.state.messages[msg.key()]) {
                return;
            }
            
            let msgVal = msg.val();
            msgVal.key = msg.key();
            this.state.messages[msgVal.key] = msgVal;
            this.setState({
                messages: this.state.messages
            });
            /*var messagesVal = dataSnapshot.val();
            var messages = _(messagesVal)
                    .keys()
                    .map((messageKey) => {
                        var cloned = _.clone(messagesVal[messageKey]);
                        cloned.key = messageKey;
                        return cloned;
                    })
                    .value();
            */
            // this.setState({
            //     messages: messages
            // });
        });
        
        this.firebaseRef.on("child_removed", (msg) => {
            var key = msg.key();
            delete this.state.messages[key];
            this.setState({messages: this.state.messages});
        });
    }
    
    render() {
        var messageNodes = _.values(this.state.messages).map((message)=> {
           return (
               <Message message={message.message} />
           ); 
        });
        
        return (
            <Card style={{ flexGrow:2, marginLeft: 30 }}>
                <List>
                    {messageNodes}
                </List>
            </Card>
        );
    }
}

export default MessageList;