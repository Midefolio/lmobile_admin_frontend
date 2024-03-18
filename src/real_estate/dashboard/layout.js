import {AiOutlineBell, AiOutlineHome, AiOutlinePlus, AiOutlineSetting } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useContext } from "react";
// import { AuthContext } from "../../context/authcontex";
// import { EstateContext } from "../../context/estate_context";

const Layout = ({active}) => {
  // const { getSummary } = useContext(EstateContext);
  const history = useHistory();

  return ( <>
    <div className="side-bar">
      <div className="my-col-10 off-1 dow-60">
        <span className={`side-bar-icons ${active === 'home' && 'black fas fa-shake'} `}  onClick={()=> {history.push('/dashboard')}}><AiOutlineHome/></span>
        <span className={`side-bar-icons ${active === 'post' && 'black fas fa-shake'} `} onClick={()=> {history.push('/dashboard/post')}}><AiOutlinePlus/></span>
        <span className={`side-bar-icons ${active === 'settings' && 'black fas fa-spin'} `} onClick={()=> {history.push('/dashboard/settings')}}><AiOutlineSetting/></span>
        <span className={`side-bar-icons ${active === 'notification' && 'black'} `}><AiOutlineBell/></span>
      </div>
    </div>

  
  </> );
}
 
export default Layout;