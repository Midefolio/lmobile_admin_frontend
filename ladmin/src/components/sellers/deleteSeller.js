import {useContext} from 'react';
import { AdminContext } from "../../context/admincontext";
import useApi from '../../hooks/useApi';
import useUtils from '../../utils/useUtils';


const DeleteSeller = ({setDeleteSeller, i}) => {
 const {requestMaker} = useApi();
 const {isPending, setToast} = useUtils();
 const {token, getSellers} = useContext(AdminContext)

 const DeleteSellerHander = async () => {
  const params = {token, id:i?.id,  action:'delete_seller'}
  isPending('delete_item_btn', true);
  const res = await requestMaker('admin/seller', params);
  if(res?.status === 'successful'){
   await getSellers(token)
   isPending('delete_item_btn', 'Yes');
   setToast('User deleted successfully !');
  }else {
   isPending('delete_item_btn', 'Yes');
   setToast('There Was an Error deleteing Item. Please try again later');
  }
 }


 return ( <>
  <div className="add-item-modal">
   <div className="pop-up-modal">
    <div className="my-col-10 off-1 down-5">
     <div className="mother bd-bottom px13 bold"><span>Delete Seller</span></div>
     <div className="mother down-5"><span className="px13 faded">Are you sure you want to delete <span className="color-code-1 bold">{i.name}</span> ?</span></div>
     <div className="mother down-5">
      <span className="my-btn-sm bg-color-code-1 white" id="delete_item_btn" onClick={DeleteSellerHander}>Yes</span>
      <span className="my-btn-sm mgl-10 bg-color-code-2 color-code-1"  onClick={()=> {setDeleteSeller(null)}}>No</span>
     </div>
    </div>
   </div>
  </div>
 </> );
}
 
export default DeleteSeller;