import {useContext} from 'react';
import { AdminContext } from "../../context/admincontext";
import useApi from '../../hooks/useApi';
import useUtils from '../../utils/useUtils';


const ConfirmDelivery = ({setConfirm, i}) => {
 const {requestMaker} = useApi();
 const {isPending, setToast} = useUtils();
 const {token, getReferers} = useContext(AdminContext)


 return ( <>
  <div className="add-item-modal">
   <div className="pop-up-modal">
    <div className="my-col-10 off-1 down-5">
     <div className="mother bd-bottom px13 bold"><span>Confirm Delivery</span></div>
      <div className="mother down-5"><span className="px13 faded">Are you sure delivery has been confirmed by the buyer ? </span> </div>
       <div className='mother down-5'>
        <span className='my-btn-sm bg-color-code-1 white px13'>Yes</span>
        <span className='my-btn-sm bg-color-code-2 color-code-1 px13 mgl-10' onClick={()=> {setConfirm(null)}}>Cancle</span>
       </div>
     </div>
    </div>
   </div>
 </> );
}
 
export default ConfirmDelivery;