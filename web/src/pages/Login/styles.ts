import styled from 'styled-components';
import {Form as unForm}  from '@unform/web';

export const Container = styled.div`
`;

export const Form = styled(unForm)`
    background: #000; 
    padding: 3px; 
    position: fixed; 
    width: 50%;

    label {
        color: #fff;
    }

    button { 
        width: 100%; 
        background: rgb(130, 224, 255); 
        border: none; 
        border-radius: 5px;
        padding: 10px; 
        margin-top: 5px;
    }
`;