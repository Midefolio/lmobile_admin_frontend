import {useState, useContext, useEffect} from 'react';
import { AiOutlineShopping } from "react-icons/ai";
import Slider from "react-slick";
import AddCategory from "./addcategory";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import ProductSkeletal from "../../skeletals/prodskeletal";
import useApi from "../../../hooks/useApi";
import SideBar from '../../c-pannel/sidebar';
import { AuthContext } from '../../../context/authcontext';
import { CategoryContext } from '../../../context/categorycontext';
import { useLocation, useNavigate } from 'react-router-dom';


const ProductCategories = () => {
 const {current} = useContext(AuthContext)
 const {main_category} = useParams()
 const token = localStorage.getItem('lmobileToken');
 const history = useHistory();
 const {values_under_main_cat, getAllUnderMainCategory} = useContext(CategoryContext)
 const [addCat, setAddcat] = useState(false);

 
 useEffect(()=> {
  document.title = 'L-Mobile ~ c-pannel'
  document.body.style.background = '#f3f3f3';
  return(()=> {document.body.style.backgroundColor='white'})
 })

 const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow:5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true // prevent pausing on hover
};


useEffect(()=> {
 if(token){
   getAllUnderMainCategory(token, main_category);
 }else {
  history.push('/')
 }
}, [])


return ( <>
<SideBar current = {current} />
 {values_under_main_cat === null ? <ProductSkeletal/> :
 <>
{addCat && <AddCategory main_Cat={main_category} getAllUnderMainCategory={getAllUnderMainCategory} setAddcat={setAddcat} />}
<div className="my-col-10 off-2 fade-in">
 <div className="my-col-10 off-1 down-10">
  <div className="mother bd-bottom">
   <span className='pd-5 c-pointer' onClick={()=> {history.push('/c-panel')}}><i className='fas fa-angle-left'></i></span>
   <span className="px13 bold mgl-10 upper-case">All Products</span>
   <span className="my-btn-sm bg-color-code-1 px10 white fl-right top-1" onClick={()=>{setAddcat(true)}}>Add New +</span>
  </div>

 {values_under_main_cat.length < 1 ? <div className='mother down-5 centered px13 faded'>No Category Under <span className='pd-5 bg-faded faded-2'>{main_category}</span> <br /> <br />  <span className="px10">Click the 'Add New' button to add product</span> </div>
 :
 <Slider {...settings} className='mother down-3'>
 {values_under_main_cat?.map((i) => (
   <div className="my-col-4 c-pointer" key={i.id} onClick={()=> {history.push(`/c-panel/products/${main_category}/${i.cat_name}`)}}>
   <div className="my-container">
   <div className="info-card-cat bg-white cetered ">
     <div className="my-col-10 off-1 down-2">
      <div className="px30 color-code-1 down-8">
         <AiOutlineShopping className="fl-rigt"/>
      </div>
       <div className="px13 mother top-5">
         <div className="mother down-10 bold px10 upper-case"><span>{i.cat_name}</span></div>
         </div>
        </div>
       </div>
     </div>
     </div>
 ))}
 </Slider>
}
 </div>
 </div>
 </>
 }
 



 </> );
}
 
export default ProductCategories;