import { useContext, useEffect, useState } from "react";
import SideBar from "../components/c-pannel/sidebar";
import { AuthContext } from "../context/authcontext";
import ProductCategories from "../components/products/category/procategory";
import { CategoryContext } from "../context/categorycontext";
import ProductSkeletal from "../components/skeletals/prodskeletal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AllCategories from "../components/products/category/allcategory";

const Products = () => {
 const token = localStorage.getItem('lmobileToken');
 const {current} = useContext(AuthContext)
 const {category, getCategory} = useContext(CategoryContext);
 const history = useHistory();

 useEffect(()=> {
  document.title = 'L-Mobile ~ c-pannel'
  document.body.style.background = '#f3f3f3';
  return(()=> {document.body.style.backgroundColor='white'})
 })

 // useEffect(()=> {
 //  if(token) {
 //   getCategory(token)
 //  }else {
 //   history.push('/');
 //  }
 // }, [])

 return ( <>
  <SideBar current={current}/>
  {category.length < 1 ? <ProductSkeletal title='Categories'/> : <AllCategories getCategory={getCategory} category={category}/>}  

 </> );
}
 
export default Products;