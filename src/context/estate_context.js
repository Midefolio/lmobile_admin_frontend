import {createContext, useEffect, useRef, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useApi from '../hooks/useApi';

export const EstateContext = createContext();

const EstateContextProvider = (props) => {
 const Phptoken = localStorage.getItem('lmobileToken');
 const {requestMaker, makeRequest} = useApi();
 const history = useHistory()
 const [current, setCurrent] = useState(null);
 const [isloading, setIsloading] = useState(null);
 const path = 'https://rich-cards.000webhostapp.com/images/' 
 const [Category, setCategory] = useState([]);
 const [features, setFeatures] = useState([]);
 const nodeToken = localStorage.getItem('lm_node_jwt');
 const abortController = useRef(new AbortController);
 

 const getNodeToken = async(Phptoken) => {
  if(Phptoken){
    const params = {
      username:process.env.REACT_APP_USERNAME,
      password:process.env.REACT_APP_PASSWORD
    }
    setIsloading(true);
    const cb =()=>{setIsloading(false)}
    const result = await makeRequest('post', `admin_auth/login`, params, cb, null, abortController);
    if(result?.message === 'done'){
     localStorage.setItem('lm_node_jwt', result?.jwt);
     await getCat(result?.jwt);
     await getFeatures(result?.jwt)
     setIsloading(false);
     history.push('/d-pannel')
    }
  }else{
    history.push('/')
  }
 }

 const LogoutHandler = async(Token) => {
  localStorage.removeItem('lmobileToken')
  history.push('/');
 }


 const getCat = async(jwt) => {
  const res = await makeRequest('get', `admin/get_all_prop`, null, null, jwt);
  if(res){
    setCategory(res?.category);
    setIsloading(false);
  }
 }

   
 const getFeatures = async(jwt) => {
  const res = await makeRequest('get', `admin/get_all_features`, null, null, jwt);
  if(res){
    setFeatures(res?.features);
    setIsloading(false);
  }
 }
 


 useEffect(()=> {
  if(nodeToken){
    getCat(nodeToken)
    getFeatures(nodeToken)
  }
 }, [])

   
 return ( 
  <EstateContext.Provider value={{
   getNodeToken,
   isloading,
   Category,
   features,
   path,
   abortController
  }}>
   {props.children}
  </EstateContext.Provider>
 );
}
 
export default EstateContextProvider;
