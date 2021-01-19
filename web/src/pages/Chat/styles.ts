import styled from 'styled-components';
import {Form as unForm}  from '@unform/web';

export const Container = styled.div`
`;

export const List = styled.ul`
    list-style-type: none;
    margin: 0; 
    padding: 0;

    li{
        padding: 5px 10px;
    }    
    
    li:nth-child(odd){
        background: #eee
    }
`;

export const Form = styled(unForm)`
    background: #000; 
    padding: 3px; 
    position: fixed; 
    bottom: 0; 
    width: 50%;

    button { 
        width: 100%; 
        background: rgb(130, 224, 255); 
        border: none; 
        border-radius: 5px;
        padding: 10px; 
        margin-top: 5px;
    }
`;