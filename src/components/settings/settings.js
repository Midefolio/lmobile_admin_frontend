import { useEffect, useState } from "react";
import SideBar from "../c-pannel/sidebar";
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";
import useApi from "../../hooks/useApi";
import MerchantTerms from "./merchantterms";
import GeneralTerms from "./generalterms";
import AgentTerms from "./agentterms";

const Settings = () => {
const [lines, setLines] = useState(false);
const [address, setAddress] = useState(false);
const [socials, setSocials] = useState(false);
const [openTerms, setOpenTerms] = useState(true);
const token = localStorage.getItem('lmobileToken');
const {requestMaker} = useApi();
const [setting, setSettings] = useState();
var x = 0;

const opnTerms =()=> {
  if(x == 0) {
    setOpenTerms(true)
    x = 1
  }else {
    setOpenTerms(false)
    x = 0
  }
} 

const getSettings = async () => {
  const params ={action:"get_settings", token}
  const res = await requestMaker('admin/setting', params);
  if(res?.status === 'successful') {
    setSettings(res?.data);
  }
}

useEffect(() => {
  if(token){
    getSettings();
  }
}, [])

const [general, setGeneral] = useState(false);
const [merchant, setMerchant] = useState(false);
const [agent, setAgent] = useState(false);


return ( <>
   <SideBar/>
  {general && <GeneralTerms setting={setting} getSettings={getSettings} setGeneral={setGeneral} />}
  {merchant && <MerchantTerms setting={setting} getSettings={getSettings} setMerchant={setMerchant} />}
  {agent && <AgentTerms setting={setting} getSettings={getSettings} setAgent={setAgent} />}
  
   
  <div className="my-col-10 off-2">
    <div className="my-col-10 off-1 down-5">
      <div className="mother bd-bottom"><span className="bold">Account Settings</span></div>
      <div className="my-col-11 down-3 pd-10 bg-faded faded px13 rad-unset c-pointer" onClick={opnTerms}><span>Terms and condictions <i className="fas fa-angle-down"></i></span></div>
      {openTerms &&  <div className="mother down-1">
       <div className="my-col-3 pd-10 mgt-10 px13 color-code-1 c-pointer" onClick={()=> {setGeneral(true)}}> <span> <i className="fas fa-arrow-right"></i> L-mobile gereral terms of use</span></div>
       <div className="my-col-3 pd-10 mgt-10 px13 color-code-1 c-pointer"  onClick={()=> {setMerchant(true)}}> <span> <i className="fas fa-arrow-right"></i> Terms and Condictions For Merchants</span></div>
       <div className="my-col-4 pd-10 mgt-10 px13 color-code-1 c-pointer"  onClick={()=> {setAgent(true)}}> <span> <i className="fas fa-arrow-right"></i> Terms and Condictions For Referers</span></div>
      </div>}
     
      
{/*       
      <div className="my-col-11 down-3 pd-10 bg-faded faded px13 rad-unset"><span>Customer / Products enquiry lines</span></div>
      <div className="my-col-11 down-3 pd-10 bg-faded faded px13 rad-unset"><span>Company Address</span></div>
      <div className="my-col-11 down-3 pd-10 bg-faded faded px13 rad-unset"><span>Social Media Handles</span></div> */}
    </div>
  </div>
  
  </> );
}
 
export default Settings;