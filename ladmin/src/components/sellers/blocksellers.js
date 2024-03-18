import {useContext} from 'react';
import { AdminContext } from "../../context/admincontext";
import useApi from '../../hooks/useApi';
import useUtils from '../../utils/useUtils';


const BlockSeller = ({setBlockSeller, i}) => {
 const {requestMaker} = useApi();
 const {isPending, setToast} = useUtils();
 const {token, getSellers} = useContext(AdminContext)

 const BlockSellerHander = async () => {
  const params = {token, id:i?.id,  action:'block_seller'}
  isPending('delete_item_btn', true);
  const res = await requestMaker('admin/seller', params);
  if(res?.status === 'successful'){
   await getSellers(token)
   isPending('delete_item_btn', 'Yes');
   setToast('User deleted successfully !');
   setBlockSeller(false);
  }else {
   isPending('delete_item_btn', 'Yes');
   setToast('There Was an Error deleteing Item. Please try again later');
  }
 }

 const UnBlockSellerHander = async () => {
  const params = {token, id:i?.id,  action:'unblock_seller'}
  isPending('delete_item_btn', true);
  const res = await requestMaker('admin/seller', params);
  if(res?.status === 'successful'){
   await getSellers(token)
   isPending('delete_item_btn', 'Yes');
   setToast('User deleted successfully !');
   setBlockSeller(false);
  }else {
   isPending('delete_item_btn', 'Yes');
   setToast('There Was an Error deleteing Item. Please try again later');
  }
 }


 return ( <>
  <div className="add-item-modal">
   <div className="pop-up-modal">
    <div className="my-col-10 off-1 down-5">
     <div className="mother bd-bottom px13 bold"><span>Seller Access</span></div>
      {i.isBlocked == '0' &&  <div className="mother down-5"><span className="px13 faded">Are you sure you want to block <span className="color-code-1 bold">{i.name}</span> ?</span></div> }
      {i.isBlocked == '1' &&  <div className="mother down-5"><span className="px13 faded">Are you sure you want to Unblock <span className="color-code-1 bold">{i.name}</span> ?</span></div> }
     <div className="mother down-5">
      {i.isBlocked == '0' &&  <span className="my-btn-sm bg-color-code-1 white" id="delete_item_btn" onClick={BlockSellerHander}>Yes</span>}
      {i.isBlocked == "1" &&  <span className="my-btn-sm bg-color-code-1 white" id="delete_item_btn" onClick={UnBlockSellerHander}>Yes</span>}
      <span className="my-btn-sm bg-color-code-2 color-code-1 mgl-10"  onClick={()=> {setBlockSeller(null)}}>No</span>
     </div>
    </div>
   </div>
  </div>
 </> );
}
 
export default BlockSeller;