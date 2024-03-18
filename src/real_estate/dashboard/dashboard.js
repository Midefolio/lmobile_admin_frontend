import { AiOutlineLogout } from "react-icons/ai";
import Layout from "./layout";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Fade from 'react-reveal';
import { EstateContext } from "../../context/estate_context";
import useUtils from "../../utils/useUtils";
import useApi from "../../hooks/useApi";
import Logout from "../components/logout";
import ProductSkeletal from "../../components/skeletals/prodskeletal";
import CatSkeleton from "../../components/skeletals/catskeleton";

const Dashboard = () => {
 const {logoutOut } = useContext(EstateContext);
 const history = useHistory();
 const [logout, setLogout] = useState(false);
 const { formatNumber } = useUtils()
 const { makeRequest } = useApi();
 const [summary, setSummary] = useState(null)
 const cancleLogout = () => {setLogout(false)};
 const nodetoken = localStorage.getItem('lm_node_jwt');
 const token = localStorage.getItem('lmobileToken')
 const abortController = useRef(new AbortController)


const getSummary = async () => { 
  const res = await makeRequest('get', `admin/get_prop_summary`, null, null, nodetoken, abortController);
  if(res?.message === 'done') {
   setSummary(res?.summary);
 }
}

useEffect(() => {
  if(token){
    getSummary()
  }else{
    history.push('/login');
  }
}, [token])


const memorisedData = useMemo(() => summary, [summary])




  return ( <>
  {logout && <Logout closeModal={cancleLogout} cb={logoutOut} />}
   <Layout active={'home'} />
   <div className="my-col-10 off-2">
    <div className="my-col-10 down-5">
      <div className="px20">
        <div className="my-col-7 bottom-bd">
          <div><h1>Welcome To Realestate Pannel</h1></div>
          <div className="my-mother top-1"><span className="px13 faded-2 quest">Buy, sell or rent properties</span></div>
        </div>
        <div className="my-col-5">
          <span className="fl-right pd-10" title="Logout" onClick={()=>{setLogout(true)}}><AiOutlineLogout/></span>
        </div>
      </div>
       
       {!memorisedData && <div className="my-mother down-3 xs-down-3"><CatSkeleton slideToShow={3} /></div>}
       {memorisedData &&    <Fade> <div className="my-mother down-6">
        <div className="das-params-con bd-r-active" onClick={()=>{history.push('/dashboard/properties/active')}}>
          <div className="my-col-10 off-1">
            <span className="color-green bold">Active <i className="fas fa-angle-right"></i></span>
            <div className="my-mother down-3 color-green">{memorisedData?.active}</div>
          </div>
        </div>
        <div className="das-params-con bd-r-reviewing" onClick={()=>{history.push('/dashboard/properties/pending')}}>
          <div className="my-col-10 off-1">
            <span className=" bold color-yellow">Reviewing <i className="fas fa-angle-right"></i></span>
            <div className="my-mother down-3 color-yellow">{memorisedData?.pending}</div>
          </div>
        </div>
        <div className="das-params-con bd-r-declined" onClick={()=>{history.push('/dashboard/properties/declined')}}>
          <div className="my-col-10 off-1">
            <span className=" bold red">Declined <i className="fas fa-angle-right"></i></span>
            <div className="my-mother down-3 red">{memorisedData?.declined}</div>
          </div>
        </div>
      </div> </Fade>}

      <div className="my-mother  down-5">
        <div className="my-col-3">
          <div className="">Current Users</div>
          <div className="my-mother down-5 c-pointer"><span className="pd-10 bg-faded color-code-1 px13" onClick={()=> {history.push('/d-pannel/Users')}}>View  <i className="fas fa-arrow-right mg-5"></i></span></div>
        </div>
        <div className="my-col-3">
          <div className="">Manage Category/Features</div>
          <div className="my-mother down-5 c-pointer"><span className="pd-10 bg-faded color-code-1 px13">View  <i className="fas fa-arrow-right mg-5"></i></span></div>
        </div>
        <div className="my-col-3">
          <div className="">Inspection Bookings:</div>
          <div className="my-mother down-5 c-pointer"><span className="pd-10 bg-faded color-code-1 px13">View <i className="fas mg-5 fa-arrow-right"></i></span></div>
        </div>
      </div>
      
      <div className="my-mother down-10"><span>What would you like to do today ?</span></div>
      <div className="my-mother down-2 entered">
        <span className="anchors bg-color-code-1 px13 white">Buy / Rent Properties</span>
        <span className="anchors bg-color-code-1 px13 white mg-10" onClick={()=>{history.push('/dashboard/post')}}>Sell / Rent Out Properties</span>
      </div>
    </div>
   </div>
  </> );
}
 
export default Dashboard;