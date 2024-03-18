import {createContext, useState} from 'react';
import useApi from '../hooks/useApi';

export const ItemsContext = createContext();

const ItemsContextProvider = (props) => {
 const {requestMaker} = useApi();
 const [items, setitems] = useState([])
 const [error, seterror] = useState(true);
 const [location, setLocation] = useState('Ilorin');
 const [sub_cat, setSubCat] = useState('all');

 const getitems = async(Token, main_cat, under_main_cat, sub_cat, loc, offset) => {
  const params = {token:Token, 
   action:'get_items_under_main_cat', 
   main_cat, category:under_main_cat, 
   sub_cat:sub_cat,
   location:loc,
   offset,
 } 
  const result = await requestMaker('product/items', params);
  if(result?.status === 'successful'){
   setitems(result?.data);
  }else {
   seterror(true);
   setitems([])
  }
 }

 const getMoreitems = async(Token, main_cat, under_main_cat, sub_cat, loc, offset) => {
  const params = {token:Token, 
   action:'get_items_under_main_cat', 
   main_cat, category:under_main_cat, 
   sub_cat:sub_cat,
   location:loc,
   offset,
 } 
 const result = await requestMaker('product/items', params);
  if(result?.status === 'successful'){
   setitems(prev => ([...prev, ...result?.data]));
  }else {
   seterror(true);
   setitems([])
  }
 }

   
 return ( 
  <ItemsContext.Provider value={{
   getitems,
   items,
   error,
   setLocation,
   location,
   setSubCat,
   sub_cat,
   getMoreitems
  }}>
   {props.children}
  </ItemsContext.Provider>
 );
}
 
export default ItemsContextProvider;
