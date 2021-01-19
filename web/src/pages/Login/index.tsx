import React, { useRef, useState } from 'react';

import Input from '../../components/Input';

import {Container, Form} from './styles';
import {useAuth} from '../../context/auth';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';

import socket from "../../services/socket";
import Select from '../../components/Select';

interface IOptions {
    label: string,
    value: string,
}

const Login: React.FC = () => {
    const {login} = useAuth();
    const formRef = useRef<FormHandles>(null);

    const history = useHistory();

    function handleSubmit(data: any):void {
        login(data);

        socket.emit('login', data);

        history.push('/chat');
    }

    return(
        <Container> 
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input type="text" name="username" placeholder="Digite seu nome"/>

                <Select
                    name="sala"
                    placeholder="Selecione a sala"
                    options={[
                        {label: 'Sala 1',value:'1'},
                        {label: 'Sala 2',value:'2'}
                    ]}
                />
                
                <button type='submit'>Enter</button>    
            </Form>         
        </Container>
    );    
};

export default Login;