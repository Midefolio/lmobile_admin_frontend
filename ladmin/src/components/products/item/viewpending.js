import { useEffect, useRef, useContext,  useState } from "react";
import useUtils from "../../../utils/useUtils";
import useApi from "../../../hooks/useApi";
import { VariantContext } from "../../../context/varientcontext";
import { ItemsContext } from "../../../context/itemcontext";

const ViewPending = ({item, getitems, setEditItem}) => {
 const token = localStorage.getItem('lmobileToken');
 const {requestMaker} = useApi()
 const {clickHandler, setToast, isPending, makeid} = useUtils();
 const [variation, setVariation] = useState(false);
 const [isLoading, setIsLoading] = useState(null);
 const {sub_cat, location} = useContext(ItemsContext);
 const nameRef = useRef()
 const subRef = useRef()
 const priceRef = useRef()
 const ratRef = useRef();
 const path = 'https://lmobileapi.000webhostapp.com/images/';
 const [saveChanges, setSaveChanges] = useState(false);
 const [openSave, setOpenSave] = useState(false)

 const {getVariants, variants} = useContext(VariantContext)

 const [preview, setPreview] = useState({
  'image_1':null,
  'image_2':null,
  'image_3':null
 });


 const [variations, setVariations] = useState([])

 const [items, setitems] = useState({
  image_1:"",
  image_2:"",
  image_3:"",
  item_id:"",
  item_name:"",
  main_cat:"",
  category:"",
  sub_cat:"",
  price:"",
  availability:"1",
  slash_price:"",
  status:"",
  description:"",
  ratings:"",
  weight:"",
  phone:"",
  review_status:"",
  reasons:"",
  variations:[],
  token:token
 });

 useEffect(() => {
  if(item){
   setitems(item)
   setPreview(prev =>  ({...prev, 
    image_1:item.image_1 === ""? null : path + item.image_1, 
    image_2:item.image_2 === ""? null : path + item.image_2, 
    image_3:item.image_3 === ""? null : path + item.image_3,
  }));
  const variationss = JSON.parse(item?.variations);
  setVariations(variationss)
  }
 }, [])

  const saveItemHandler = async(action, btn) => {
   items['action'] = action;
   items['token'] = token;
   isPending(btn, true);
   const res = await requestMaker('/product/review', items);
   if(res?.status === 'successful'){
   await getitems(token);
   setToast('Item Review successfully !');
   setEditItem(false);
  }else {
   setToast('There Was an Error Reviewing Item. Please try again later');
   isPending(btn, "Send Review");
  }
 }


 return ( <>
 <div className="add-item-modal fade-in">
  <div className="add-container w-50 in-ov-scroll fade-in">
   <div className="my-col-10 off-1 down-3">
    <div className="mother bd-bottom">
     <span className="px13 bold">New Item</span>
     <span className="my-btn-s fl-right px13 pd-5 top-1 c-pointer" onClick={()=> {setEditItem(null)}}><i className="fas fa-times"></i></span>
   </div>
   <div className="mother down-3">
    <div className="mother down-1">
     <span className="px10">Item Name</span>
     <div className="mother"><input readOnly type="text" maxLength={50} ref={nameRef} value={items?.item_name} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, item_name:e.target.value}))}} className="bg-white bd-unset bold Quest px10 readOnly px10" /></div>
   </div>
   <div className="mother down-1">
     <span className="px10">Item Description</span>
     <div className="mother"><input readOnly  ref={ratRef} type="text" maxLength={100} placeholder="e.g Gucci, lois Viton"  value={items?.description} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, description:e.target.value}))}} className="bg-white bd-unset bold Quest px10 readOnly px10" /></div>
   </div>
   <div className="mother down-1">
     <span className="px10">Item Category</span>
     <div className="mother"><input readOnly  ref={ratRef} type="text" maxLength={100} placeholder="e.g Gucci, lois Viton"  value={items?.category} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, description:e.target.value}))}} className="bg-white bd-unset bold Quest px10 readOnly px10" /></div>
   </div>
   <div className="mother down-1">
     <span className="px10">Sub - Category</span>
     <div className="mother"><input readOnly  ref={ratRef} type="text" maxLength={100} placeholder="e.g Gucci, lois Viton"  value={items?.sub_cat} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, description:e.target.value}))}} className="bg-white bd-unset bold Quest px10 readOnly px10" /></div>
   </div>
   <div className="mother down-1">
     <span className="px10">Price</span>
     <div className="mother"><input readOnly min={0} ref={priceRef} type="number" value={items?.price} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, price:e.target.value}))}} className="bg-white bd-unset bold Quest px10 readOnly px10" /></div>
   </div>
   <div className="mother down-1">
     <span className="px10">Slash Price (Optional)</span>
     <div className="mother"><input readOnly min={0} type="number" value={items?.slash_price} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, slash_price:e.target.value}))}} className="bg-white bd-unset bold Quest px10 readOnly px10" /></div>
   </div> 
    <div className="mother down-1">
     <span className="px10">Ratings <i className="fas fa-star px10 color-code-1"></i> </span>
     <div className="mother">
      <input readOnly  type="number" value={items?.ratings} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, ratings:e.target.value}))}} className="bg-white bd-unset bold Quest px10 readOnly px10" id=""/>
     </div>
   </div>
   <div className="mother down-1">
     <span className="px10">Weight (Kg)</span>
     <div className="mother">
      <input readOnly  type="number" value={items?.weight} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, weight:e.target.value}))}} className="bg-white bd-unset bold Quest px10 readOnly px10" id=""/>
     </div>
   </div>
   <div className="mother down-1">
     <span className="px10">Enquiry Contact</span>
     <div className="mother">
      <input readOnly  type="number" value={items?.phone} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, phone:e.target.value}))}} className="bg-white bd-unset bold Quest px10 readOnly px10" id=""/>
     </div>
   </div>
 < div className="my-col-10 down-3">
  <div><span className="px10"> Item images</span></div>
 <div className="my-col-4 down-2">
  <input readOnly type="file" accept=".jpg,.jpeg,.png" id='upload-pp_2' hidden />
   <div className="upload-cat-img-container img-container">
    <div className="scarf"> 
     {isLoading === 'uploading' && <i className="fas fa-spinner fa-pulse px13"></i>}
     {isLoading === 'change' && <i className="fas fa-image px13"></i>}
      </div>
     {preview.image_1?  <img src={preview?.image_1} alt="" />: <i className="fas fa-image px13"></i>}
     </div>
   </div>
     <div className="my-col-4 down-2">
     <input readOnly type="file" accept=".jpg,.jpeg,.png" id='upload-pp_1' hidden />
     <div className="upload-cat-img-container img-container">
          <div className="scarf"> 
          {isLoading === 'uploading' && <i className="fas fa-spinner fa-pulse px13"></i>}
          {isLoading === 'change' && <i className="fas fa-image px13"></i>}
           </div>
          {preview.image_2 ?  <img src={preview.image_2} alt="" />: <i className="fas fa-image px13"></i>}
         </div>
     </div>
     <div className="my-col-4 down-2">
     <input readOnly type="file" accept=".jpg,.jpeg,.png" id='upload-pp_3' hidden />
     <div className="upload-cat-img-container img-container">
          <div className="scarf"> 
          {isLoading === 'uploading' && <i className="fas fa-spinner fa-pulse px13"></i>}
          {isLoading === 'change' && <i className="fas fa-image px13"></i>}
           </div>
          {preview.image_3?  <img src={preview.image_3} alt="" />: <i className="fas fa-image px13"></i>}
         </div>
     </div>
 </div>

 <div className="mother bd-bottom down-10"><span className="px10 bold">Available locations </span></div>
 <div className="mother down-2">
 {variations?.map((i, index) => (
 <span className="bg-color-code-2 rad-unset mgl-5 c-pointer down-1 px10 color-code-1 pd-5">{i.location}</span>
))}
 </div>
 <div className="mother down-5">
     <span className="px10">Review Status</span>
     <div className="mother">
      <select  type="number" value={items?.review_status} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, review_status:e.target.value}))}} className="input px10" id="">
       <option value="">Pending</option>
       <option value="1">Accept</option>
       <option value="2">Reject</option>
      </select>
     </div>
   </div>
   {items?.review_status == '2' && <div className="mother down-1">
     <span className="px10">Reason for Rejection</span>
     <div className="mother">
      <input  type="text" maxLength={100} value={items?.reasons} onChange={(e)=>{setOpenSave(true); setitems(prev => ({...prev, reasons:e.target.value}))}} className="input bd-unset px10" id=""/>
     </div>
   </div>}
   <div className="mother my-bottom-50">
   <div className="my-col-4 down-10 fade-in">
    {items?.review_status === "1" && <span className="mother centered my-btn-sm bg-color-code-1 white px10" id="ect" onClick={(e) => {saveItemHandler('accept', 'ect' )} } >Send Review</span>}
    {items?.review_status === "2" &&     <span className="mother centered my-btn-sm bg-color-code-1 white px10" id="ect" onClick={(e) => {saveItemHandler('reject', 'ect' )} } >Send Review</span> }
  </div>
   </div>
   </div>
   </div>
  </div>
 </div>
 
 </> );
}
 
export default ViewPending;