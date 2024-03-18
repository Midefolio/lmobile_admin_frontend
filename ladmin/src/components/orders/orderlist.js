import { AdminContext } from "../../context/admincontext";
import { AuthContext } from "../../context/authcontext";
import SideBar from "../c-pannel/sidebar";
import {useEffect, useState, useContext, useRef} from 'react';
import ViewOrder from "./vieworder";
import useUtils from "../../utils/useUtils";
import moment from "moment";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ConfirmDelivery from "./confirmOrder";



const OrderList = () => {
 const {orders, setOrders, getOrders, getMoreOrders} = useContext(AdminContext)
 const {current, token} = useContext(AuthContext)
 const [viewOrder, setViewOrder] = useState(false)
 const [deleteOrder, setDeleteOrder] = useState(false)
 const {formatNumber, setToast, addThreeHoursToTime, formatTransactionTime} = useUtils()
 const now = moment();
 const history = useHistory();
 const formattedTime = now.format('YYYY-MM-DD HH:mm:ss');
 const {requestMaker} = useApi();
 const [ods, setOds] = useState([]);
 const [value, setValue] = useState(0)
 const [pending, setPending] = useState();
 const [confirm, setConfirm] = useState(null) 
 // const [blockUser, setBlockUser] = useState(false)

 useEffect(()=> {
  document.title = 'L-Mobile ~ c-pannel'
  document.body.style.background = '#f3f3f3';
  return(()=> {document.body.style.backgroundColor='white'})
 }, [])


 useEffect(()=> {
  if(current) {
    const intervalID = setInterval(() => {
      getOrders(token, 0);
    }, 10000);
    return () => {clearInterval(intervalID)}
  }
 }, [current])



 useEffect(()=> {
  if(current) {
   getOrders(token, 0);
  }
 }, [current])

 const searchHandler = (id) => {
   const searchResult = ods?.filter((i) => i.order_id == id);
   if(searchResult.length > 0){
    setOrders(searchResult)
   }else {
    setToast('No result Found');
   }
   if(id.trim() === ''){
    getOrders(token, 0);
   }
 }

 useEffect(() => {
   const arr =  orders?.filter((i) => i.delivery_status == value);
   const pending = orders?.filter((i) => i.delivery_status == 0);
   if(arr){
    setOds(arr)
   }
   if(pending){
    setPending(pending?.length)
   }
 }, [orders, value])


 const confirmDelivery = async (i) => {
   const params = {
    token:token,
    action:'confirm_delivery',
    id:i?.id,
    items:i?.items,
    email:i?.email
   }
   const res = await requestMaker('product/delivery', params)
   if(res?.status === 'successful') {
    await getOrders(token);
    setToast('Order has been confirmed');
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
      await getMoreOrders(token, orders?.length);
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
}, [orders])



 return ( <>
 <SideBar/>
 <div className="my-col-10 off-2">
  <div className="my-col-10 off-1 down-10">
   <div className="bd-bottom mother">
    <div className="my-col-4">
      <i className="fa fa-angle-left pd-5 c-pointer" onClick={()=> {history.push('/c-panel')}}></i>
     <span className="bold px13 upper-case mgl-10">Orders</span>
   </div>
    <div className="my-col-4 top-1 off-4"><input type="text" onChange={(e)=>{searchHandler(e.target.value)}} placeholder="search by Order Id" className="search-input bg-faded-2" /></div>
   </div>
    <div className="mother down-2">
     <div className="my-col-2 bd-bottom c-pointer "  onClick={() => {setValue(0)}}><span className={`px13 ${value == 0 ? "color-code-1": "faded"}`}>Pending {pending && <sup className="bg-color-code-2 color-color-1 px10 pd-5 bold">{pending}</sup>} </span></div>
     <div className="my-col-2 off-1 bd-bottom c-pointer"  onClick={() => {setValue(1)}}><span className={`px13 ${value == 1 ? "color-code-1": "faded"}`} >Delivered</span></div>
    </div>
   <div className="mother down-3">
   <div className="mother header">
      <span className="sn">Id</span>
      <span className="table-header">Order ID</span>
      <span className="table-header">Owner</span>
      <span className="table-header">Phone Number</span>
      <span className="table-header">Location</span>
      <span className="table-header">Total Amount</span>
      <span className="table-header">Time Ordered</span>
      <span className="table-header width-10">Action</span>
   </div>
   <div className="table-con " ref={scrollableDiv}>
     <div className="table-scroll-con b-shadow">
     {orders === null ? <div className="my-col-12 centered down-3 px10 bold"><span className="upper-case">No orders yet </span></div> : 
     <>
      {ods?.map((i, index) => (
      <div className={`my-col-12 t-body`} key={index}>
       {viewOrder === `view-item-${i.id}` && <ViewOrder i={i} setViewOrder={setViewOrder} />}
       {confirm === `confirm-item-${i.id}` && <ConfirmDelivery setConfirm={setConfirm} i={i} />}
       {/* {deleteOrder === `edit-item-${i.id}` && <DeleteOrder i={i} setDeleteOrder={setDeleteOrder} />} */}
        <span className="sn sd centered">{index + 1}</span>
        <span className="table-body upper-case bold ralewayR" title={i.order_id}>{i.order_id}</span>
        <span className="table-body upper-case" title={i.name}>{i.name?.slice(0, 15)}</span>
        <span className="table-body upper-case bold px10" title={i.phone}>{i.phone}</span>
        <span className="table-body upper-case" title={i.location}>{i.location}</span>
        <span className="table-body upper-case bold ralewayR" title={i.total_paid}>NGN {formatNumber(i.total_paid)}</span>
        <span className="table-body upper-case bold px10" title={formatTransactionTime(i.trn, formattedTime)}>{formatTransactionTime(i.trn, formattedTime)}</span>
        <span className="table-body upper-case unset-indent">
         {/* {i.delivery_status === '0' && <span className="my-btn-sm faded-2" title="Confirm Delivery" onClick={()=> {setConfirm(`confirm-item-${i.id}`)}}  ><i className="fas fa-check"></i></span> } */}
         <span className="my-btn-sm faded-2 mgl-10" onClick={()=> {setViewOrder(`view-item-${i.id}`)}}><i className="fas fa-eye"></i></span>
        {/* <span className="my-btn-sm faded-2 mgl-5" onClick={()=> {setDeleteUser(`delete-item-${i.id}`)}}><i className="fas fa-trash-alt"></i></span> */}
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
 
export default OrderList;