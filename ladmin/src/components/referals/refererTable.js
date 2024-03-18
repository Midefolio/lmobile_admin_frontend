import { AdminContext } from "../../context/admincontext";
import { AuthContext } from "../../context/authcontext";
import SideBar from "../c-pannel/sidebar";
import {useEffect, useState, useContext} from 'react';
import useUtils from "../../utils/useUtils";
// import DeleteSeller from "./deleteSeller";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DeleteReferer from "./deleteref";
import BlockReferer from "./blockref";
import { useRef } from "react";


const Referers = () => {
 const {Referers, setReferers, getReferers, getMoreReferers} = useContext(AdminContext)
 const {current, token} = useContext(AuthContext)
 const [deleteSeller, setDeleteSeller] = useState(false)
 const {setToast, formatNumber} = useUtils();
 const history = useHistory();
 const [blockSeller, setBlockSeller] = useState(null)

 useEffect(()=> {
  document.title = 'L-Mobile ~ c-pannel'
  document.body.style.background = '#f3f3f3';
  return(()=> {document.body.style.backgroundColor='white'})
 })

 useEffect(()=> {
  if(current) {
   getReferers(token, 0);
  }
 }, [current])


 const searchHandler = (name) => {
   const value = name.slice(0, 20);
   const searchResult = Referers?.filter((i) => i.email.slice(0, 3) == value);
   if(searchResult.length > 0){
    setReferers(searchResult)
   }else {
    setToast('No result Found');
   }

   if(name.trim() === ''){
    getReferers(token, 0);
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
       await getMoreReferers(token, Referers?.length);
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
 }, [Referers])
 

 return ( <>
 <SideBar/>
 <div className="my-col-10 off-2">
  <div className="my-col-10 off-1 down-10">
   <div className="bd-bottom mother">
    
    <div className="my-col-4">
      <i className="fas fa-angle-left pd-5 c-pointer" onClick={()=>{history.push('/c-panel')}}></i>
      <span className="bold px13 upper-case mgl-10">Referers</span></div>
    <div className="my-col-4 mgl-10"><input type="text" onChange={(e)=> {searchHandler(e.target.value)}} placeholder="search email" className="search-input bg-faded-2" /></div>
   </div>
   <div className="mother down-3">
   <div className="mother header">
      <span className="sn">Id</span>
      <span className="table-header">Full Name</span>
      <span className="table-header">Email</span>
      <span className="table-header">Phone Number</span>
      <span className="table-header">ref_code</span>
      <span className="table-header">Balance</span>
      <span className="table-header width-10">Action</span>
   </div>
   <div className="table-con" ref={scrollableDiv}>
     <div className="table-scroll-con">
     {Referers?.length < 1 ? <div className="my-col-12 centere down-3 px13"><span className="upper-case">No Referers Yet </span></div> : 
     <>
      {Referers?.map((i, index) => (
      <div className={`my-col-12 t-body`} key={index}>

       {deleteSeller === `delete-item-${i.id}` && <DeleteReferer i={i} setDeleteReferer={setDeleteSeller} />}
       {blockSeller === `edit-item-${i.id}` && <BlockReferer i={i} setBlockReferer={setBlockSeller} />}
        <span className="sn sd centered">{index + 1}</span>
        <span className="table-body" title={i.name}>{i?.isBlocked == '1' ? <sup className="pd-5 rad-10 bg-color-code-2 color-code-1 px10">Blocked</sup> : <>{i.name}</>}</span>
        <span className="table-body" title={i.email}>{i?.email?.slice(0, 15)}</span>
        <span className="table-body" title={i.phone}>{i?.phone}</span>
        <span className="table-body" title={i.ref_code}>{i?.ref_code?.slice(0, 19)}</span>
        <span className="table-body bold" title={formatNumber(i?.balance)}>N {formatNumber(i?.balance)}</span>
        <span className="table-body unset-indent">
        <span className="my-btn-sm faded-2 " onClick={()=> {setBlockSeller(`edit-item-${i.id}`)}}><i className="fas fa-edit"></i></span>
        <span className="my-btn-sm faded-2 mgl-5" onClick={()=> {setDeleteSeller(`delete-item-${i.id}`)}}><i className="fas fa-trash-alt"></i></span>
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
 
export default Referers;