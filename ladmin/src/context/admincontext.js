import {createContext, useState} from 'react';
import useApi from '../hooks/useApi';

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
 const token = localStorage.getItem('lmobileToken');
 const {requestMaker} = useApi();
 const [users, setUsers] = useState(null);
 const [orders, setOrders] = useState(null);
 const [sellers, setSellers] = useState(null)
 const [Referers, setReferers] = useState(null);
 const [Drivers, setDrivers] = useState(null);
 const [payments, setPayments] = useState(null);

 const getUsers = async(Token, offset) => {
  const params = {token:Token, action:'get_users', offset}
  const result = await requestMaker('admin/users', params);
  if(result?.status === 'successful'){
   setUsers(result?.data);
   return true;
  }
 }

 const getMoreUsers = async(Token, offset) => {
  const params = {token:Token, action:'get_users', offset}
  const result = await requestMaker('admin/users', params);
  if(result?.status === 'successful'){
   setUsers(prev => ([...prev, ...result?.data]));
   return true;
  }
 }

 const getOrders = async(Token, offset) => {
  const params = {token:Token, action:'get_orders', offset}
  const result = await requestMaker('admin/orders', params);
  if(result?.status === 'successful'){
   setOrders(result?.data);
   return true;
  }
 }

 const getMoreOrders = async(Token, offset) => {
  const params = {token:Token, action:'get_orders', offset}
  const result = await requestMaker('admin/orders', params);
  if(result?.status === 'successful'){
   setOrders(prev => ([...prev, ...result?.data]));
   return true;
  }
 }

 const getSellers = async(Token, offset) => {
  const params = {token:Token, action:'get_sellers', offset}
  const result = await requestMaker('admin/seller', params);
  if(result?.status === 'successful'){
   setSellers(result?.data);
   return true;
  }
 }

 const getMoreSellers = async(Token, offset) => {
  const params = {token:Token, action:'get_sellers', offset}
  const result = await requestMaker('admin/seller', params);
  if(result?.status === 'successful'){
   setSellers(prev => ([...prev, ...result?.data]));
   return true;
  }
 }

 const getReferers = async(Token, offset) => {
  const params = {token:Token, action:'get_referers', offset}
  const result = await requestMaker('admin/referers', params);
  if(result?.status === 'successful'){
   setReferers(result?.data);
   return true;
  }
 }

 const getMoreReferers = async(Token, offset) => {
  const params = {token:Token, action:'get_referers', offset}
  const result = await requestMaker('admin/referers', params);
  if(result?.status === 'successful'){
   setReferers(prev => ([...prev, ...result?.data]));
   return true;
  }
 }

 const getDrivers = async(Token, offset) => {
  const params = {token:Token, action:'get_drivers', offset}
  const result = await requestMaker('admin/drivers', params);
  if(result?.status === 'successful'){
   setDrivers(result?.data);
   return true;
  }
 }

 const getMoreDrivers = async(Token, offset) => {
  const params = {token:Token, action:'get_drivers', offset}
  const result = await requestMaker('admin/drivers', params);
  if(result?.status === 'successful'){
   setDrivers(prev => ([...prev, ...result?.data]));
   return true;
  }
 }


 const getPayments = async(Token, offset) => {
  const params = {token:Token, action:'get_payments', offset}
  const result = await requestMaker('admin/payments', params);
  if(result?.status === 'successful'){
    setPayments(result?.data);
   return true;
  }
 }

 const getMorePayments = async(Token, offset) => {
  const params = {token:Token, action:'get_payments', offset}
  const result = await requestMaker('admin/payments', params);
  if(result?.status === 'successful'){
   setPayments(prev => ([...prev, ...result?.data]));
   return true;
  }
 }

 
 const [witRequests, setWitRequests] = useState([])
 const getWitRequests = async(Token, offset) => {
  const params = {token:Token, action:'get_wit_requests', offset}
  const result = await requestMaker('admin/withrequests', params);
  if(result?.status === 'successful'){
   setWitRequests(result?.data);
   return true;
  }
 }

const getMoreRequests = async(Token, offset) => {
const params = {token:Token, action:'get_wit_requests', offset}
const result = await requestMaker('admin/withrequests', params);
if(result?.status === 'successful'){
  setWitRequests(prev => ([...prev, ...result?.data]));
  return true;
 }
}



   
 return ( 
  <AdminContext.Provider value={{
   users,
   orders,
   Drivers,
   setDrivers,
   getDrivers,
   getMoreDrivers,
   getUsers,
   getMoreUsers,
   getMoreOrders,
   getOrders,
   setUsers,
   setOrders,
   token,
   getSellers,
   getMoreSellers,
   sellers,
   setSellers,
   getReferers,
   getMoreReferers,
   Referers,
   setReferers,
   payments,
   setPayments,
   getPayments,
   getMorePayments,
   witRequests, 
   setWitRequests, 
   getWitRequests, 
   getMoreRequests

  }}>
   {props.children}
  </AdminContext.Provider>
 );
}
 
export default AdminContextProvider;
