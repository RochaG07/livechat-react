import React from 'react';
import {
    Route as ReactDOMRoute,
    RouteProps as ReactDOMRouteProps,
    Redirect
} from 'react-router-dom';

import { useAuth } from '../context/auth';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false , component: Component , ...rest}) => {
    const { username } = useAuth();

    return (
        // render -> Permite modificar a logística de mostrar alguma rota em tela
        <ReactDOMRoute 
            {...rest}
            
            render={({ location }) => {
                return isPrivate === !!username ? (
                    <Component />
                ) : (
                    <Redirect to={{
                        pathname: isPrivate ? '/' : '/chat',
                        state: {from: location}
                    }}
                    />
                )
            }}
        />
    );
};

export default Route;