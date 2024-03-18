import {useContext} from 'react';
import { AdminContext } from "../../context/admincontext";
import useApi from '../../hooks/useApi';
import useUtils from '../../utils/useUtils';


const BlockUser = ({setBlockUser, i}) => {
 const {requestMaker} = useApi();
 const {isPending, setToast} = useUtils();
 const {token, getUsers} = useContext(AdminContext)

 const BlockUserHander = async () => {
  const params = {token, id:i?.id,  action:'block_user'}
  isPending('delete_item_btn', true);
  const res = await requestMaker('admin/users', params);
  if(res?.status === 'successful'){
   await getUsers(token)
   isPending('delete_item_btn', 'Yes');
   setToast('User deleted successfully !');
   setBlockUser(false);
  }else {
   isPending('delete_item_btn', 'Yes');
   setToast('There Was an Error deleteing Item. Please try again later');
  }
 }

 const UnBlockUserHander = async () => {
  const params = {token, id:i?.id,  action:'unblock_user'}
  isPending('delete_item_btn', true);
  const res = await requestMaker('admin/users', params);
  if(res?.status === 'successful'){
   await getUsers(token)
   isPending('delete_item_btn', 'Yes');
   setToast('User deleted successfully !');
   setBlockUser(false);
  }else {
   isPending('delete_item_btn', 'Yes');
   setToast('There Was an Error deleteing Item. Please try again later');
  }
 }


 return ( <>
  <div className="add-item-modal">
   <div className="pop-up-modal">
    <div className="my-col-10 off-1 down-5">
     <div className="mother bd-bottom px13 bold"><span>User Access</span></div>
      {i.isBlocked == '0' &&  <div className="mother down-5"><span className="px13 faded">Are you sure you want to block <span className="color-code-1 bold">{i.name}</span> ?</span></div> }
      {i.isBlocked == '1' &&  <div className="mother down-5"><span className="px13 faded">Are you sure you want to Unblock <span className="color-code-1 bold">{i.name}</span> ?</span></div> }
     <div className="mother down-5">
      {i.isBlocked == '0' &&  <span className="my-btn-sm bg-color-code-1 white" id="delete_item_btn" onClick={BlockUserHander}>Yes</span>}
      {i.isBlocked == "1" &&  <span className="my-btn-sm bg-color-code-1 white" id="delete_item_btn" onClick={UnBlockUserHander}>Yes</span>}
      <span className="my-btn-sm bg-faded mgl-10 black"  onClick={()=> {setBlockUser(null)}}>No</span>
     </div>
    </div>
   </div>
  </div>
 </> );
}
 
export default BlockUser;