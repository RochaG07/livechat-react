import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';
import Routes from './routes';

//import {SocketContext,  socket } from "./context/socket";
import {AuthProvider} from './context/auth';

const App: React.FC = () => (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>

        <GlobalStyle/>
      </AuthProvider>
    </>
)

//SocketContext.Provider value={socket}

export default App;
