import { useEffect, useRef, useState } from "react";
import useUtils from "../utils/useUtils";
import StepOneAuth from "../components/Login/stepOneAuth";
import StepTwoAuth from "../components/Login/stepTwoAuth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AdminLogin = () => {
 const {seePassword, setToast} = useUtils()
 const [loginParams, setLoginParams] = useState({email: "", password:"", action:"Generate_Auth_Code"})
 const [TwoStepAuth, setTwoStepAuth] = useState(false); 
 const history = useHistory();
 
 useEffect(()=> {
  document.title = 'L-Mobile ~ Admin Login'
  document.body.style.background = '#f3f3f3'
  return(()=> {document.body.style.backgroundColor='white'})
 })

 const RediretHandler =()=> {
  const token = localStorage.getItem('lmobileToken');
  if(token){
   history.push('/applications')   // redirect to c-pannel
  }else{
   history.push('/');  // redirect to login
  }
 }
 
 useEffect(()=> {
  RediretHandler();
 }, [])


 return ( <>
 {/* <nav><span className="logo">L - Mobile</span></nav> */}
 {TwoStepAuth? <StepTwoAuth setTwoStepAuth={setTwoStepAuth} loginParams={loginParams} seePassword={seePassword}/>: <StepOneAuth setTwoStepAuth={setTwoStepAuth} seePassword={seePassword} loginParams={loginParams} setLoginParams={setLoginParams} /> }
 </> );
}
 
export default AdminLogin;