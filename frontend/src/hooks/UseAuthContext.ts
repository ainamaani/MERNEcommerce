import React,{useContext} from 'react';
import { AuthContext } from '../contexts/AuthContext';

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("You are not in the scope of this context so you can't use it")
    }
    return context;
}

export default useAuthContext;