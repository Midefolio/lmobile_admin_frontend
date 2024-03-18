import { useEffect, useRef, useContext,  useState } from "react";
import useUtils from "../../../utils/useUtils";
import useApi from "../../../hooks/useApi";
import { VariantContext } from "../../../context/varientcontext";
import { ItemsContext } from "../../../context/itemcontext";

const AddItems = ({subCat, getitems, under_main_cat, main_cat, setAddItems}) => {
 const token = localStorage.getItem('lmobileToken');
 const {variants} = useContext(VariantContext)
 const {sub_cat, location} = useContext(ItemsContext);
 const {requestMaker} = useApi()
 const {clickHandler, setToast, isPending, makeid} = useUtils();
 const [variation, setVariation] = useState(false);
 const [isLoading, setIsLoading] = useState(null);
 const nameRef = useRef()
 const subRef = useRef()
 const priceRef = useRef()
 const ratRef = useRef()


 const [preview, setPreview] = useState({
  'image_1':null,
  'image_2':null,
  'image_3':null
 });

 const [varant, setVarians] = useState({
  location:"",
  price:"",
  id:""
 })

 const [variations, setVariations] = useState([])

 const [items, setitems] = useState({
  image_1:"",
  image_2:"",
  image_3:"",
  item_id:"",
  item_name:"",
  main_cat,
  category:under_main_cat,
  sub_cat:"",
  price:"",
  availability:"1",
  slash_price:"",
  status:"",
  owner:"Lmobile",
  phone:"08088773172",
  email:"lmobile",
  description:"",
  ratings:"",
  weight:"",
  variations:[],
  token:token
 });


 const handleImageChange = async(event, arr_index) => {
  const file = event.target.files[0];
  let url;
  if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') && file.size < 4 * 1024 * 1024) {
   setIsLoading('uploading');
   const reader = new FileReader();
   reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400;
        const MAX_HEIGHT = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataURL = canvas.toDataURL(file.type);
        url = dataURL;
       };
      };    
      let oldImage;
      if(arr_index === '1'){
       oldImage = items.image_1;
      }else if (arr_index === '2'){
       oldImage = items.image_2;
      }else {
       oldImage = items.image_3;
      }
      // send requet to db;
     const res =  await UploadToDB(file, arr_index, oldImage);
     if(res === true) {
      arr_index === '1' && setPreview((prev)=> ({...prev, image_1:url}));
      arr_index === '2' && setPreview((prev)=> ({...prev, image_2:url}));
      arr_index === '3' && setPreview((prev)=> ({...prev, image_3:url}));
      setIsLoading('change');
     }else {
      arr_index === '1' && setPreview((prev)=> ({...prev, image_1:null}));
      arr_index === '2' && setPreview((prev)=> ({...prev, image_2:null}));
      arr_index === '3' && setPreview((prev)=> ({...prev, image_3:null}));
      setIsLoading('change');
     }
  } else {
    setToast('Please select a JPG, JPEG, or PNG image and must be less than 4mb in size');
   };
  }

 const UploadToDB = async (file, index, old_image) => {
  const res = await requestMaker('utils/upload', {token:token, image:file, old_image});
  if(res?.status === 'successful'){
   index === '1' && setitems((prev)=> ({...prev, image_1:res?.data}));
   index === '2' && setitems((prev)=> ({...prev, image_2:res?.data}));
   index === '3' && setitems((prev)=> ({...prev, image_3:res?.data}));
   return true;
  }else {
   setToast('could not upload image. please try again')
   return false;
  }
 }

 const addVariations =()=> {
  if(varant?.location.trim() === ''){
   setToast('Please enter location');
   return;
  }
  var x = variations.filter((i) => i.location === varant.location);
  if(x.length !== 0){
   setToast('Location exist already');
   return
  }
  setVarians(prev => ({...prev, id:makeid(5)}));
  setVariations(prev => [...prev, varant])
  setVariation(false);
  }


   const RemoveVariations =(u)=> {
    const elem = variations.filter( (i) => i.id !== u)
    setVariations(elem)
   }


  const saveItemHandler = async(action, btn) => {
   if(items?.item_name.trim() === ''){
    setToast('Please enter item name');
    nameRef.current.focus();
    return;
   }
   if(items?.description.trim() === ''){
    setToast('Please describe this item');
    ratRef.current.focus();
    return;
   }
   if(items?.sub_cat.trim() === ''){
    setToast('Please enter item sub-category');
    subRef.current.focus();
    return;
   }
   if(items?.price.trim() === ''){
    setToast('Please enter item price');
    priceRef.current.focus();
    return;
   }
   if(items?.weight.trim() === ''){
    setToast('Please enter item weight');
    return;
   }
   if(items?.phone.trim() === ''){
    setToast('Please enter item enquiry contact');
    return;
   }
   if(items?.image_1 === '' & items?.image_2 === '' & items?.image_2 === ''){
    setToast('Please upload at least one image');
    return;
   }
  if(variations.length < 1){
    setToast('Please add item available locations to continue');
    return;
   }
   items['item_id'] = 'item_' + makeid(5);
   items['variations'] = JSON.stringify(variations);
   items['action'] = action;
   isPending('add_item_btn', true);
   const res = await requestMaker('/product/additem', items);
   if(res?.status === 'successful'){
   await getitems(token, main_cat, under_main_cat, sub_cat, location);
   isPending('add_item_btn', 'Save Item');
   setToast('Item saved successfully !');
   setAddItems(false);
  }else {
   isPending('add_item_btn', 'Save Item');
   setToast('There Was an Error Saving Item. Please try again later');
  }
 }

