import { useEffect, useRef, useState } from "react";
import useUtils from "../../../utils/useUtils";
import useApi from "../../../hooks/useApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import EditSubCat from "./editsubcat";
import DeleteCat from "../category/deleteCat";

const Settings = ({setSettings, under_main_cat_obj, under_main_cat, main_cat, getAllUnderMainCategory}) => {
 const token = localStorage.getItem('lmobileToken');
 const [category, setCategory] = useState({cat_name:"", old_image:"", main_Cat:"", action:"update_cat",  id:"", images:"",  sub_cat:"",  cat_id:"",  token:token});
 const {clickHandler, setToast, isPending} = useUtils();
 const [image, setImage] = useState(null);
 const [isLoading, setIsLoading] = useState(null);
 const [subcat, setSubcat] = useState([]);
 const [subcatname, setSubcatName] = useState('');
 const [editSub, setEditSub] = useState(false);
 const nameRef = useRef()
 const subcatRef = useRef()
 const [deleteCat, setDeleteCat] = useState(false)
 const {requestMaker} = useApi();
 const history = useHistory();
 const [saveChanges, setSaveChanges] = useState(false);

 useEffect(() => {
  setCategory(under_main_cat_obj)
  setImage(`https://lmobileapi.000webhostapp.com/images/${under_main_cat_obj?.images}`);
  var elem = under_main_cat_obj?.sub_cat
  if(elem){
   const arr = JSON.parse(elem);
   setSubcat(arr);
  }
 }, [under_main_cat_obj])

 const handleImageChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  setIsLoading('uploading');
  if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') && file.size < 4 * 1024 * 1024){
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 500;
        const MAX_HEIGHT = 500;
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
        setImage(dataURL);
        setCategory(prev => ({...prev, image:file}) )
        setIsLoading('change');
        setSaveChanges(true)
      };
    };
  } else {
    setToast('Please select a JPG, JPEG, or PNG image and must be less than 4mb in size');
   };
  }

 const AddSubCat = () => {
   if(subcatname.trim() === ""){
    setToast('Pleaase enter subcat name');
    subcatRef.current.focus();
    return
   }
   var chk = subcat.filter((i) => i.name == subcatname);
   if(chk?.length < 1){
    var elem = {name:subcatname}
    setSubcat([...subcat, elem]);
    setSubcatName('');
    setSaveChanges(true)
   }else {
    setToast('Subcat exist already');
   }
 }

 const deleteSubCat = (name) => {
  var elem = subcat.filter((i) => i.name != name);
  setSubcat(elem)
  setSaveChanges(true)
 }

 const AddCategoryHandler = async () => {
  if(category?.cat_name?.trim() === ""){
    setToast('Please enter category name');
    nameRef.current.focus();
    return;
   }
    category['subcat'] = JSON.stringify(subcat);
    category['token'] = token;
    category['action'] ='update_cat';
    category['old_cat_name'] = under_main_cat;
    category['old_image'] = under_main_cat_obj.images;
    category['sub_cat'] = JSON.stringify(subcat);
    isPending('edit_cat_btn', true)
    const res = await requestMaker('product/category', category)
    if(res?.status === 'successful'){
     await getAllUnderMainCategory(token, main_cat);
     history.push(`/c-panel/products/${main_cat}/${res?.data}`)
     isPending('edit_cat_btn', 'Save Changes');
     setToast('Category saved Successfully !');
     setSaveChanges(false)
    
    }else {
     isPending('edit_cat_btn', 'Save Changes')
     setToast('unsuccesful. Please try again later !')
     setSaveChanges(false)
    }
  }




 return ( <>
   <div className="add-item-modal fade-in">
    <div className="add-container in-ov-scroll">
     <div className="my-col-10 off-1 down-5">
      <div className="mother bd-bottom">
       <span className="px13 bold"> <i className="fas fa-cog"></i> Settings</span>
       <span className="pd-5 top-1 px13 fl-right faded-2" onClick={()=> {setSettings(false)}}><i className="fas fa-times"></i></span>
      </div>
      <div className="mother">
       <div className="mother down-5">
         {/* <span className="px10 faded">click picture to change </span> */}
        <div className="my-col-10">
         <input type="file" accept=".jpg,.jpeg,.png" id='ec-upload-pp' hidden onChange={handleImageChange} />
         <div className="upload-cat-img-container img-container" onClick={()=> {clickHandler('ec-upload-pp')}}>
          <div className="scarf"> 
          {isLoading === 'uploading' && <i className="fas fa-spinner fa-pulse px10"></i>}
          {isLoading === 'change' && <i className="fas fa-image px10"></i>}
           </div>
          {image?  <img src={image} alt="" />: <i className="fas fa-image px10"></i>}
         </div>
        </div>
        <div className="my-col-12">
        <div className="mother down-2">
         <div className="mother ">
         <span className="px10 ">Category:   <span className="pd-5 c-pointer mgl-5" title="edit"  onClick={()=> {setEditSub(true)}}><i className="fas fa-edit px13 faded-2 c-pointer"></i></span></span>
          <input placeholder="e.g Men's Wear" ref={nameRef} readOnly value={category?.cat_name} onChange={(e)=> (setCategory(prev => ({...prev, cat_name:e.target.value})))} maxLength={30} type="text" className="input modifys-input px10 upper-case"/></div>
         <div className="mother hs-200">
          <span className="px10 ">Sub-category: </span>
          {subcat?.length < 1 ? <span className="px10 faded-2">None</span>: <>  <br />{subcat?.map((i, index) => (
           <span className="pd-5 rad-unset px9 c-pointer mother bold bg-color-code-2 color-code-1 down-1" >{i.name}</span>
         ))}</>}
         </div>
         <div className="my-col-12 down-4">
         <div className="mother down-1"> 
          {
           saveChanges && <span className={"centered down-3 my-btn-sm bg-color-code-1 white px10"} id="edit_cat_btn" onClick={AddCategoryHandler}>Save Changes</span>
          }
         
         </div>
          <div className="mother down-10">
           <div className="mother bd-bottom"><span className="px13 red">Delete This Category</span></div>
           <div className="mother down-4"><span className="my-btn-sm c-pointer mgl-10 bg-faded rad-unset px10" title="delete this category" onClick={()=> {setDeleteCat(true)}}>Delete</span></div>
          </div>
         </div>
        </div>
        </div>
       </div>
       {editSub &&  <EditSubCat
        AddSubCat={AddSubCat}  
        setCategory={setCategory} 
        subcatname={subcatname}
        subcat={subcat} 
        setSaveChanges={setSaveChanges}
        category={category} 
        setEditSub={setEditSub}
        setSubcatName={setSubcatName}
        deleteSubCat={deleteSubCat} 
        subcatRef={subcatRef}
        AddCategoryHandler={AddCategoryHandler} 
       />}      

{deleteCat &&  <DeleteCat 
        setDeleteCat={setDeleteCat}
        category={category} 
       />}      

      </div>
     </div>
    </div>
   </div>
 </> );
}
 
export default Settings;