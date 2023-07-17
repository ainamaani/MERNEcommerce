import React,{useState} from 'react';
import axios from 'axios';
import useAuthContext from './UseAuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface UserData{
    firstname:string,
    lastname:string,
    email:string,
    phonenumber:string,
    gender:string,
    password:string,
    passwordconfirm:string
}

const useSignup = () => {
    const [error,setError] = useState<string | null>(null);
    const [isLoading,setIsLoading] = useState<boolean>(false);

    const {dispatch} = useAuthContext();
    const navigate = useNavigate();

    const signup = async(userdata : UserData) =>{
        setError(null);
        setIsLoading(true);

        const response = await fetch("http://localhost:9000/api/auth/signup",{
            method : "POST",
            body: JSON.stringify(userdata),
            headers:{
                "Content-Type":"application/json"
            }
        })

        const data = await response.json();

        if(!response.ok){
            setIsLoading(false);
            setError(data.error);

            toast.error('Sign up failed, please try again!',{
                position: 'top-right'
            });
        }
        if(response.ok){
            //save user to localstorage
            localStorage.setItem("user",JSON.stringify(data));

            //update the context
            dispatch({type:'LOGIN', payload: data});

            setIsLoading(false);
            toast.success('Sign up completed successfully!', {
                position: 'top-right'
              });
            navigate('/login');

        }
    }
    return { signup,error,isLoading }
}
 
export default useSignup;