const saveToDraft = async () => {
 items['variations'] = JSON.stringify(variations);
 items['item_id'] = 'item_' + makeid(5);
 items['action'] = 'save_to_draft';
 isPending('add_draft_btn', true);
 const res =  await requestMaker('product/draft', items);
 if(res?.status === 'successful'){
  setToast('Item successfully saved to draft');
  isPending('add_draft_btn', 'Save To Draft');
  setAddItems(false);
 }else{
  isPending('add_draft_btn', 'Save To Draft');
 }
}

 return ( <>
 <div className="add-item-modal">
  <div className="add-container w-50 in-ov-scroll">
   <div className="my-col-10 off-1 down-3">
    <div className="mother bd-bottom">
     <span className="px13 bold">New Item</span>
     <span className="my-btn-s fl-right px13 pd-5 top-1 c-pointer" onClick={()=> {setAddItems(false)}}><i className="fas fa-times"></i></span>
   </div>
   <div className="mother down-3">
    <div className="mother down-1">
     <span className="px10">Item Name</span>
     <div className="mother"><input type="text" maxLength={50} ref={nameRef} value={items?.item_name} onChange={(e)=>{setitems(prev => ({...prev, item_name:e.target.value}))}} className="input px10" /></div>
   </div>
   <div className="mother down-1">
     <span className="px10">Item Description</span>
     <div className="mother"><input  ref={ratRef} type="text" maxLength={5000} placeholder="e.g Gucci, lois Viton"  value={items?.description} onChange={(e)=>{setitems(prev => ({...prev, description:e.target.value}))}} className="input px10" /></div>
   </div>
    <div className="mother down-1">
     <span className="px10">Item Sub-Category <span className="mgl-10 pd-5 faded c-pointer" title="Add new sub category"> <i className="fas fa-plus "></i> </span> </span>
     <div className="mother">
      <select className="input px10" ref={subRef} value={items?.sub_cat} onChange={(e)=>{setitems(prev => ({...prev, sub_cat:e.target.value}))}} id="">
       <option value="">---</option>
       {subCat?.map((i, index) => (
         <option value={i.name}>{i?.name}</option>
       ))}
      </select>
     </div>
   </div>
   <div className="mother down-1">
     <span className="px10">Price</span>
     <div className="mother"><input min={0} ref={priceRef} type="number" value={items?.price} onChange={(e)=>{setitems(prev => ({...prev, price:e.target.value}))}} className="input px10" /></div>
   </div>
   <div className="mother down-1">
     <span className="px10">Slash Price (Optional)</span>
     <div className="mother"><input min={0} type="number" value={items?.slash_price} onChange={(e)=>{setitems(prev => ({...prev, slash_price:e.target.value}))}} className="input px10" /></div>
   </div> 
    <div className="mother down-1">
     <span className="px10">Ratings <i className="fas fa-star px10 color-code-1"></i> </span>
     <div className="mother">
      <input  type="number" max={0} min={5} value={items?.ratings} onChange={(e)=>{setitems(prev => ({...prev, ratings:e.target.value}))}} className="input px10" id=""/>
     </div>
   </div>
    <div className="mother down-1">
     <span className="px10">Weight (Kg)</span>
     <div className="mother">
      <input  type="number" min={0}  value={items?.weight} onChange={(e)=>{setitems(prev => ({...prev, weight:e.target.value}))}} className="input px10" id=""/>
     </div>
   </div>
    <div className="mother down-1">
     <span className="px10">Enquiry Contact</span>
     <div className="mother">
      <input  type="tel" value={items?.phone} maxLength={11} onChange={(e)=>{setitems(prev => ({...prev, phone:e.target.value}))}} className="input px10" id=""/>
     </div>
   </div>
    <div className="mother down-1">
     <span className="px10">Availability Status</span>
     <div className="mother">
      <select value={items?.availability}  onChange={(e)=>{setitems(prev => ({...prev, availability:e.target.value}))}} name="" id="" className="input px10">
       <option value="1">Instock</option>
       <option value="0">Out of Stock</option>
      </select>
     </div>
   </div>
 < div className="my-col-10 down-3">
  <div><span className="px10"> Item images (Upload al least one image)</span></div>
 <div className="my-col-4 down-2">
  <input type="file" accept=".jpg,.jpeg,.png" id='upload-pp_2' hidden onChange={(e)=> {handleImageChange(e, '1')}} />
   <div className="upload-cat-img-container img-container" onClick={()=> {clickHandler('upload-pp_2')}}>
    <div className="scarf-1"> 
     {isLoading === 'uploading' && <i className="fas fa-spinner fa-pulse px13"></i>}
     {isLoading === 'change' && <i className="fas fa-image px13"></i>}
      </div>
     {preview.image_1?  <img src={preview?.image_1} alt="" />: <i className="fas fa-image px13"></i>}
     </div>
   </div>
     <div className="my-col-4 down-2">
     <input type="file" accept=".jpg,.jpeg,.png" id='upload-pp_1' hidden onChange={(e)=> {handleImageChange(e, '2')}} />
     <div className="upload-cat-img-container img-container" onClick={()=> {clickHandler('upload-pp_1')}}>
          <div className="scarf-1"> 
          {isLoading === 'uploading' && <i className="fas fa-spinner fa-pulse px13"></i>}
          {isLoading === 'change' && <i className="fas fa-image px13"></i>}
           </div>
          {preview.image_2 ?  <img src={preview.image_2} alt="" />: <i className="fas fa-image px13"></i>}
         </div>
     </div>
     <div className="my-col-4 down-2">
     <input type="file" accept=".jpg,.jpeg,.png" id='upload-pp_3' hidden onChange={(e)=> {handleImageChange(e, '3')}} />
     <div className="upload-cat-img-container img-container" onClick={()=> {clickHandler('upload-pp_3')}}>
          <div className="scarf-1"> 
          {isLoading === 'uploading' && <i className="fas fa-spinner fa-pulse px13"></i>}
          {isLoading === 'change' && <i className="fas fa-image px13"></i>}
           </div>
          {preview.image_3?  <img src={preview.image_3} alt="" />: <i className="fas fa-image px13"></i>}
         </div>
     </div>
 </div>

 <div className="mother bd-bottom down-10"><span className="px10 bold">Available Locations <b className="pd-5 c-pointer" title="Variations helps you specify varieties of the same product e.g a T-shirt from a perticular brand can have diffrernt size and color"><i className="fas fa-question"></i></b> </span></div>
{variations?.length > 0 &&  <div className="mother down-2">
{variations?.map((i, index) => (
  <span className="bg-color-code-2 rad-unset mgl-5 c-pointer down-1 px10 color-code-1 pd-5" onClick={()=>{RemoveVariations(i.id)}}>{i.location}</span>
 ))}
 </div>}

  {variation &&  <div className="my-col-10 down-3 pd-5 rad-unset bg-faded fade-in">
   <span className="pd-5 bg-faded rad-unset px10 fl-right p-absolute off-11" onClick={()=> {setVariation(false)}}><i className="fas fa-times"></i></span>
   <div className="mother bd-bottom"><span className="px10">Add locations</span></div>
   <div className="my-col-4  mgl-10 down-1">
     <span className="px10">Location</span>
     <div className="mother">
      <select name="" id="" value={varant?.location} onChange={(e)=>{setVarians(prev => ({...prev, location:e.target.value}))}} className="input px10 bg-white bg-white"> 
      <option value={null}>....</option>
       {variants?.size?.map((i, index) => (
        <option value={i.value} key={'asjkasjkas' + index}>{i.value}</option>
       ))}
      </select>
     </div>
   </div>
   {/* <div className="my-col-4  mgl-10 down-1">
     <span className="px10">Price</span>
     <div className="mother">
      <input type="number" placeholder="enter price" min={0} className="input px10 bg-white" value={varant?.price} onChange={(e)=>{setVarians(prev => ({...prev, price:e.target.value}))}} />
     </div>
   </div> */}
   <div className="my-col-2 down-6"><span className="my-col-3 centered my-btn-sm bg-color-code-1 white px10  mgl-10  " onClick={addVariations}> Add </span></div>
   </div>}
   <div className="mother down-3"><span className="pd-5 c-pointer bold color-code-1 px10" onClick={()=> {setVariation(true)}}>{items?.variations?.length < 1 ? <u>Add location +</u> : <u>Add more</u>  }</span></div>
   <div className="mother down-4 px10">
    <div className="px10 mother"> Product Status</div>
    <select name="" id=""  value={items?.status} onChange={(e)=>{setitems(prev => ({...prev, status:e.target.value}))}} className="input px10 down-1">
     <option value="">---</option>
     <option value="trending">Trending</option>
     <option value="popular">Popular</option>
    </select>
   </div>
     <div className="my-col-4 down-10 my-bottom-50"><span id="add_item_btn" className="mother  centered my-btn-sm bg-color-code-1 white px10"  onClick={()=> {saveItemHandler('save', 'add_item_btn')}}>Publish Item</span></div>
     <div className="my-col-4 off-2 down-10 my-bottom-50"><span id="add_draft_btn" className="mother  centered my-btn-sm bg-faded black px10" onClick={()=> {saveToDraft()}}>Save to Draft</span></div>
   </div>
   </div>
  </div>
 </div>
 </> );
}
 
export default AddItems;