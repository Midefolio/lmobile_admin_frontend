import useApi from "../../../hooks/useApi";
import useUtils from "../../../utils/useUtils";

const Deleteitem = ({setDeleteItem, item, main_cat, getitems, under_main_cat}) => {
 const {requestMaker} = useApi();
 const {isPending, setToast} = useUtils();
 const token = localStorage.getItem('lmobileToken');

 const deleteItemHander = async () => {
  const imArr = [item.image_1, item.image_2, item.image_3]
  const images = JSON.stringify(imArr);
  const params = {token, item_id:item?.item_id, images:images, action:'delete_item'}
  isPending('delete_item_btn', true);
  const res = await requestMaker('/product/additem', params);
  if(res?.status === 'successful'){
   await getitems(token, main_cat, under_main_cat)
   isPending('delete_item_btn', 'Yes');
   setToast('Item deleted successfully !');
  }else {
   isPending('delete_item_btn', 'Yes');
   setToast('There Was an Error deleteing Item. Please try again later');
  }
 }


 return ( <>
  <div className="add-item-modal">
   <div className="pop-up-modal">
    <div className="my-col-10 off-1 down-5">
     <div className="mother bd-bottom px13 bold"><span>Delete Item</span></div>
     <div className="mother down-5"><span className="px13 faded">Are you sure you want to delete this Item <span className="color-code-1 bold">{item.name}</span> ?</span></div>
     <div className="mother down-5">
      <span className="my-btn-sm bg-color-code-1 white c-pointer" id="delete_item_btn" onClick={deleteItemHander}>Yes</span>
      <span className="my-btn-sm bg-faded mgl-10 black c-pointer"  onClick={()=> {setDeleteItem(null)}}>No</span>
     </div>
    </div>
   </div>
  </div>
 </> );
}
 
export default Deleteitem;