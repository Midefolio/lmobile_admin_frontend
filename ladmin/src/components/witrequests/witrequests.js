import { AdminContext } from "../../context/admincontext";
import { AuthContext } from "../../context/authcontext";
import SideBar from "../c-pannel/sidebar";
import {useEffect, useState, useContext, useRef} from 'react';
import useUtils from "../../utils/useUtils";
import moment from "moment";
import useApi from "../../hooks/useApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AiOutlineTransaction } from "react-icons/ai";

const WithRequests = () => {
 const {witRequests, setWitRequests, getWitRequests, getMoreRequests} = useContext(AdminContext)
 const {current, token} = useContext(AuthContext)
 const [viewOrder, setViewOrder] = useState(false)
 const [deleteOrder, setDeleteOrder] = useState(false)
 const {formatNumber, setToast, isPending, addThreeHoursToTime, formatTransactionTime, exportToCSV, getBankName} = useUtils()
 const now = moment();
 const history = useHistory();
 const formattedTime = now.format('YYYY-MM-DD HH:mm:ss');
 const {requestMaker, clearTransfer} = useApi();
 const [ods, setOds] = useState([]);
 const [value, setValue] = useState('pending')
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
    const timeOut = setInterval(() => {
      getWitRequests(token, 0);
    }, 10000);
    return () => {
      clearInterval(timeOut);
    } 
  }
}, [current])


useEffect(()=> {
  if(current) {
    getWitRequests(token, 0);
  }
}, [current])

 const searchHandler = (id) => {
   const searchResult = ods?.filter((i) => i.order_id == id);
   if(searchResult.length > 0){
    setWitRequests(searchResult)
   }else {
    setToast('No result Found');
   }
   if(id.trim() === ''){
    getWitRequests(token, 0);
   }
 }


 useEffect(() => {
   const arr =  witRequests?.filter((i) => i.status == value);
   const pending = witRequests?.filter((i) => i.status === 'pending');
   if(arr){
    setOds(arr)
   }
   if(pending){
     setPending(pending?.length)
    }
    // exportToCSV(witRequests);
 }, [witRequests, value])

 
 
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
      await getMoreRequests(token, witRequests?.length);
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
}, [witRequests])


const transferRequest = async (params, id) => {
  isPending(id, true);
  const res = await clearTransfer(params);
  // console.log(res);
}

const deleteRequest = async (id) => {
  isPending('del'+id, true)
  const params = {token, id, action:'delete_wit_requests'}
  const res = await  requestMaker('admin/withrequests', params);
  if(res?.status === 'successful'){
    await getWitRequests(token, 0)
    setDeleteOrder(null);
    setToast('Deleted Successfully');
  }else {
    isPending('del'+id, 'Delete');
    setToast("Something Went Wrong")
  }
}

