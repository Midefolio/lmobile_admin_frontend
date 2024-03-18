import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useApi from "../../../hooks/useApi";
import useUtils from "../../../utils/useUtils";

const DeleteCat = ({setDeleteCat, category}) => {
 const {requestMaker} = useApi();
 const {isPending, setToast} = useUtils();
 const token = localStorage.getItem('lmobileToken');
 const history = useHistory();

 const deleteItemHander = async () => {
  const params = {token, id:category?.id, category:category.cat_name, action:'delete_cat'}
  isPending('delete_item_btn', true);
  const res = await requestMaker('/product/category', params);
  if(res?.status === 'successful'){
   history.push(`/c-panel/products/${category.main_Cat}`)
  }else {
   isPending('delete_item_btn', 'Save Item');
   setToast('There Was an Error deleteing Item. Please try again later');
  }
 }


 return ( <>
  <div className="add-item-modal fade-in">
   <div className="pop-up-modal">
    <div className="my-col-10 off-1 down-5">
     <div className="mother bd-bottom px13 bold"><span>Delete Category</span></div>
    <div className="mother down-5"><span className="px12 faded">All Products / sub-category under this Category will be deleted Permanently</span></div>
     <div className="mother down-5">
      <span className="my-btn-sm bg-color-code-1 white" id="delete_item_btn" onClick={deleteItemHander}>Yes</span>
      <span className="my-btn-sm bg-faded mgl-10 black"  onClick={()=> {setDeleteCat(false)}}>No</span>
     </div>
    </div>
   </div>
  </div>
 </> );
}
 
export default DeleteCat;