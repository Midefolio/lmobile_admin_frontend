import { useContext } from "react";
import { AdminContext } from "../../context/admincontext";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { VariantContext } from "../../context/varientcontext";
import useUtils from "../../utils/useUtils";
import useApi from "../../hooks/useApi";

const AddDriver = ({setAdd}) => {
  const {getDrivers, token} = useContext(AdminContext);
  const {variants} = useContext(VariantContext)
  const {setToast, isPending} = useUtils();
  const {requestMaker} = useApi()
  const [param, setParams] = useState({
    firstname:"",
    lastname:"",
    gender:"",
    email:"",
    phone:"",
    location:"",
    address:"",
    guarantor:"",
    g_phone:"",
    g_email:"",
    salary:"",
    bank:"",
    account:"",
    token,
    action:'add_driver'
  });

  const fRef = useRef();
  const lRef = useRef();
  const gRef = useRef();
  const pRef = useRef();
  const eRef = useRef();
  const loRef = useRef();
  const guRef = useRef();
  const adRef = useRef();
  const gpRef = useRef();
  const sRef = useRef();
  const bkRef = useRef();
  const acRef = useRef();


  const submitHandler = async () => {
   if(param.firstname === ""){
    setToast('Please Enter Firstname');
    fRef.current.focus();
    return;
   }
   if(param.lastname === ""){
    setToast('Please Enter Lastname');
    lRef.current.focus();
    return;
   }
   if(param.gender === ""){
    setToast('Please Enter Gender');
    gRef.current.focus();
    return;
   }
   if(param.email === ""){
    setToast('Please Enter Email');
    eRef.current.focus();
    return;
   }
   if(param.phone === ""){
    setToast('Please Enter Phone Number');
    pRef.current.focus();
    return;
   }
   if(param.location === ""){
    setToast('Please Select Location');
    loRef.current.focus();
    return;
   }
   if(param.address === ""){
    setToast('Please Enter Adress');
    adRef.current.focus();
    return;
   }
   if(param.guarantor === ""){
    setToast("Please Enter Guarantor's name");
    gRef.current.focus();
    return;
   }
   if(param.g_phone === ""){
    setToast("Please Enter Guarantor's Phone Number");
    gpRef.current.focus();
    return;
   }
   if(param.salary === ""){
    setToast('Please Enter Salary');
    sRef.current.focus();
    return;
   }
   if(param.bank === ""){
    setToast('Please Enter Bank');
    bkRef.current.focus();
    return;
   }
   if(param.account === ""){
    setToast('Please Enter account number');
    acRef.current.focus();
    return;
   }

  isPending('add-dr', true);
  
  const res = await requestMaker('admin/drivers', param);
  if(res?.status === 'successful'){
    await getDrivers(token);
    setToast('Staff addition Successfull');
    isPending('add-dr', 'Save');
    setAdd(false)
  }else {
    isPending('add-dr', 'Save')
  } 

  }

  return ( <>
   <div className="add-item-modal">
    <div className="add-container in-ov-scroll">
      <div className="my-col-10 off-1 down-8">
        <div className="bd-bottom px10"><span className="bold upper-case">Add New Staffs</span> <span className="pd-5 fas fa-times fl-right px13 c-pointer" onClick={()=> {setAdd(null)}}></span></div>
        <div className="mother down-5">
            <div className="mother bd-bottom"><span className="px10 bold color-code-1 upper-case">STAFF'S Details</span></div>
          </div>
         <div className="mother down-5">
          <div className="mother down-1">
            <span className="px10">Firstname:</span>
            <div className="mother down-1"><input ref={fRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, firstname:e.target.value}))} /></div>
          </div>
          <div className="mother down-1">
            <span className="px10">Lastname:</span>
            <div className="mother down-1"><input ref={lRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, lastname:e.target.value}))} /></div>
          </div>
          <div className="mother down-1">
            <span className="px10">Gender:</span>
            <div className="mother down-1">
             <select ref={gRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, gender:e.target.value}))}>
              <option value="">...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
           </div>
          </div>
          <div className="mother down-1">
            <span className="px10">Email:</span>
            <div className="mother down-1"><input ref={eRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, email:e.target.value}))} /></div>
          </div>
          <div className="mother down-1">
            <span className="px10">Phone Number:</span>
            <div className="mother down-1"><input ref={pRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, phone:e.target.value}))} /></div>
          </div>
          <div className="mother down-1">
            <span className="px10">Location:</span>
            <div className="mother down-1">
             <select ref={loRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, location:e.target.value}))}>
             <option value="">...</option>
             {variants?.size?.map((i, index) => (
              <option value={i.value} key={index}>{i.value}</option>
            ))}
            </select>
          </div>
          </div>
          <div className="mother down-1">
            <span className="px10">Address:</span>
            <div className="mother down-1"><input ref={adRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, address:e.target.value}))} /></div>
          </div>
          <div className="mother down-5">
            <div className="mother bd-bottom"><span className="px10 bold color-code-1 upper-case">Guarantor's Details</span></div>
          </div>
          <div className="mother down-1">
            <span className="px10">Full Name:</span>
            <div className="mother down-1"><input ref={guRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, guarantor:e.target.value}))} /></div>
          </div>
          <div className="mother down-1">
            <span className="px10">Email:</span>
            <div className="mother down-1"><input type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, g_email:e.target.value}))} /></div>
          </div>
          <div className="mother down-1">
            <span className="px10">Phone Numer:</span>
            <div className="mother down-1"><input ref={gpRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, g_phone:e.target.value}))} /></div>
          </div>
          <div className="mother down-5">
            <div className="mother bd-bottom"><span className="px10 bold color-code-1 upper-case">Salary Details</span></div>
          </div>
          <div className="mother down-1">
            <span className="px10">Salary Amount (NGN):</span>
            <div className="mother down-1"><input ref={sRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, salary:e.target.value}))} /></div>
          </div>
          <div className="mother down-1">
            <span className="px10">Bank:</span>
            <div className="mother down-1"><input ref={bkRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, bank:e.target.value}))} /></div>
          </div>
          <div className="mother down-1">
            <span className="px10">Accoun Number:</span>
            <div className="mother down-1"><input ref={acRef} type="text" className="input px10" onChange={(e) => setParams(prev => ({...prev, account:e.target.value}))} /></div>
          </div>
          <div className="mother down-8">
            <span className="my-btn-sm px13 white bg-color-code-1 c-pointer" id="add-dr" onClick={submitHandler}>Save</span>
          </div>
          <div className="mother my-bottom-50"></div>
         </div>
      </div>
    </div>
   </div>
  </> );
}
 
export default AddDriver;