import { useContext, useState } from "react";
import { AiOutlineAppstore, AiOutlineDashboard, AiOutlineLoading, AiOutlineLogout, AiOutlineSetting, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUsergroupAdd } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../../context/authcontext";
import Logout from "../Login/logout";

const SideBar = ({}) => {
const history = useHistory()
const {LogoutHandler, current} = useContext(AuthContext);
const [logout, setLogout] = useState(false)

 const dropDownHandler =(sub, arr)=> {
  var y = document.getElementById(sub)
  var arrow = document.getElementById(arr)
 if(arrow.classList.contains('rotate')){
  arrow.classList.remove('rotate');
   y.style.display = 'none'
  }else {
   arrow.classList.add('rotate');
   y.style.display = 'block'
 }
}

 return ( <>
 {logout && <Logout LogoutHandler={LogoutHandler} setLogout={setLogout} />}
 <nav className="c-pannel-nav">
  <div className="my-container down-1">
   <div className="my-col-12 down-1">
    {/* <span className="fl-right c-pointer my-btn-sm color-code-1" title="Logout" onClick={()=> {setLogout(true)}}><i className="fas fa-sign-out-alt"></i></span> */}
   </div>
  </div>
 </nav>
 <div className="side-bar my-col-2">
  <div className="my-col-10 off-1 down-20">
   <div className="my-bottom-10 my-container"><span className="alice bold">L-MOBILE <span className="color-code-1 px10 ">Grocery</span></span></div>
   <div className="mother down-20 alice">
   <div className="side-bar-links down-30  bd-botto" onClick={()=> {history.push('/c-panel')}}>
    <div className="my-col-2 down-2"><span className="icons px20"><AiOutlineDashboard/></span></div>
    <div className="my-col-6"><span className=" monR px13 bold">Dashboard</span></div>
   </div>
   {/* <div className="side-bar-links down-5 bd-botto">
    <div className="my-col-2 down-4"><span className="icons px20"><AiOutlineShopping/></span></div>
    <div className="my-col-10 down-1">
     <span className=" ">Manage Products</span>
   </div>
   </div> */}
   {/* <div className="side-bar-links down-5  bd-botto down">
    <div className="my-col-2 down-2"><span className="icons px20"><AiOutlineUsergroupAdd/></span></div>
    <div className="my-col-10">
     <span className=" ">Manage Users</span>
   </div>
   </div>  */}
   <div className="side-bar-links down-5  bd-botto" onClick={()=> {history.push('/c-panel/orders')}}>
    <div className="my-col-2 down-2"><span className="icons px20"><AiOutlineShoppingCart/></span></div>
    <div className="my-col-10 px13 bold monR">Manage Orders</div>
   </div>
   <div className="side-bar-links down-5  bd-botto" onClick={()=> {history.push('/settings')}}>
    <div className="my-col-2 down-2"><span className="icons px20"><AiOutlineSetting/></span></div>
    <div className="my-col-10 px13 monR bold">Account Settings</div>
   </div>
   <div className="side-bar-links down-5  bd-botto" onClick={()=> {history.push('/applications')}}>
    <div className="my-col-2 down-2"><span className="icons px20"><AiOutlineAppstore/></span></div>
    <div className="my-col-10 px13 monR bold">Switch Applications</div>
   </div>
   <div className="side-bar-links down-20  bg-faded-2 white bd-botto" onClick={()=> {setLogout(true)}}>
    <div className="my-col-2 down-2"><span className="icons white px20"><AiOutlineLogout/></span></div>
    <div className="my-col-10">Logout</div>
   </div>

   




   <div className="mother down-50">
    <span><i className="fab pd-5 bg-color-code-2 color-code-1 fa-facebook brad"></i></span>
    <span><i className="fab pd-5 bg-color-code-2 color-code-1 fa-instagram mgl-10 brad"></i></span>
    <span><i className="fab pd-5 bg-color-code-2 color-code-1 fa-twitter mgl-10 brad"></i></span>
    <div className="mother down-10">
     <span className="pd-5 c-pointer px13 color-code-1">Home</span>|
     <span className="pd-5 c-pointer px13 color-code-1">About</span>|
     <span className="pd-5 c-pointer px13 color-code-1">Terms</span>|
   </div>
   </div>
   </div>
  </div>
 </div>


 </> );
}
 
export default SideBar;