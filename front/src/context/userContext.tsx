// eslint-disable
'use client'
import {createContext,useContext, useState} from "react";


interface ContextProps {
    userContextName: string
    setUserContextName: (value: string) => void
}

const userContext = createContext<ContextProps>({userContextName: '', setUserContextName: value => 'dgsrgd'});

// @ts-ignore
export const UserContextProvider = ({children}) => {
    const [userContextName, setUserContextName] = useState('');

    return (
        <userContext.Provider value={{ userContextName, setUserContextName }}>
            {children}
        </userContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(userContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};