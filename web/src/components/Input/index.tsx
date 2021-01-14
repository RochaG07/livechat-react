import React, {InputHTMLAttributes, useEffect, useRef, useState, useCallback} from 'react';
import { IconBaseProps } from 'react-icons';
import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    containerStyle?: object;
    icon?: React.ComponentType<IconBaseProps>;
}
//ComponentType -> Torna possível receber um componente como propriedade

//É necessário converter o nome de um componente para a letra maiuscula, senão o React não entende 
const Input: React.FC<InputProps> = ({name, icon: Icon, containerStyle, ...rest}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const { fieldName, defaultValue, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
        });
    }, [fieldName, registerField]);

    return (
        <Container style={containerStyle}>
            {Icon && <Icon size={20}/>}
            <input 
                defaultValue={defaultValue} 
                ref={inputRef} 
                {...rest}
            />
        </Container>
    )
};  

export default Input;
