import {createContext, useEffect, useLayoutEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useApi from '../hooks/useApi';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
 const token = localStorage.getItem('lmobileToken');
 const {requestMaker} = useApi();
 const history = useHistory()
 const [current, setCurrent] = useState(null);


 
 const getCurrentUser = async(Token) => {
  const params = {token:Token}
  const result = await requestMaker('auth/currentuser', params);
  if(result?.status === 'successful'){
   setCurrent(result?.data);
   return true;
  }else {
   
  }
 }

 const LogoutHandler = async(Token) => {
  localStorage.removeItem('lmobileToken')
  history.push('/');
 }

 useEffect(()=> {
  if(token){
   getCurrentUser(token);
  }else {
   history.push('/')
  }
 }, [])

   
 return ( 
  <AuthContext.Provider value={{
   getCurrentUser,
   current,
   LogoutHandler,
   token
  }}>
   {props.children}
  </AuthContext.Provider>
 );
}
 
export default AuthContextProvider;
