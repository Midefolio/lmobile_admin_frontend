import {AiOutlineLock, AiOutlineMail} from 'react-icons/ai';
import useUtils from '../../utils/useUtils';
import { useRef } from 'react';
import useApi from '../../hooks/useApi';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
const StepOneAuth = ({setLoginParams, setTwoStepAuth, loginParams,  seePassword}) => {
 const {isPending, setToast} = useUtils();
 const {requestMaker} = useApi();
 const emailRef = useRef()
 const passwordRef = useRef()
 const history = useHistory() 

 const Login = async () => {
  if(loginParams?.email.trim() === ""){
   emailRef.current.focus();
   setToast('Email Field Is Required!');
   return;
  }
  if(!loginParams.email.includes('@')){
   emailRef.current.focus();
   setToast('Invalid Email Format');
   return;
  }
  if(loginParams?.password.trim() === ""){
   passwordRef.current.focus();
   setToast('Password Field Is Required!');
   return;
  }
  isPending('login_btn', true);
  const res = await requestMaker('auth/login', loginParams);
  if(res?.status === 'successful'){
   isPending('login_btn', 'Login');
   if(res?.tsa === true){
    setTwoStepAuth(true);
   }else {
    localStorage.setItem('lmobileToken', res?.data);
    history.push('/applications')
   }
  }else {
   isPending('login_btn', 'Login');
  }
 }





 
 return ( <>
   <div className="my-col-4 xs-10 xs-off-1 xs-down-20 off-4 bg-white down-10 my-bottom-50">
   <div className="my-col-10 off-1 xs-10 xs-off-1 xs-down-10 down-8"> 
    <div><b>Admin Login</b></div>
    <div className='faded mother down-1'><span className='px13'>Please enter correct credentials </span></div>
    <div className="mother down-4 xs-down-10">
     <div className="mother down-2">
      <div className="faded my-col-1">
       <div className="my-col-6 xs-1 down-5">
       <span className="color-code-1"><AiOutlineMail/></span>
       </div>
       <div className="xs-6 my-col-6 xs-top-1 top-2">
       <span className="mgl-10 px13 top-1">Email</span>
       </div>
      </div>
      <div className="mother down-1"><input type="text" ref={emailRef} value={loginParams?.email} onChange={(e)=> {setLoginParams(prev => ({...prev, email:e.target.value}))}} className="input" /></div>
     </div>
     <div  className="mother down-4 xs-down-5">
     <div className="faded my-col-6">
       <div className="my-col-1 xs-1">
       <span className="color-code-1"><AiOutlineLock/></span>
       </div>
       <div className="my-col-10 xs-10">
       <span className="mgl-10 px13">Password</span>
       <span className="pd-5 mgl-10 c-pointer" onClick={()=> {seePassword('password', 'see-icon')}}><i className="fas fa-eye px13 faded" id="see-icon"></i></span>
       </div>
      </div>
      <div className="mother down-1 xs-down-2"><input type="password" ref={passwordRef} id="password" className="input" value={loginParams?.password}  onChange={(e)=> {setLoginParams(prev => ({...prev, password:e.target.value}))}}/></div>
     </div>
     <div className="mother down-5 xs-down-5"><span className="submit-btn bg-color-code-1" id='login_btn' onClick={Login}>Login</span></div>
    </div>
    <div className="my-col-12 down-5 centered xs-down-5 xs-12"><span className="pd-5 c-pointer color-code-1 my-btn-sm px13">forgotten Password ?</span></div>
   </div>
  </div>
 </>  );
}
 
export default StepOneAuth;