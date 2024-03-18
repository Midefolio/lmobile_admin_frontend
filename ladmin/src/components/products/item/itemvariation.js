import {useEffect, useContext, useState} from 'react';
import useApi from "../../../hooks/useApi";
import useUtils from "../../../utils/useUtils";
import SideBar from "../../c-pannel/sidebar";
import { VariantContext } from '../../../context/varientcontext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const Variations = () => {
 const {getVariants, variants} = useContext(VariantContext)
 const history = useHistory();
 const {requestMaker} = useApi();
 const {setToast, isPending} = useUtils();
 const [size, setSize] = useState(null)
 const [color, setColor] = useState(null)
 const [brand, setBrand] = useState(null)
 const token = localStorage.getItem('lmobileToken')


 useEffect(()=> {
  document.title = 'L-Mobile ~ c-pannel'
  document.body.style.background = '#f3f3f3';
  return(()=> {document.body.style.backgroundColor='white'})
 })


 const addVariantsHandler = async(variant, tbl, btn) => {
   if(variant === null || variant === ''){
     setToast('Please enter a value')
     return;
   }
   const params = {token:token, table:tbl, action:'add_variant', value:variant}
   isPending(btn, true)
   const res = await requestMaker('variation/variations', params);
   if(res?.status === 'successful'){
    await getVariants(token);
    setToast('Succcessful !')
    isPending(btn, `<i class='fas fa-paper-plane'></i>`)
    setColor(''); setBrand(''); setSize('')
   }else {
    isPending(btn, `<i class='fas fa-paper-plane'></i>`)
   }
 }

 const deleteVariantsHandler = async(ids, tbl, btn) => {
  const params = {token:token, table:tbl, action:'delete_varient', id:ids}
  isPending(btn, true)
  const res = await requestMaker('variation/variations', params);
  if(res?.status === 'successful'){
   await getVariants(token);
   setToast('Deleted !')
  }
}

  

 return ( <>
   <SideBar />
   <div className="my-col-10 off-2 fade-in">
     <div className="my-col-10 off-1 down-10">
      <div className="mother bd-bottom"><span className="px13 bold upper-case"> <i className='fas fa-angle-left pd-5 c-pointer' onClick={()=>{history?.push('/c-panel')}}></i> Location Settings</span></div>
      <div className="mother down-2">
       <div className="my-col-10">
        <span className="px13">Location settings allows specify products in different locations. </span>
        </div>
      </div>
      <div className="mother down-5">
       <div className="my-col-4 bg-white b-shadow-2 my-bottom-50">
        <div className="my-col-10 off-1 down-5">
         <div className="mother down-1"><span className="px10">Location Variant</span></div>
         <div className="my-col-12 down-3">
         <div className="my-col-12 down-3">
          <div className="my-col-9"><input placeholder="Add Size e.g XS, S" value={size}  onChange={(e) => {setSize(e.target.value)}} type="text" className="input px10" /></div>
          <div className="my-col-3 down-2"><span className="my-btn-sm px10 bg-color-code-1 white" id='add_side_btn' onClick={()=> {addVariantsHandler(size, 'size', 'add_side_btn')}}><i className="fas fa-paper-plane"></i></span></div>
        </div>
        </div>
         <div className="display-varients-con">
          <div className="v-header">
           <div className="my-col-3 v-h bold">ID</div>
           <div className="my-col-6 v-h bold">Location</div>
           <div className="my-col-3 v-h bold">Delete</div>
          </div>
         {variants?.size.map((i, index) => (
           <div className="header" key={'size' + i.id}>
           <div className="my-col-3 v-h">{index + 1}</div>
           <div className="my-col-6 v-h">{i.value}</div>
           <div className="my-col-3 v-h"><i className="pd-5 fas c-pointer fa-times px10 color-code-1" id={'del_size' + i.id} onClick={()=> {deleteVariantsHandler(i.id, 'size',  'del_size' + i.id)}}></i></div>
          </div>
         ))}
         </div>
        </div>
       </div>
       <div className="my-col-4 bg-white b-shadow-2 my-bottom-50">
        <div className="my-col-10 off-1 down-5">
         <div className="mother down-1"><span className="px10">Color Variant</span></div>
         <div className="my-col-12 down-3">
          <div className="my-col-9 down-3"><input placeholder="Add color e.g red, blue" value={color} type="text" onChange={(e) => {setColor(e.target.value)}} className="input px10" /></div>
          <div className="my-col-3 down-5"><span className="my-btn-sm px10 bg-color-code-1 white" id='add_color_btn' onClick={()=> {addVariantsHandler(color, 'color', 'add_color_btn')}}><i className="fas fa-paper-plane"></i></span></div>
        </div>
         <div className="display-varients-con">
          <div className="v-header">
           <div className="my-col-3 v-h bold">ID</div>
           <div className="my-col-6 v-h bold">Color</div>
           <div className="my-col-3 v-h bold">Delete</div>
          </div>
          {variants?.color.map((i, index) => (
           <div className="header" key={'color'+i.id}>
           <div className="my-col-3 v-h">{index + 1}</div>
           <div className="my-col-6 v-h">  <span style={{display:'inline-block', width:'5px', height:'5px', border:'solid 1px #eee', backgroundColor:i.value}}></span>  {i.value}</div>
           <div className="my-col-3 v-h"><i className="pd-5 fas c-pointer fa-times px10 color-code-1" id={'del_color' + i.id} onClick={()=> {deleteVariantsHandler(i.id, 'color',  'del_color' + i.id)}}></i></div>
          </div>
         ))}
         </div>
        </div>
       </div>
       <div className="my-col-4 bg-white b-shadow-2 my-bottom-50">
        <div className="my-col-10 off-1 down-5">
         <div className="mother down-1"><span className="px10">Brands Variant</span></div>
         <div className="my-col-12 down-3">
         <div className="my-col-12 down-3">
          <div className="my-col-9"><input placeholder="Add Brand Name e.g NIke" value={brand} type="text" onChange={(e) => {setBrand(e.target.value)}}  className="input px10" /></div>
          <div className="my-col-3 down-2"><span className="my-btn-sm px10 bg-color-code-1 white" id='add_brand_btn' onClick={()=> {addVariantsHandler(brand, 'brand', 'add_brand_btn')}}><i className="fas fa-paper-plane"></i></span></div>
        </div>
        </div>
         <div className="display-varients-con">
          <div className="v-header">
           <div className="my-col-3 v-h bold">ID</div>
           <div className="my-col-6 v-h bold">Brand Name</div>
           <div className="my-col-3 v-h bold">Delete</div>
          </div>
          {variants?.brand.map((i, index) => (
           <div className="header" key={'brand'+i.id}>
           <div className="my-col-3 v-h">{index + 1}</div>
           <div className="my-col-6 v-h">{i.value}</div>
           <div className="my-col-3 v-h"><i className="pd-5 fas c-pointer fa-times px10 color-code-1" id={'del_brand' + i.id} onClick={()=> {deleteVariantsHandler(i.id, 'brand',  'del_brand' + i.id)}}></i></div>
          </div>
         ))}
         </div>
        </div>
       </div>
      </div>

      <div className='mother down-3'><span className='my-btn-sm c-pointer bg-color-code-1 white px10' onClick={()=> {setToast('Upgrade to unlock this feature')}}>Add New Variantion</span></div>
     </div>
   </div>
 </> );
}
 
export default Variations;