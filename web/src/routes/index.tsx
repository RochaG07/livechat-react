import React from 'react';
import { Switch } from 'react-router-dom';

import Chat from '../pages/Chat';
import Login from '../pages/Login';

import Route from './Route';
const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/chat" isPrivate component={Chat} />
    </Switch>
);

export default Routes;