const [manual, setManual] = useState(null);
const approveRequest = async (i) => {
  isPending('man'+i.id, true);
  const params = {token, email:i.email, action:i.type, id:i.id, amount:i.amount, trans_id:""}
  const res = await requestMaker('admin/withrequests', params);
  if(res?.status === 'successful' ){
    await getWitRequests(token, 0)
     setManual(null);
     setToast('Successful');
  }else {
    isPending('man'+i.id, 'Yes')
  }
}


 return ( <>
 <SideBar/>
 <div className="my-col-10 off-2">
  <div className="my-col-10 off-1 down-10">
   <div className="bd-bottom mother">
    <div className="my-col-3">
      <i className="fa fa-angle-left pd-5 c-pointer" onClick={()=> {history.push('/c-panel')}}></i>
     <span className="bold px13 upper-case mgl-10">Withdrawal Requests</span>
   </div>
   </div>
    <div className="mother down-2">
     <div className="my-col-2 bd-bottom c-pointer "  onClick={() => {setValue('pending')}}><span className={`px13 ${value == 'pending' ? "color-code-1": "faded"}`}> Pending Withdrawals {pending && <sup className="bg-color-code-2 color-color-1 px10 pd-5 bold">{pending}</sup>} </span></div>
     <div className="my-col-2 off-1 bd-bottom c-pointer"  onClick={() => {setValue('done')}}><span className={`px13 ${value == 'done' ? "color-code-1": "faded"}`} >History</span></div>
     {value == 'done' &&    <div className="my-col-6 right down-1 off-1 bd-bottm c-pointer" ><span className={`px13 pd-10 bg-color-code-1 white`} >Export CSV</span></div>}
    </div>
   <div className="mother down-3">
   <div className="mother header">
      <span className="sn">Id</span>
      <span className="table-header">Withdrawer</span>
      <span className="table-header">Date</span>
      <span className="table-header">Account Number</span>
      <span className="table-header">Bank</span>
      <span className="table-header">Withdrawal Amount</span>
      {value === 'pending' &&   <span className="table-header wid">Action</span>}
     
   </div>
   <div className="table-con " ref={scrollableDiv}>
     <div className="table-scroll-con b-shadow">
     {witRequests === null ? <div className="my-col-12 centered down-3 px10 bold"><span className="upper-case">No Requests yet </span></div> : 
     <>
      {ods?.map((i, index) => (
      <div className={`my-col-12 t-body`} key={index}>
       {deleteOrder === `delete-${i.id}` &&  <div className="add-item-modal  bg-blur">
      <div className="my-col-4 off-4 bg-white brad my-bottom-50 down-10">
      <div className="my-col-10 off-1 down-10">
      <div className="mother"><span className="px13 bold monR">Are you sure you wnat to delete this request ?</span></div>
      <div className="mother down-5">
        <span className="my-btn-sm bg-faded faded px13" onClick={()=> {deleteRequest(i.id)}}>Yes</span>
         <span className="my-btn-sm bg-color-code-1 white px13 mgl-10 rad-10" onClick={()=> {setDeleteOrder(null)}}>No</span>
        </div>
       </div>
       </div>
      </div>
       }
       {manual == `man_${i.id}` &&  <div className="add-item-modal  bg-blur">
            <div className="my-col-4 off-4 bg-white brad my-bottom-50 down-10">
           <div className="my-col-10 off-1 down-5">
           <div className="mother bd-bottom"><span className="px13 bold monR">Clear Manually ?</span></div>
           <div className="mother down-5"><span className="px12 monR faded">
             Please Only use this option when transfer has been made to user manually as user will receive a 
             successful Withdrawal notification. 
          </span></div>
           <div className="mother down-5">
             <span className="my-btn-sm bg-faded faded px13" id={'man'+i.id} onClick={()=> {approveRequest(i)}}>Yes</span>
              <span className="my-btn-sm bg-color-code-1 white px13 mgl-10 rad-10" onClick={()=> {setManual(null)}}>No</span>
             </div>
            </div>
            </div>
           </div>}
        <span className="sn sd centered">{index + 1}</span>
        <span className="table-body upper-case bold px9 ralewayR" title={i?.name}>{i?.name?.slice(0, 10) + "..."}</span>
        <span className="table-body upper-case bold px9" title={i.trn}>{formatTransactionTime(i.trn, formattedTime)}</span>
        <span className="table-body upper-case bold px9" title={i.account_number}>{i.account_number}</span>
        <span className="table-body upper-case bold px9" title={i.account_number}>{getBankName(i.bank_code)}</span>
        <span className="table-body upper-case bold ralewayR" title={i.amount}>NGN {formatNumber(i.amount)}</span>
        <span className="table-boy upper-cae unset-indent down-1">
          {i.status == 'pending' && <span className="pd-10 rad-unset bg-faded-1 px10  black bold bd-faded monR centered c-pointer inline-b mgl-10 mgt-10 my-down-1 px9" id={'aut'+i.id} onClick={() => {transferRequest({name:i.name, account_number:i.account_number, bank_code:i.bank_code, amount:i.amount}, i.id)}}> <i className="fas fa-money-bill-transfer"></i> </span>}
          {i.status == 'pending' && <span className="pd-10 rad-unset bg-faded-1 px10  black bold bd-faded monR centered c-pointer inline-b mgl-10 mgt-10 my-down-1 px9" onClick={() => {setManual(`man_${i.id}`)}} title="I have transfered Manually"> <i className="fas fa-check"></i> </span>  }
          {/* {i.status == 'done' && <span className="pd-10 rad-unset bg-faded-1 px10  black bold bd-faded monR centered c-pointer inline-b mgl-10 mgt-10 my-down-1 px9" id={"del" + i.id} onClick={() => {deleteRequest(i.id)}}> Delete </span> } */}
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
 
export default WithRequests;