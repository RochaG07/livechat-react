import styled from 'styled-components';

export const Container = styled.div`
    background: #F5F5F5;            
    border-radius: 10px;
    border: 2px solid #F5F5F5;
    padding: 16px;
    width: 100%;
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    input {
        flex: 1;
        background: transparent;
        border: 0;
        color: #000;

        &::placeholder {
            color: #666360;
        }

    }

    svg {
        margin-right: 16px;
    }
`;