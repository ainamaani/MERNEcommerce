import React,{useEffect,useState} from 'react';
import useSignup from '../hooks/UseSignup';
import {RiEyeLine,RiEyeOffLine} from 'react-icons/ri'

const Signup = ():JSX.Element => {

    const {signup,error,isLoading} = useSignup();

    const [firstname,setFirstname] = useState<string>('');
    const [lastname,setLastname] = useState<string>('');
    const [email,setEmail] = useState<string>('');
    const [phonenumber,setPhonenumber] = useState<string>('');
    const [gender,setGender] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [passwordconfirm,setPasswordConfirmation] = useState<string>('');
    const [showPassword,setShowPassword] = useState<boolean>(false);
    const [showPasswordConfirm,setShowPasswordConfirm] = useState<boolean>(false);

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        await signup({firstname,lastname,email,phonenumber,gender,password,passwordconfirm});

        console.log(error);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    const toggleShowPasswordConfirm = () =>{
        setShowPasswordConfirm(!showPasswordConfirm);
    }

    return ( 
        <div className="content">
                <form onSubmit={handleSignUp}>
                <h4>Sign Up!</h4>
                <label htmlFor="firstname">First name</label>
                <input type="text" placeholder='First name' name='firstname'
                onChange={(e)=>{setFirstname(e.target.value)}} value={firstname}
                />
                <label htmlFor="lastname">Last name</label>
                <input type="text" placeholder='Last name' name='lastname'
                onChange={(e)=>{setLastname(e.target.value)}} value={lastname}
                />
                <label htmlFor="email">E-mail</label>
                <input type="text" placeholder='Email' name='email'
                onChange={(e)=>{setEmail(e.target.value)}} value={email}
                />
                <label htmlFor="phonenumber">Phone number</label>
                <input type="text" placeholder='Phone number' name='phonenumber'
                onChange={(e)=>{setPhonenumber(e.target.value)}} value={phonenumber}
                />
                {/* <div className='gender'>
                    <label htmlFor="male">Male</label>
                    <input
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                    checked={gender === 'male'}
                    onChange={handleGenderChange}
                    />
                    <label htmlFor="female">Female</label>
                    <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                    checked={gender === 'female'}
                    onChange={handleGenderChange}
                    />
                </div> */}
                <label htmlFor="">Gender</label>
                <select value={gender} onChange={(e)=>{setGender(e.target.value)}}>
                    <option value="choose" >Choose gender</option>
                    <option value="male" >Male</option>
                    <option value="female" >Female</option>
                </select>
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        name="password"
                        onChange={(e) => {
                        setPassword(e.target.value);
                        }}
                        value={password}
                    />
                    <button
                        type="button"
                        className={ error ? "password-toggle-button-error":"password-toggle-button" }
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                    </button>
                </div>
                <label htmlFor="passwordconfirm">Confirm Password</label>
                <div className="password-input-wrapper">
                    <input
                        type={showPasswordConfirm ? 'text' : 'password'}
                        placeholder="Enter password again"
                        name="passwordconfirm"
                        onChange={(e) => {
                        setPasswordConfirmation(e.target.value);
                        }}
                        value={passwordconfirm}
                    />
                    <button
                        type="button"
                        className= { error ? "confirmpassword-toggle-button-error":"confirmpassword-toggle-button" }
                        onClick={toggleShowPasswordConfirm}
                    >
                        {showPasswordConfirm ? <RiEyeOffLine /> : <RiEyeLine />}
                    </button>
                </div>
                {error !== null && error !== "" && <div className="error">{error}</div>}
                <button disabled={isLoading} type="submit">Sign Up</button>
                </form>
            </div>
     );
}
 
export default Signup;