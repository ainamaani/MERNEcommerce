import React,{useEffect,useState} from 'react';
import useAuthContext from './UseAuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

interface LoginData{
    email:string,
    password:string
}

const useLogin = () => {
    const {dispatch} = useAuthContext()
    const navigate = useNavigate();

    const [error,setError] = useState<string | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    const login = async(logindata : LoginData) =>{

        setError(null);
        setIsLoading(true)

        const response = await fetch("http://localhost:9000/api/auth/login",{
            method: 'POST',
            body: JSON.stringify(logindata),
            headers:{
                "Content-Type":"application/json"
            }
        });

        const data = await response.json();

        if(!response.ok){
            setError(data.error);
            setIsLoading(false);
            toast.error('Login failed, please try again!',{
                position: 'top-right'
            });
        }
        if(response.ok){
            setError(null);
            
            //save the user in local storage
            localStorage.setItem('user',JSON.stringify(data));
            //update the auth api context
            dispatch({type:'LOGIN', payload: data});

            setIsLoading(false);
            toast.success('You are now logged in!', {
                position: 'top-right'
              });

            //redirect to another page
            navigate('/products');   
        }

    }
    return {login,error,isLoading}
}
 
export default useLogin;