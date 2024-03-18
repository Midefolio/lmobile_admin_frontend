import { useContext,  useEffect,  useRef, useState } from "react";
import useUtils from "../../utils/useUtils";
import { EstateContext } from "../../context/estate_context";
import useApi from "../../hooks/useApi";

const ReviewProperties = ({i, setReview, getProperties}) => {
  const abortController = useRef(new AbortController)
  const nodetoken = localStorage.getItem('lm_node_jwt');
  const {formatNumber, setToast} = useUtils();
  const { makeRequest } = useApi();
  const { path } = useContext(EstateContext);
  const [isPending, setIsPending] = useState(null)
   const [propData, setpropData] = useState({
      user_id:i?.user_id,
      _id:i?._id,
      prop_name:i.name,
      reasons:i.reasons
   })

 const acceptProp = async () => {
  let url = `admin/acceptProp`;
  const cb =()=> {setIsPending(null)}
  setIsPending('accepting');
  const res = await makeRequest('post', url, propData, cb, nodetoken, abortController);
  if(res?.message === 'done'){
    await getProperties();
    setIsPending(null)
  }
 }

 const declineProp = async () => {
  let url = `admin/declineProp`;
  const cb =()=> {setIsPending(null)}
   if(propData?.reasons === "" ){
    setToast("Please state reasons for decline")
    return
   }
  setIsPending('decliining');
  const res = await makeRequest('post', url, propData, cb, nodetoken, abortController);
  if(res?.message === 'done'){
     await getProperties()
     setIsPending(null)
  }
 }
  

 useEffect(()=>{
  return() => {
    abortController?.current.abort();
  }
 }, [])

return ( <>
   <div className="my-modal"  onClick={()=> {setReview(null) }}>
        <div className="my-col-8 off-2 down-5 bg-white in-ov-scroll "  onClick={(e) => {e.stopPropagation(e)}}>
            <div className="my-col-10 off-1 down-3">
              <div className="my-mother bd-bottom"><p className="bold">Review Properties</p></div>
              
               <div className="my-mother down-2">
                <div className="bold px13 black">Name</div>
                 <div className="my-mother down-1 px13 faded">{i.name}</div>
               </div>
               <div className="my-mother down-2">
                <div className="bold px13 black">Title</div>
                 <div className="my-mother down-1 px13 faded">{i.title}</div>
               </div>
               <div className="my-mother down-2">
                <div className="bold px13 black">Category</div>
                 <div className="my-mother down-1">
                 {i.category.map((c, index) => (
                    <span className="pd-10 bg-faded mgl-5 px10" key={index + 'oeeoop'}>{c}</span>
                ))}
                 </div>
               </div>
               <div className="my-mother down-2">
                <div className="bold px13 black">Location</div>
                 <div className="my-mother down-1 px13 faded">{i.location.LGA}</div>
               </div>
               <div className="my-mother down-2">
                <div className="bold px13 black">Detailed Address</div>
                 <div className="my-mother down-1 px13 faded">{i.location.detailed_address}</div>
               </div>
               <div className="my-mother down-2">
                <div className="bold px13 black">Features</div>
                 <div className="my-mother down-1">
                 {i.features.map((c, index) => (
                    <span className="pd-10 bg-faded mgl-5 px10" key={index + 'ooffop'}>{c}</span>
                ))}
                 </div>
               </div>
              <div className="my-mother bd-bottom down-5"><span className="px13 bold">Price Details</span></div>
               <div className="my-col-2 down-2">
                <div><span className="px13 bold">First Year</span></div>
                <div className="my-mother down-1"><span className="px13 faded">NGN {formatNumber(i.price.first_year)}</span></div>
               </div>
               <div className="my-col-3 down-2">
                <div><span className="px13 bold">Subsequent Payment</span></div>
                <div className="my-mother down-1"><span className="px13 faded">NGN {formatNumber(i.price.subsequent)}</span></div>
               </div>
               <div className="my-col-2 down-2">
                <div><span className="px13 bold">isNegotiable</span></div>
                <div className="my-mother down-1"><span className="px13 faded"> {i.price.isNegotiable ===false 
                ?"False": "True"}</span></div>
               </div>
              <div className="my-mother bd-bottom down-5"><span className="px13 bold">Contact Details</span></div>
               <div className="my-col-2 down-2">
                <div><span className="px13 bold">Who's In-Charge</span></div>
                <div className="my-mother down-1"><span className="px13 faded">{i.contact_details.in_charge}</span></div>
               </div>
               <div className="my-col-3 down-2">
                <div><span className="px13 bold">Owner's Name</span></div>
                <div className="my-mother down-1"><span className="px13 faded">{i.contact_details.name}</span></div>
               </div>
               <div className="my-col-3 down-2">
                <div><span className="px13 bold">Owner's Name</span></div>
                <div className="my-mother down-1"><span className="px13 faded">{i.contact_details.whatsapp}</span></div>
               </div>
               <div className="my-col-3 down-2">
                <div><span className="px13 bold">Account Number</span></div>
                <div className="my-mother down-1"><span className="px13 faded">{i.contact_details.whatsapp} <span>Bank name</span></span></div>
               </div>
               <div className="my-mother down-5 my-bottom-50">
                 {i.images.map((c, index) => (
                  <div className="my-col-4" key={index + 'images'}><div className="rev-img-con"><img src={path + c} alt="" /></div></div>
                ))}
                 </div>
                    
                 <div className="my-mother my-bottom-50">
                  <div className="my-col-5">
                    <div><span className="px13 faded">select reasons for rejection</span></div>
                    <select name="" id="" value={propData?.reasons}   onChange={(e) => {setpropData(prev => ({...prev, reasons:e.target.value}))}} className="input down-2 bg-faded faded px13">
                      <option value="">Select</option>
                      <option value="Incorrect details">Incorrect Details</option>
                      <option value="Incorrect spellings">Incorrect spellings</option>
                      <option value="Use Appropriate Images">Use Appropriate Images</option>
                      <option value="Incorrect Contact Details">Incorrect Contact Details</option>
                      <option value="Property has another seller">Property has another seller</option>
                      <option value="Violation Of Terms">Violation Of terms</option>
                    </select>
                  </div>


                  <div className="my-mother down-5"> 
                    {i.status !== 'active' &&  <span className="my-btn-sm bg-green white px13" onClick={acceptProp}>{isPending === 'accepting' ? <i className="fas fa-spinner fa-spin"></i> : "Accept"}</span> }
                    <span className="my-btn-sm bg-color-code-1 white px13 mgl-10" onClick={declineProp}>Reject</span>
                  </div>
                 </div>
            </div>
        </div>
      </div>
    </>  );
}
 
export default ReviewProperties;