import { useEffect, useRef, useState } from "react";

import useUtils from "../../../utils/useUtils";
import useApi from "../../../hooks/useApi";

const AddCategory = ({setAddcat, main_Cat, getAllUnderMainCategory}) => {
 const token = localStorage.getItem('lmobileToken');
 const [category, setCategory] = useState({
  name:"",  
  image:"", 
  main_cat:main_Cat,  
  subcat:"",  
  cat_id:"",  
  token:token
 });
 const {clickHandler, setToast, isPending} = useUtils();
 const [image, setImage] = useState(null);
 const [isLoading, setIsLoading] = useState(null);
 const [subcat, setSubcat] = useState([]);
 const [subcatname, setSubcatName] = useState('');
 const nameRef = useRef()
 const subcatRef = useRef()
 const {requestMaker} = useApi();

 
 const handleImageChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  setIsLoading('uploading');
  // Check if the file is a JPG, JPEG, or PNG image
  if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png')  && file.size < 4 * 1024 * 1024){
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
      };
    };
  } else {
    setToast('Please select a JPG, JPEG, or PNG image and image must be less tha 5mb');
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
   }else {
    setToast('Subcat exist already');
   }
 }

const deleteSubCat = (name) => {
 var elem = subcat.filter((i) => i.name != name);
 setSubcat(elem)
}
 

  const AddCategoryHandler = async () => {
    if(category.name.trim() === ""){
     setToast('Please enter category name');
     nameRef.current.focus();
     return;
    }
    if(category.image === ""){
     setToast('Please upload category image to continue');
     return;
    }
    category['sub_cat'] = JSON.stringify(subcat);
    // console.log(category)
    isPending('add_cat_btn', true)
    const res = await requestMaker('product/addcategory', category)
    if(res?.status === 'successful'){
     await getAllUnderMainCategory(token, main_Cat);
     setSubcat([]);
     isPending('add_cat_btn', 'Add category');
     setToast('Category Added Successfully !')
    }else {
     isPending('add_cat_btn', 'Add category')
    }
  }
 return ( <>
   <div className="add-item-modal fade-in">
    <div className="add-container in-ov-scroll">
     <div className="my-col-10 off-1 down-5">
      <div className="mother bd-bottom">
       <span className="px13 bold">Add Category</span>
       <span className="my-btn-sm top-4 fl-right faded-2" onClick={()=> {setAddcat(false)}}><i className="fas fa-times"></i></span>
      </div>
      <div className="mother down-10">
       <div className="mother">
        <div className="mother"><span className="px10 bold">Category Image (not more than 3mb): </span></div>
        <div className="mother down-3">
         <input type="file" accept=".jpg,.jpeg,.png" id='upload-pp' hidden onChange={handleImageChange} />
         <div className="upload-cat-img-container img-container" onClick={()=> {clickHandler('upload-pp')}}>
          <div className="scarf-1"> 
          {isLoading === 'uploading' && <i className="fas fa-spinner fa-pulse px10"></i>}
          {isLoading === 'change' && <i className="fas fa-image px10"></i>}
           </div>
          {image?  <img src={image} alt="" />: <i className="fas fa-image px10"></i>}
         </div>
        </div>
       </div>
       <div className="mother down-2">
        <div className="mother"><span className="px10 bold">Category Name: </span></div>
        <div className="my-col-8 down-1"><input placeholder="e.g Bakes and pastries" ref={nameRef} value={category?.name} onChange={(e)=> (setCategory(prev => ({...prev, name:e.target.value})))} maxLength={30} type="text" className="input px10" /></div>
       </div>
       <div className="mother down-2">
        <div className="mother"><span className="px10 bold">Sub Caegory (Optional) : </span></div>
        <div className="my-col-8 down-1">
         <div className="my-col-10"><input placeholder="e.g Grains" ref={subcatRef} value={subcatname} onChange={(e)=> (setSubcatName(e.target.value))} maxLength={20} type="text" className="input px10" /></div>
         <div className="my-col-2 down-2"><span className="my-btn-sm bg-color-code-1 px10 white" onClick={(e)=> {AddSubCat(e)}}>Add</span></div>
         <div className="mother">  
         {subcat?.map((i, index) => (
         <div className="mother down-4" key={index}>
          <span className="px10 pd-5 bg-faded faded">{i.name}</span>
          <span className="mgl-5 my-btn-sm px10" onClick={()=> {deleteSubCat(i.name)}}><i className="fas fa-times"></i></span>
         </div>
         ))}
         </div>
        </div>
       </div>
       <div className="mother down-10 my-bottom-50"><span id="add_cat_btn" className="my-btn-sm bg-color-code-1 white px13" onClick={AddCategoryHandler}>Add Category</span></div>
      </div>
     </div>
    </div>
   </div>
 </> );
}
 
export default AddCategory;