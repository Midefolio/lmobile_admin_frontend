import {useContext} from 'react';
import { AdminContext } from "../../context/admincontext";
import useApi from '../../hooks/useApi';
import useUtils from '../../utils/useUtils';


const DeleteDriver = ({setDeleteDriver, i}) => {
 const {requestMaker} = useApi();
 const {isPending, setToast} = useUtils();
 const {token, getDrivers} = useContext(AdminContext)

 const DeleteDriverHander = async () => {
  const params = {token, id:i?.id,  action:'delete_driver'}
  isPending('delete_item_btn', true);
  const res = await requestMaker('admin/drivers', params);
  if(res?.status === 'successful'){
   await getDrivers(token)
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
     <div className="mother bd-bottom px13 bold"><span>Delete Personnel</span></div>
     <div className="mother down-5"><span className="px13 faded">Are you sure you want to delete <span className="color-code-1 bold">{i.firstname}</span> ?</span></div>
     <div className="mother down-5">
      <span className="my-btn-sm bg-color-code-1 white" id="delete_item_btn" onClick={DeleteDriverHander}>Yes</span>
      <span className="my-btn-sm mgl-10 bg-color-code-2 color-code-1"  onClick={()=> {setDeleteDriver(null)}}>No</span>
     </div>
    </div>
   </div>
  </div>
 </> );
}
 
export default DeleteDriver;