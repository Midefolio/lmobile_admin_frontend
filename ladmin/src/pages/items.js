import { useContext, useEffect } from "react";
import { AuthContext } from "../context/authcontext";
import SideBar from "../components/c-pannel/sidebar";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import ItemList from "../components/products/item/itemlist";
import TableSkeletal from "../components/skeletals/tableskeletal";
import { ItemsContext, itemsContext } from "../context/itemcontext";
import { VariantContext } from "../context/varientcontext";

const Items = () => {
 const {current} = useContext(AuthContext);
 const {items, location, sub_cat, getitems} = useContext(ItemsContext);
 const {main_cat, under_main_cat} = useParams();
 const  token = localStorage.getItem('lmobileToken');
 const history = useHistory();

 useEffect(()=> {
  document.title = 'L-Mobile ~ c-pannel'
  document.body.style.background = '#f3f3f3';
  return(()=> {document.body.style.backgroundColor='white'})
 })
 
 useEffect(()=> {
  if(token){
    getitems(token, main_cat, under_main_cat, sub_cat, location, 0);  // get all items where main_cat = x and sub_cat = y ;
  }else {
   history.push('/')
  }
 }, [under_main_cat, location, sub_cat])


 return ( <>
  <SideBar current={current}/>
  {items === null ? <TableSkeletal/> : <ItemList getitems={getitems} main_cat={main_cat} under_main_cat={under_main_cat}  items={items} />}
 </> );
}
 
export default Items;