import {createContext, useEffect, useLayoutEffect, useState} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import useApi from '../hooks/useApi';

export const CategoryContext = createContext();

const CategoryContextProvider = (props) => {
 const {requestMaker} = useApi();
 const [category, setCategory] = useState([]);
 const [error, seterror] = useState(false);
 const history = useHistory()
 const [values_under_main_cat, setValues_under_main_cat] = useState([])
 const {pathname} = useLocation()
 const token = localStorage.getItem('lmobileToken');


 
 const getAllCategory = async(Token) => {
  const params = {token:Token, action:'get_cat'}
  const result = await requestMaker('product/category', params);
  if(result?.status === 'successful'){
   setCategory(result?.data);
  }else {
   seterror(true);
  }
 }

 const getAllUnderMainCategory = async(Token, main_cat) => {
  const params = {token:Token, action:'get_under_main_cat', main_cat:main_cat }
  const result = await requestMaker('product/category', params);
  if(result?.status === 'successful'){
   setValues_under_main_cat(result?.data);
  }
 }

 useEffect(()=> {
  if(token){
   getAllCategory(token);
  }else {
   history.push('/')
  }
 }, [])
 
 
 return ( 
  <CategoryContext.Provider value={{
   getAllCategory,
   getAllUnderMainCategory,
   category,
   values_under_main_cat,
   error
  }}>
   {props.children}
  </CategoryContext.Provider>
 );
}
 
export default CategoryContextProvider;
