import {createContext, useEffect, useLayoutEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useApi from '../hooks/useApi';

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
 const token = localStorage.getItem('lmobileToken');
 const {requestMaker} = useApi();
 const {pathname} = useLocation()
 const history = useHistory()
 const [dashboardSummary, setDashboardSummary] = useState(null);
 const [error, seterror] = useState(false);


 
 const getDashboardSummary = async(Token) => {
  const params = {token:Token}
  const result = await requestMaker('admin/summary', params);
  if(result?.status === 'successful'){
   setDashboardSummary(result?.data);
  }else {
   seterror(true);
  }
 }

 // useEffect(()=> {
 //  if(token){
 //   getDashboardSummary(token);
 //  }else {
 //   history.push('/')
 //  }
 // }, [])

   
 return ( 
  <DashboardContext.Provider value={{
   getDashboardSummary,
   dashboardSummary,
   error
  }}>
   {props.children}
  </DashboardContext.Provider>
 );
}
 
export default DashboardContextProvider;
