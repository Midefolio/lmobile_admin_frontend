import { useState, useEffect, useRef } from 'react';
import {AiOutlineLock} from 'react-icons/ai';
import useUtils from '../../utils/useUtils';
import useApi from '../../hooks/useApi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const StepTwoAuth = ({seePassword, loginParams, setTwoStepAuth}) => {
const [sessionParams, setSessionParams] = useState({passcode:"", email:loginParams?.email, action:"Create_Session"})
const [timeOut, setTimeOut] = useState(false);
const [timeLeft, setTimeLeft] = useState(60);
const timerIdRef = useRef();
const passcodeRef = useRef();
const {isPending, setToast} = useUtils();
const {requestMaker} = useApi();
const history = useHistory()

useEffect(() => {
 if (timeLeft === 0) {
   clearInterval(timerIdRef.current);
   setTimeOut(true)
 }   
}, [timeLeft]);



const formatTime = (time) => {
 const minutes = Math.floor(time / 60);
 const seconds = time % 60;
 return `${seconds.toString().padStart(2, '0')}` ;
};

const tick = () => {
 setTimeLeft((timeLeft) => timeLeft - 1);
};

useEffect(() => {
 timerIdRef.current = setInterval(tick, 1000);
 return () => clearInterval(timerIdRef.current);
}, []);

const resendPasscodeHandler = async ()=> {
 isPending('resend_code_btn', true)
 const res = await requestMaker('auth/login', loginParams);
 if(res?.status === 'successful'){
  isPending('resend_code_btn', 'Resend Code');
  setTimeOut(false);
  setTimeLeft(60);
  timerIdRef.current = setInterval(tick, 1000);
 }else {
  isPending('resend_code_btn', 'Resend Code'); isPending('resend_code_btn', 'Resend Code');
 }
}

const submitPasscodeHandler = async() => {
 if(sessionParams?.passcode.trim() === ''){
  setToast('Please enter passcode to continue')
  passcodeRef.current.focus();
  return;
 }
 isPending('submit_passcode_btn', true);
 const res = await requestMaker('auth/session', sessionParams);
 if(res?.status === 'successful'){
  isPending('submit_passcode_btn', "Submit");
  localStorage.setItem('lmobileToken', res?.data);
  history.push('/applications')
 }else {
  isPending('submit_passcode_btn', "Submit");
 }
}


















 return ( <>
   <div className="my-col-4 off-4 bg-white down-10 my-bottom-50">
   <div className="my-col-10 off-1 down-8"> 
    <div><b>Two-Step Auth</b></div>
    <div className='faded mother down-1'><span className='px13'>Please enter passcode in  <span className='color-code-1'> 0:{formatTime(timeLeft)} min</span>  </span></div>
    {timeOut?<div className='mother down-5'>
    <span className='px13'>Passcode TimeOut !  <br />  <br /><span className='my-btn-sm bg-color-code-1 white c-pointer' id='resend_code_btn' onClick={resendPasscodeHandler}>Resend code</span></span>
   </div>: <div className="mother down-2">
     <div  className="mother down-4">
     <div className="faded my-col-6">
       <div className="my-col-1">
       <span className="color-code-1"><AiOutlineLock/></span>
       </div>
       <div className="my-col-10">
       <span className="mgl-10 px13">Passcode</span>
       <span className="pd-5 mgl-10 c-pointer"  onClick={()=> {seePassword('passcode', 'seePasscode-icon')}}><i className="fas fa-eye px13 faded" id="seePasscode-icon"></i></span>
       </div>
      </div>
      <div className="mother down-1"><input ref={passcodeRef} type="number" maxLength={6} id="passcode" className="input" value={sessionParams?.passcode}  onChange={(e)=> {setSessionParams(prev => ({...prev, passcode:e.target.value}))}}/></div>
     </div>
     <div className="mother down-5"><span className="submit-btn bg-color-code-1" id='submit_passcode_btn' onClick={submitPasscodeHandler}>Submit</span></div>
     <div className="my-col-12 down-3 centered"><span className="pd-5 c-pointer color-code-1 my-btn-sm px13" onClick={()=> {setTwoStepAuth(false)}}>Didn't receive any code ?</span></div>
    </div>}
   </div>
  </div>
 </>  );
}
 
export default StepTwoAuth;