import {useContext, useLayoutEffect, useRef, useState } from "react";
import Logout from "../components/Login/logout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useUtils from "../utils/useUtils";
import useApi from "../hooks/useApi";
import { EstateContext } from "../context/estate_context";
import { AiOutlineLoading } from "react-icons/ai";

const Applications = () => {
const { getNodeToken, isloading } = useContext(EstateContext);
const {setToast, isPending} = useUtils();
const {requestMaker} = useApi();
const token = localStorage.getItem('lmobileToken')
const currentRef = useRef();
const passwordRef = useRef();
const retypeRef = useRef();

  const RediretHandler =()=> {
    const token = localStorage.getItem('lmobileToken');
    if(token){
     history.push('/applications')   // redirect to applications
    }else{
     history.push('/');  // redirect to login
    }
   }
   
   useLayoutEffect(()=> {
    RediretHandler();
   }, [])


 const [isLogout, setIslogout] = useState(false);
 const history = useHistory();
 const LogoutHandler = async(Token) => {
  localStorage.removeItem('lmobileToken')
  history.push('/');
 }
 

 const [settings, setSettings] = useState(null)
 const [params, setParams] = useState({
  action:"update_pass",
  password:"",
  current:"",
  re_typed:"",
  token,
 })
 
 const updatePassHandler = async() => {
  if(params?.current === ""){
    setToast("Please enter current password");
    currentRef.current.focus();
    return;
  }
  if(params?.password === ""){
    setToast("Please enter New password");
    passwordRef.current.focus();
    return;
  }
  if(params?.re_typed === ""){
    setToast("Please retype password");
    retypeRef.current.focus();
    return;
  }
  if(params?.password !== params?.re_typed){
    setToast("Password does not match !");
    return;
  }
  isPending('pass', true);
  const res = await requestMaker('auth/settings', params);
  if(res?.status === 'successful'){
    setToast("Password Changed Successfully");
    setSettings(false)
  }else {
    isPending('pass', "Change");
  }
 }

  return ( <>
  {isLogout && <Logout LogoutHandler={LogoutHandler} setLogout={setIslogout}  />}
  {settings &&   <div className="add-item-modal" onClick={()=> {setSettings(false)}}>
    <div className="my-col-4 off-4 down-5 rad-10 my-bottom-50 bg-white" onClick={(e) => {e.stopPropagation()}}> 
     <div className="my-col-10 off-1 down-5">
      <div className="mother bd-bottom"><span className="px13 bold">Change Login Password</span></div>
      <div className="mother down-5">
        <div className="px10 faded">Current Pasword</div>
        <input ref={currentRef}  onChange={(e) => {setParams(prev => ({...prev, current:e.target.value}))}} type="password" className="input down-1" />
      </div>
      <div className="mother down-5">
        <div className="px10 faded">New Pasword</div>
        <input ref={passwordRef} onChange={(e) => {setParams(prev => ({...prev, password:e.target.value}))}} type="password" className="input down-1" />
      </div>
      <div className="mother down-5">
        <div className="px10 faded">Re-type Pasword</div>
        <input ref={retypeRef} onChange={(e) => {setParams(prev => ({...prev, re_typed:e.target.value}))}} type="password" className="input down-1" />
      </div>
      <div className="mother down-5">
        <button className="my-btn-sm mother centered bd-unset bg-color-code-1 white monR" onClick={updatePassHandler}>Change </button>
      </div>
     </div>
    </div>
  </div>}



   <div className="mother">
    <div className="my-col-10 xs-10 xs-off-1 xs-down-10 off-1 down-10">
      <div className="mother">
        <div className="mother">
          <span className="px30 bold xs-px20 ">Welcome To L-<span className="color-code-1">Mobile</span> <span className="px13 faded">(Admin)</span></span>
          <span className="px13 hidden-xs fl-right bold pd-10 bg-faded rad-unset c-pointer black" onClick={()=> {setSettings(true)}}> <i className="fas fa-cog"></i> Account Settings</span>
          <div className="xs-12 xs-down-5">
          <span className="px13 hidden-ls fl-rght bold pd-10 xs-px10 bg-faded rad-unset c-pointer black" onClick={()=> {setSettings(true)}}> <i className="fas fa-cog"></i> Account Settings</span>
          </div>
        </div>
      </div>
      <div className="mother xs-down-10 down-3"><span className="faded xs-px13">Please Select an Application to Manage</span></div>
      <div className="mother down-3 xs-down-4">
       <div className="my-col-4 xs-12 b-shadow" onClick={()=> {history?.push('/c-panel')}}>
        <div className="my-col-10 xs-10 xs-off-1 down-3 my-bottom-50 b-shad xs-down-10  bad bg-coor-code-2">
          <div className="my-col-10 off-1 down-10">
            <div><span className="px13 faded">Manage</span></div>
           <div className="mother down-2 xs-down-2"><span className="px20 bold">Grocery Market</span></div>
           <div className="mother down-2 color-code-1 xs-down-2"><span className="px13 bold">c-pannel</span></div>
          </div>
        </div>
       </div>
       <div className="my-col-4 xs-12 xs-down-5 b-rad b-shadow" onClick={() => {getNodeToken(token)}}>
        <div className="my-col-10 down-3 xs-10 xs-off-1 xs-down-10 my-bottom-50 b-shdow brad bg-coor-code-2">
          <div className="my-col-10 off-1 down-10">
            <div><span className="px13 faded">Manage</span></div>
           <div className="mother down-2 xs-down-2"><span className="px20 bold">Real-Estate Market  {isloading && <AiOutlineLoading className="fas fa-spin" />  } </span></div>
           <div className="mother down-2 color-code-1 xs-down-2"><span className="px13 bold">d-pannel</span></div>

          </div>
        </div>
       </div>
       <div className="my-col-4 xs-12 xs-down-5 b-shadow">
        <div className="my-col-10 down-3 xs-10 xs-off-1 xs-down-10 my-bottom-50 ">
          <div className="my-col-10 off-1 down-10">
            <div><span className="px13 faded">Manage</span></div>
           <div className="mother down-2 xs-down-2"><span className="px20 bold">HealthCare Market</span></div>
           <div className="mother down-2 color-code-1 xs-down-2"><span className="px13 bold">e-pannel</span></div>
          </div>
        </div>
       </div>
      </div>
     <div className="mother down-6 xs-down-10 my-bottom-50">
      <div><span onClick={()=> {setIslogout(true)}} className="my-btn-sm bg-cwhite px13  rad-10 pd-10 bg-color-code-1 white">Logout <i className="fa fa-angle-right"></i></span></div>
     </div>
    </div>
   </div>
  </> );
}
 
export default Applications;