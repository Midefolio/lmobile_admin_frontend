import { AdminContext } from "../../context/admincontext";
import { AuthContext } from "../../context/authcontext";
import SideBar from "../c-pannel/sidebar";
import {useEffect, useState, useContext} from 'react';
import useUtils from "../../utils/useUtils";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DeleteDriver from "./deletedriver";
import UpdateDriver from "./updatedriver";
import AddDriver from "./adddriver";
import { useRef } from "react";


const Drivers = () => {
 const {Drivers, setDrivers, getDrivers, getMoreDrivers} = useContext(AdminContext)
 const {current, token} = useContext(AuthContext)
 const [deleteDriver, setDeleteDriver] = useState(false)
 const {setToast, formatNumber} = useUtils();
 const history = useHistory();
 const [blockSeller, setBlockSeller] = useState(null);
 const [updateDriver, setUpdateDriver] = useState(null);
 const [add, setAdd] = useState(false);

 useEffect(()=> {
  document.title = 'L-Mobile ~ c-pannel'
  document.body.style.background = '#f3f3f3';
  return(()=> {document.body.style.backgroundColor='white'})
 })

 useEffect(()=> {
  if(current) {
   getDrivers(token, 0);
  }
 }, [current])


 const searchHandler = (name) => {
   const value = name.slice(0, 20);
   const searchResult = Drivers?.filter((i) => i.email.slice(0, 3) == value);
   if(searchResult.length > 0){
    setDrivers(searchResult)
   }else {
    setToast('No result Found');
   }

   if(name.trim() === ''){
    getDrivers(token, 0);
   }
 }

 const scrollableDiv = useRef();
 const [fetching, setFectching] = useState(false);
  const handlleFetchOnScroll = async () => {
   const divElement = scrollableDiv.current;
   if(divElement){
     const scrollTop = divElement.scrollTop;
     const scrollHeight = divElement.scrollHeight;
     const clientHeight = divElement.clientHeight;
     // setTop(scrollTop)
     // setheight(scrollHeight)
     // setclient(clientHeight)
     //  alert(scrollTop + clientHeight === scrollHeight)
     // console.log(scrollTop, clientHeight,  scrollHeight)
     if(scrollTop + clientHeight === scrollHeight){
       setFectching(true);
       await getMoreDrivers(token, Drivers?.length);
       setFectching(false);
     }
   }
 }
 
 useEffect(()=> {
   const divElement = scrollableDiv.current;
   if(divElement) {
     divElement.addEventListener('scroll', handlleFetchOnScroll)
   }
   return () => {
     if(divElement){
       divElement.removeEventListener('scroll', handlleFetchOnScroll)
     }
   }
 }, [Drivers])
 

 return ( <>
 <SideBar/>
 {add && <AddDriver setAdd={setAdd} />}
 <div className="my-col-10 off-2">
  <div className="my-col-10 off-1 down-10">
   <div className="bd-bottom mother">
    <div className="my-col-2">
      <i className="fas fa-angle-left pd-5 c-pointer" onClick={()=>{history.push('/c-panel')}}></i>
      <span className="bold px13 upper-case mgl-10">DISPATCH RIDERS</span>
   </div>
  <div className="my-col-4 top- mgl-10"><input type="text" onChange={(e)=> {searchHandler(e.target.value)}} placeholder="search email" className="search-input bg-faded-2" /></div>
  <div className="my-col-6 off-4">
    <span className="my-btn-sm bg-color-code-1 fl-right white px10" onClick={()=> {setAdd(true)}}>Add Personnel</span>
  </div>
   </div>
   <div className="mother down-3">
   <div className="mother header">
      <span className="sn">Id</span>
      <span className="table-header">Full Name</span>
      <span className="table-header">Gender</span>
      <span className="table-header">Email</span>
      <span className="table-header">Phone Number</span>
      <span className="table-header">Location</span>
      <span className="table-header width-10">Action</span>
   </div>
   <div className="table-con" ref={scrollableDiv}>
     <div className="table-scroll-con">
     {Drivers?.length < 1 ? <div className="my-col-12 centere down-3 px13"><span className="upper-case">No Personnels Yet </span></div> : 
     <>
      {Drivers?.map((i, index) => (
      <div className={`my-col-12 t-body`} key={index}>
       {deleteDriver === `delete-item-${i.id}` && <DeleteDriver i={i} setDeleteDriver={setDeleteDriver} />}
       {updateDriver === `edit-item-${i.id}` && <UpdateDriver i={i} setUpdateDriver={setUpdateDriver} />}
        <span className="sn sd centered">{index + 1}</span>
        <span className="table-body" title={i.firstname}>{i.isBlocked == '1' ? <sup className="pd-5 rad-10 bg-color-code-2 color-code-1 px10">Blocked</sup> : <>{i.lastname}</>}</span>
        <span className="table-body" title={i.gender}>{i.gender}</span>
        <span className="table-body" title={i.email}>{i.email?.slice(0, 15)}</span>
        <span className="table-body" title={i.phone}>{i.phone}</span>
        <span className="table-body" title={i.location}>{i.location}</span>
        <span className="table-body unset-indent">
        <span className="my-btn-sm faded-2 " onClick={()=> {setUpdateDriver(`edit-item-${i.id}`)}}><i className="fas fa-edit"></i></span>
        <span className="my-btn-sm faded-2 mgl-5" onClick={()=> {setDeleteDriver(`delete-item-${i.id}`)}}><i className="fas fa-trash-alt"></i></span>
        </span>
      </div>
      ))}
     </>
     }
     </div>
    </div>
    {fetching && <div className="centered mother down-2 px10"><span> <i className="fas fa-spinner px13 fa-spin"></i> <span className="mgl-5">fetching more data .. </span></span></div>}
   </div>
  </div>
 </div>
 </> );
}
 
export default Drivers;