import React, { useRef } from 'react';

import Input from '../../components/Input';

import {Container, Form} from './styles';
import {useAuth} from '../../context/auth';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';

import socket from "../../services/socket";

const Login: React.FC = () => {
    const {login} = useAuth();
    const formRef = useRef<FormHandles>(null);

    const history = useHistory();

    function handleSubmit(data: any):void {

        login({
            username: data.username, 
        });

        socket.emit('login', data.username);

       history.push('/chat');
    }

    return(
        <Container> 
               
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input type="text" name="username" placeholder="Digite seu nome"/>
                <button type='submit'>Enter</button>    
            </Form>         
        </Container>
    );    
};

export default Login;