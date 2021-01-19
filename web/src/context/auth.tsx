import React, { createContext, useCallback, useContext, useState } from "react";

interface AuthContextData{
    username: string,
    sala: string,
    login(data: ILogin): void,
}

interface ILogin {
    username: string,
    sala: string,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {

    const [username, setUsername] = useState<string>('');
    const [sala, setSala] = useState<string>('');

    const login = useCallback(({username, sala}: ILogin) => {
        setUsername(username);
        setSala(sala);
    }, [])

    return(
        <AuthContext.Provider value={{username, sala, login}}>
            {children}
        </AuthContext.Provider>
    );
};


function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
    }

    return context;
}  

export {useAuth, AuthProvider};