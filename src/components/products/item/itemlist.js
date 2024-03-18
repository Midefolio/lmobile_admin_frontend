import { AiOutlineSetting } from "react-icons/ai";
import EditItems from "./edititems";
import AddItems from "./additems";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../../context/categorycontext";
import Deleteitem from "./deleteitem";
import Settings from "./listsettings";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { VariantContext } from "../../../context/varientcontext";
import { ItemsContext } from "../../../context/itemcontext";
import { useRef } from "react";

const ItemList = ({under_main_cat, main_cat, getitems}) => {
 const [addItems, setAddItems] = useState(false);
 const [subCat, setsubCat] = useState([]);
 const {values_under_main_cat, getAllUnderMainCategory} = useContext(CategoryContext)
 const {sub_cat, setSubCat, location, setLocation, items, getMoreitems} = useContext(ItemsContext);
 const [editItem, setEditItem] = useState(null)
 const [deleteItem, setDeleteItem] = useState(null)
 const {variants} = useContext(VariantContext);
 const [settings, setSettings] = useState(false)
 const [under_main_cat_obj, setUnder_main_cat_obj] = useState();
 const history = useHistory();
 const token = localStorage.getItem('lmobileToken');
 const scrollableDiv = useRef();
 const [fetching, setFectching] = useState(false)

 const [top, setTop] = useState()
 const [height, setheight] = useState()
 const [client, setclient] = useState()
 
 useEffect(()=> {
  if(token){
    getAllUnderMainCategory(token, main_cat);
  }else {
   history.push('/')
  }
 }, [])


 useEffect(() => {
  var elem = values_under_main_cat?.find((i) => i.cat_name === under_main_cat);
  if(elem){
   var sub_cat_arr_str = elem?.sub_cat;
   var sub_cat_json  = JSON.parse(sub_cat_arr_str)
   setsubCat(sub_cat_json)
  }
 setUnder_main_cat_obj(elem)
}, [values_under_main_cat, under_main_cat ])


const handlleFetchOnScroll = async () => {
  const divElement = scrollableDiv.current;
  if(divElement){
    const scrollTop = divElement.scrollTop;
    const scrollHeight = divElement.scrollHeight;
    const clientHeight = divElement.clientHeight;
    // setTop(scrollTop)
    // setheight(scrollHeight)
    // setclient(clientHeight)
    //  alert(scrollTop + clientHeight === scrollHeight)
    // console.log(scrollTop, clientHeight,  scrollHeight)
    if(scrollTop + clientHeight === scrollHeight){
      setFectching(true);
      await getMoreitems(token, main_cat, under_main_cat, sub_cat, location, items?.length);
      setFectching(false);
    }
  }
}

useEffect(()=> {
  const divElement = scrollableDiv.current;
  if(divElement) {
    divElement.addEventListener('scroll', handlleFetchOnScroll)
  }
  return () => {
    if(divElement){
      divElement.removeEventListener('scroll', handlleFetchOnScroll)
    }
  }
}, [items])


 return ( <>
 {addItems && <AddItems getitems={getitems} main_cat={main_cat} under_main_cat={under_main_cat} subCat={subCat} setsubCat={setsubCat}  setAddItems={setAddItems}/>}
 {settings && <Settings setSettings={setSettings} under_main_cat={under_main_cat} getAllUnderMainCategory={getAllUnderMainCategory} main_cat={main_cat} under_main_cat_obj={under_main_cat_obj} />}
 <div className="my-col-10 off-2">
  <div className="my-col-10 off-1 down-10">
   <div className="mother down-1 px13">
    <div className="my-col-9 down-2 bold upper-case px10">
     <span className="pd-5 c-pointer" onClick={()=> {history.push(`/c-panel/products/${main_cat}`)}}>{main_cat}</span> 
     <span className="mgl-10 pd-5 faded-2"> <i className="fas fa-angle-right"></i></span>
     <span className="mgl-10 pd-5">{under_main_cat.slice(0,10)}</span>
     <span className="mgl-10 pd-5 faded-2"> <i className="fas fa-angle-right"></i></span>
     <select value={sub_cat} onChange={(e)=> {setSubCat(e.target.value)}} className="px10 select mgl-10">
     <option value={'all'}>All Sub-cat</option>
      {subCat?.map((i) => (
       <option value={i.name}>{i.name}</option>
      ))}
     </select>
     <select value={location} onChange={(e)=> {setLocation(e.target.value)}} className="px10 select mgl-10">
       {variants?.size?.map((i, index) => (
        <option value={i.value} key={'location' + index}>{i.value}</option>
       ))}
     </select>
   </div>
    {/* <div className="my-col-3 down-1">
     <input type="text" placeholder="Search items" className="search-input px10 bg-color-code-1" />
    </div> */}
    {/* <div>{top}  {client}  {height}</div> */}
    <div className="my-col-3 down-2">
     <span className="my-btn-sm bg-color-code-1 px10 white off-3 bg-color-code-1" onClick={()=> {setAddItems(true)}}>Add Item +</span>
     <span className="my-btn-sm mgl-10" onClick={()=> {setSettings(true)}}><AiOutlineSetting/></span>
   </div>
   </div>

  <div className="mother  bd-bottom down-1"></div>
   <div className="mother down-2">
      <div className="mother header">
      <span className="sn">Id</span>
      <span className="table-header">Item</span>
      <span className="table-header">Sub-Category</span>
      <span className="table-header">price</span>
      <span className="table-header">Slash price</span>
      <span className="table-header">Status</span>
      <span className="table-header">Location</span>
      <span className="table-header">Action</span>
      </div>

    <div className="table-con" ref={scrollableDiv}>
     <div className="table-scroll-con" >
     {items?.length < 1 ? <div className="mother centered down-3 px10"><span className="upper-case">No items under <span className="faded-2">{under_main_cat}</span></span></div> : 
     <>
      {items?.map((i, index) => (
      <div className={`mother t-body ${i.availability === '0' && 'not-avail'}`} key={index}>
       {deleteItem === `delete-item-${i.id}` && <Deleteitem under_main_cat={under_main_cat} main_cat={main_cat}  getitems={getitems} item={i} setDeleteItem={setDeleteItem} />}
       {editItem === `edit-item-${i.id}` &&  <EditItems main_cat={main_cat} under_main_cat={under_main_cat}  item={i} setEditItem={setEditItem} subCat={subCat} getitems={getitems} setsubCat={setsubCat}/>}
        <span className="sn sd centered">{index + 1}</span>
        <span className="table-body" title={i.item_name}>{i.item_name}</span>
        <span className="table-body" title={i.sub_cat}>{i.sub_cat}</span>
        <span className="table-body" title={i.price}>{i.price}</span>
        <span className="table-body" title={i.slash_price}>{i.slash_price}</span>
        <span className="table-body" title={i.availability === '0' ? 'Unvavailable': 'Available'}>{i.availability === '0' ? 'Unvavailable': 'Available'}</span>
        <span className="table-body" title={i.location}>{i.location}</span>
        <span className="table-body unset-indent">
        <span className="my-btn-sm faded-2" onClick={()=> {setEditItem(`edit-item-${i.id}`)}}><i className="fas fa-edit"></i></span>
        <span className="my-btn-sm faded-2 mgl-5" onClick={()=> {setDeleteItem(`delete-item-${i.id}`)}}><i className="fas fa-trash-alt"></i></span>
        </span>
      </div>
      ))}
     </>
     }
     </div>
    </div>
    {fetching && <div className="centered mother down-2 px10"><span> <i className="fas fa-spinner px13 fa-spin"></i> <span className="mgl-5">fetching more data .. </span></span></div>}
   </div>
  </div>
 </div>
 </> );
}
 
export default ItemList;