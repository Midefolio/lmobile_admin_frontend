import {createContext, useEffect, useLayoutEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useApi from '../hooks/useApi';

export const VariantContext = createContext();

const VariantContextProvider = (props) => {
 const token = localStorage.getItem('lmobileToken');
 const {requestMaker} = useApi();
 const {pathname} = useLocation()
 const history = useHistory()
 const [variants, setVariants] = useState({size:[], color:[], brand:[]});
 
 const getVariants = async(Token) => {
  const params = {action:'get_all_variations', table:'all', token:Token}
  const result = await requestMaker('variation/variations', params);
  // console.log(result)
  if(result?.status === 'successful'){
   // console.log(result?.size)
   setVariants(prev => ({...prev, size:result?.size, color:result?.color, brand:result?.brand}));
  }
 }

 useEffect(()=> {
  if(token){
  getVariants(token)
  }else {
   history.push('/')
  }
 }, [])

   
 return ( 
  <VariantContext.Provider value={{
   getVariants,
   variants,
   setVariants
  }}>
   {props.children}
  </VariantContext.Provider>
 );
}
 
export default VariantContextProvider;
