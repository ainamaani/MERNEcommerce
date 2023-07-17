import { Link,NavLink } from "react-router-dom";
import React,{useEffect} from 'react';
import useLogout from "../hooks/UseLogout";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuthContext from "../hooks/UseAuthContext";


const Navbar = ():JSX.Element => {
    const {logout} = useLogout();
    const {user} = useAuthContext();

    const handleLogout = () =>{
        logout()
        toast.success('Logged out successfully!',{
            position: 'top-right'
        });
    }

    return ( 
        <nav>
            <div className="nav-details">
                <h1>QuickBuy</h1>
                    {!user && (
                        <div className="loggedout">
                            <div className="loggedoutlinks">
                                <ul>
                                    <li><a className="nav-link" href="/">Home</a></li>
                                    <li><a className="nav-link" href="/about">About Us</a></li>
                                    <li><a className="nav-link" href="/contact">Contact</a></li>
                                    <li><a className="nav-link" href="/signup">Sign up</a></li>
                                    <li><a className="nav-link" href="/login">Login</a></li>
                                </ul>
                            </div>
                        </div>
                    )}
                    {user && (
                        <div className="loggedin">
                            <div className="loggedinlinks">
                                <ul>
                                    <li><a className="nav-link" href="/">Home</a></li>
                                    <li><a className="nav-link" href="/about">About Us</a></li>
                                    <li><a className="nav-link" href="/contact">Contact</a></li>
                                    <li><a className="nav-link" href="/cart">Cart</a></li>
                                </ul>
                            </div>
                            <div className="logoutbutton">
                                <button onClick={handleLogout}>Log out</button>
                            </div>
                        </div>
                    )}
            </div>
        </nav> 
     );
}
 
export default Navbar;