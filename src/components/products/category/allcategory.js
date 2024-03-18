import { AiOutlineProject, AiOutlineShop, AiOutlineShopping } from "react-icons/ai";
import Slider from "react-slick";
import {useState} from 'react';
import AddCategory from "./addcategory";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useUtils from "../../../utils/useUtils";


const AllCategories = ({category, slidesToShow, getCategory}) => {
 const history = useHistory();
 const {setToast} = useUtils()

 const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow:4,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  pauseOnHover: true // prevent pausing on hover
};


return ( <>
<div className="my-col-10 off-2 fade-in">
 <div className="my-col-10 off-1 down-10">
  <div className="mother bd-bottom">
   <span className="px13 bold ">All Products</span>
   <span className="my-btn-sm bg-color-code-1 px10 white fl-right top-1" onClick={()=>{setToast('Upgrade to unlock this feature')}}>Add New +</span>
  </div>
 <div className="mother down-3">
 {category?.map((i) => (
   <div className="my-col-2 pd-5 c-pointer" key={i.id} onClick={()=> {history.push(`/c-panel/products/${i.name}`)}}>
   <div className="my-container">
   <div className="info-card-cat bg-white pd-5 rad-unset cetered ">
     <div className="my-col-10 off-1 down-2">
      <div className="px30 color-code-1 down-8">
         <AiOutlineShopping className="fl-rigt"/>
      </div>
       <div className="px13 mother top-5">
         <div className="mother down-10 bold px10 upper-case"><span>{i.name}</span></div>
         </div>
        </div>
       </div>
     </div>
     </div>
 ))}
 </div>
 <Slider {...settings} className='mother down-3'>
 </Slider>
 </div>
 </div>
 </> );
}
 
export default AllCategories;