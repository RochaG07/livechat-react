import React from "react";

import {io} from "socket.io-client";

const socket = io("http://localhost:3333");

//const SocketContext = React.createContext(socket)

//export {socket, SocketContext};