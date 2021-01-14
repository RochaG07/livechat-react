import React, { createContext, useCallback, useContext, useState } from "react";

interface AuthContextData{
    username: string,
    login(data: ILogin): void,
}

interface ILogin {
    username: string,
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {

    const [username, setUsername] = useState<string>('');

    const login = useCallback(({username}: ILogin) => {
        setUsername(username);
    }, [])

    return(
        <AuthContext.Provider value={{username, login}}>
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