import React, { useCallback, useEffect, useRef, useState } from 'react';
//import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { v4 as uuid } from 'uuid';

import Input from '../../components/Input';

import {Container, Form, List} from './styles';

//import {SocketContext} from "../../context/socket";
import socket from "../../services/socket";

import {useAuth} from '../../context/auth';

interface IMessage{
    key: string,
    author: string,
    content: string,
    sala: string,
}

interface IUser {
    socketId: string,
    username: string,
    sala: string,
}

const Chat: React.FC = () => {
    const {username, sala} = useAuth();
    const formRef = useRef<FormHandles>(null);
    
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [usuariosConectados, setUsuariosConectados]= useState<IUser[]>([]);
    
    useEffect(() => {
        socket.on('previous messages', (data: IMessage[]) => {
            setMessages(data);
        })

        socket.on('connected users', (data: IUser[]) => {
            setUsuariosConectados(data);
        })
    }, []);

    useEffect(() => {
        socket.on('message received', (data: IMessage) => {
            setMessages([...messages, data]);
        })
    }, [messages]);

    useEffect(() => {
        socket.on('new user', (data: IUser) => {
            setUsuariosConectados([...usuariosConectados, data]);
        })

        socket.on('disconnected user', (socketIdUsuarioDesconectado: string) => {  
            setUsuariosConectados([...usuariosConectados.filter(usuario => usuario.socketId !== socketIdUsuarioDesconectado)]);
        })
    }, [usuariosConectados]);

    const handleSubmit = useCallback((data: any)=>{
        if(formRef.current?.getFieldValue('messageContent')){
            const id = uuid();

            socket.emit('chat message', {
                key: id,
                author: username,
                content: data.messageContent,
                sala,
            });
    
            //Põe na tela do usuário sua prória mensagem recém digitada
            setMessages([...messages, {
                key: id,
                author: username,
                content: data.messageContent,
                sala,
            }]);
            
            formRef.current?.clearField('messageContent');
        }
    }, [messages, username, sala]);
    
    return(
        <Container>          
            <h1> Sala {sala} </h1>
            <h3>Usuários conectados: </h3> 
            <p>
            {
                usuariosConectados&&
                usuariosConectados.map(user => (
                    <span key={user.socketId}>{user.username} </span>
                ))
            }   
            </p>
            <List>
                {
                    messages&&
                    messages.map(message => (
                        <li key={message.key}><strong>{message.author}</strong>: {message.content}</li>
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