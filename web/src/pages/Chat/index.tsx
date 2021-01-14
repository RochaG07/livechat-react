import React, { useCallback, useEffect, useRef, useState } from 'react';
//import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';

import {Container, Form, List} from './styles';

//import {SocketContext} from "../../context/socket";
import socket from "../../services/socket";

import {useAuth} from '../../context/auth';

interface IMessage{
    author: string,
    content: string,
  }

const Chat: React.FC = () => {
    const {username} = useAuth();
    const formRef = useRef<FormHandles>(null);

    //const socket = React.useContext(SocketContext);
    
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [messageKey, setMessageKey] = useState<number>(0);

    useEffect(() => {
        socket.on('previous messages', (data: IMessage[]) => {
            setMessages(data);
        })

        socket.on('message received', (data: IMessage) => {
            setMessages([...messages, data]);
        })
    }, [ messages]);

    const handleSubmit = useCallback((data: any)=>{
        if(formRef.current?.getFieldValue('messageContent')){
            socket.emit('chat message', {
                author: username,
                content: data.messageContent
            });
    
            setMessages([...messages, {
                author: username,
                content: data.messageContent
            }]);
    
            formRef.current?.clearField('messageContent');
        }
    }, [messages, username]);
    
    return(
        <Container>          
            <List key={messageKey}>
                {
                    messages&&
                    messages.map(message => (
                        <li><strong>{message.author}</strong>: {message.content}</li>
                    ))
                }   
            </List>
        
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input type="text" name="messageContent"/>
                <button type='submit'>Enter</button>    
            </Form>
        </Container>
    );    
};

export default Chat;