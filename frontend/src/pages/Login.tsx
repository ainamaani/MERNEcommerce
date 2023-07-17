import React,{useEffect,useState} from 'react';
import useLogin from '../hooks/UseLogin';
import { RiEyeLine,RiEyeOffLine } from 'react-icons/ri';

const Login = ():JSX.Element => {
    const {login,error,isLoading} = useLogin();

    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [showPassword,setShowPassword] = useState<boolean>(false);

    const handleLogin = async(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        await login({email,password});
    }

    const toggleShowPassword = () =>{
        setShowPassword(!showPassword);
    }

    return ( 
        <div className="content">
            <form onSubmit={handleLogin}>
                <h4>Login!</h4>
                <label htmlFor="email">E-mail</label>
                <input type="text" placeholder='Email' name='email'
                onChange={(e)=>{setEmail(e.target.value)}} value={email}
                />
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        name="password"
                        onChange={(e) => {
                        setPassword(e.target.value);
                        }}
                        value={password}
                    />
                    <button
                        type="button"
                        className={ error ? "login-password-toggle-button-error":"login-password-toggle-button" }
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                    </button>
                </div>
                { error && <div className="error">{error}</div> }
                <button type="submit" disabled={isLoading}>Login</button>
            </form>
        </div>
     );
}
 
export default Login;