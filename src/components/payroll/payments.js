import { AdminContext } from "../../context/admincontext";
import { AuthContext } from "../../context/authcontext";
import SideBar from "../c-pannel/sidebar";
import {useEffect, useState, useContext, useRef} from 'react';
import useUtils from "../../utils/useUtils";
import moment from "moment";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";



const Payroll = () => {
 const {payments, setPayments, getPayments, getMorePayments} = useContext(AdminContext)
 const {current, token} = useContext(AuthContext)
 const [viewOrder, setViewOrder] = useState(false)
 const [deleteOrder, setDeleteOrder] = useState(false)
 const {formatNumber, setToast, isPending, addThreeHoursToTime, formatTransactionTime} = useUtils()
 const now = moment();
 const history = useHistory();
 const formattedTime = now.format('YYYY-MM-DD HH:mm:ss');
 const {requestMaker} = useApi();
 const [ods, setOds] = useState([]);
 const [value, setValue] = useState(0)
 const [pending, setPending] = useState();
 const [confirm, setConfirm] = useState(null) 
 const [confirmTransfer, setConfirmTransfer] = useState(null);
 // const [blockUser, setBlockUser] = useState(false)

 useEffect(()=> {
  document.title = 'L-Mobile ~ c-pannel'
  document.body.style.background = '#f3f3f3';
  return(()=> {document.body.style.backgroundColor='white'})
 }, [])

 useEffect(()=> {
  if(current) {
   getPayments(token, 0);
  }
 }, [current])

 const searchHandler = (id) => {
   const searchResult = ods?.filter((i) => i.order_id == id);
   if(searchResult.length > 0){
    setPayments(searchResult)
   }else {
    setToast('No result Found');
   }
   if(id.trim() === ''){
    getPayments(token, 0);
   }
 }

 useEffect(() => {
   const arr =  payments?.filter((i) => i.status == value);
   const pending = payments?.filter((i) => i.status == 0);
   if(arr){
    setOds(arr)
   }
   if(pending){
    setPending(pending?.length)
   }
 }, [payments, value])

 
 
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
      await getMorePayments(token, payments?.length);
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
}, [payments])



const ClearPayment = async (i, id) => {
  const param = {amount:i?.amount, email:i?.email, action:i?.type, id:i?.id, item:i.item, quantity:i?.quantity, token:token};
  isPending(id, true);
  const res = await requestMaker('/admin/payments', param);
  if(res?.status === 'successful'){
    await getPayments(token, 0);
    setConfirmTransfer(null);
    setToast(`${i?.amount} has been made transfered successfully`);
  }else {
    isPending(id, 'Yes');
  }
} 


 return ( <>
 <SideBar/>
 <div className="my-col-10 off-2">
  <div className="my-col-10 off-1 down-10">
   <div className="bd-bottom mother">
    <div className="my-col-2">
      <i className="fa fa-angle-left pd-5 c-pointer" onClick={()=> {history.push('/c-panel')}}></i>
     <span className="bold px13 upper-case mgl-10">Settlement</span>
   </div>
    {/* <div className="my-col-4  mgl-10"><input type="text"    onChange={(e)=>{searchHandler(e.target.value)}} placeholder="enter order ID" className="search-input bg-faded-2" /></div> */}
   </div>
    <div className="mother down-2">
     <div className="my-col-2 bd-bottom c-pointer "  onClick={() => {setValue(0)}}><span className={`px13 ${value == 0 ? "color-code-1": "faded"}`}> Pending Payments {pending && <sup className="bg-color-code-2 color-color-1 px10 pd-5 bold">{pending}</sup>} </span></div>
     <div className="my-col-2 off-1 bd-bottom c-pointer"  onClick={() => {setValue(1)}}><span className={`px13 ${value == 1 ? "color-code-1": "faded"}`} >Payment History</span></div>
     {value == 1 &&      <div className="my-col-6 right down-1 off-1 bd-bottm c-pointer" ><span className={`px13 pd-10 bg-color-code-1 white`} >Export CSV</span></div>}
    </div>
   <div className="mother down-3">
   <div className="mother header">
      <span className="sn">Id</span>
      <span className="table-header">Type</span>
      <span className="table-header">Receiver</span>
      {/* <span className="table-header">Bank</span> */}
      {/* <span className="table-header">Account Number</span> */}
      <span className="table-header">Total Amount</span>
      {value == 0 &&  <span className="table-header width-10">Action</span>}
     
   </div>
   <div className="table-con " ref={scrollableDiv}>
     <div className="table-scroll-con b-shadow">
     {payments === null ? <div className="my-col-12 centered down-3 px10 bold"><span className="upper-case">No payments yet </span></div> : 
     <>
      {ods?.map((i, index) => (
      <div className={`my-col-12 t-body`} key={index}>
        {confirmTransfer === `transfer-${i.id}` &&
        <div className="add-item-modal">
          <div className="my-col-4 off-4 down-15 my-bottom-50 bg-white faded">
            <div className="my-col-10 off-1 down-5">
              <div className="bold black bd-bottom">Confirm Settlements</div>
              <div className="mother down-4 px13 faded"><span>Credit <span className="bold black">NGN {i.amount}.00</span> to  {i.receiver} ?</span></div>
             <div className="mother down-8">
              <span className="my-btn-sm bg-color-code-1 white px13" id={`pay` + i.id} onClick={()=>{ClearPayment(i, `pay` + i.id)}}>Yes</span>
              <span className="my-btn-sm bg-color-code-2 color-code-1 px13 mgl-10" onClick={() => {setConfirmTransfer(null)}}>Cancle</span>
             </div>
            </div>
          </div>
        </div>
        }
       {/* {deleteOrder === `edit-item-${i.id}` && <DeleteOrder i={i} setDeleteOrder={setDeleteOrder} />} */}
        <span className="sn sd centered">{index + 1}</span>
        <span className="table-body upper-case bold ralewayR" title={i.type}>{i.type}</span>
        <span className="table-body upper-case" title={i.receiver}>{i.receiver?.slice(0, 15)}</span>
        {/* <span className="table-body upper-case bold px10" title={i.bank}>{i.bank}</span> */}
        {/* <span className="table-body upper-case" title={i.Account}>{i.Account}</span> */}
        <span className="table-body upper-case bold ralewayR" title={i.amount}>NGN {formatNumber(i.amount)}</span>
        <span className="table-boy upper-cae unset-indent down-1">
          {i.status == 0 && <span className="pd-10 rad-unset bg-color-code-1 px10  white centered c-pointer inline-b mgl-10 mgt-10 my-down-1" onClick={() => {setConfirmTransfer(`transfer-${i.id}`)}}>Clear Payment</span> }
         
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
 
export default Payroll;