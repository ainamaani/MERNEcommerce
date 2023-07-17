import useAuthContext from "./UseAuthContext"

const useLogout = () => {
    const {dispatch} = useAuthContext();

    const logout = () =>{
        //delete token
        localStorage.removeItem('user');

        //update the auth API context
        dispatch({type:'LOGOUT'});
    }

    return {logout}
}
 
export default useLogout;