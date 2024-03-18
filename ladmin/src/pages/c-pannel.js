import { useContext, useEffect } from "react";
import SideBar from "../components/c-pannel/sidebar";
import Dashboard from "../components/c-pannel/dashboard";
import { AuthContext } from "../context/authcontext";

const Cpannel = () => {
 const {current} = useContext(AuthContext);
 useEffect(()=> {
  document.title = 'L-Mobile ~ c-pannel'
  // document.body.style.background = '#f3f3f3';
  return(()=> {document.body.style.backgroundColor='white'})
 })


 return ( <>
   <div className="mother">
    <SideBar current={current}/>
    <Dashboard current={current}/>
   </div>
 </> );
}
 
export default Cpannel;