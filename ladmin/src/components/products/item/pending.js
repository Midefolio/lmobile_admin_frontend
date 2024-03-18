import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import SideBar from "../../c-pannel/sidebar";
import useApi from "../../../hooks/useApi";
import useUtils from "../../../utils/useUtils";
import ViewPending from "./viewpending";


const Pending = () => {
 const token = localStorage.getItem('lmobileToken');
 const history = useHistory();
 const [products, setProducts] = useState();
 const {requestMaker} = useApi();
 const {formatNumber} = useUtils()
 const [editItem, setEditItem] = useState();

 useEffect(()=> {
  document.title = 'L-Mobile ~ c-pannel'
  document.body.style.background = '#f3f3f3';
  return(()=> {document.body.style.backgroundColor='white'})
 })

 const getPending = async(Token, offset) => {
  const params = {action:'get_pending', token:Token, offset}
  const res = await requestMaker('product/items', params);
  if(res?.status === 'successful'){
   setProducts(res?.data);
  }
 }
 
 useEffect(()=> {
  if(token){
    getPending(token, 0);
  }else {
   history.push('/')
  }
 }, [])




 return ( <>
 <SideBar/>
 {/* {addItems && <AddItems getitems={getitems} main_cat={main_cat} under_main_cat={under_main_cat} subCat={subCat} setsubCat={setsubCat}  setAddItems={setAddItems}/>} */}
 <div className="my-col-10 off-2">
  <div className="my-col-10 off-1 down-10">
   <div className="mother down-1 px13">
    <div className="my-col-9 down-2 bold upper-case">
      <i className="fas fa-angle-left pd-5 c-pointer"  onClick={()=> {history.push(`/c-panel`)}}></i>
     <span className="pd-5 c-pointer px13">Products To Review</span> 
    </div>
    <div className="my-col-3 down-2">
   </div>
   </div>
  <div className="mother  bd-bottom down-1"></div>
   <div className="mother down-2">
      <div className="mother header">
      <span className="sn">Id</span>
      <span className="table-header">Product</span>
      <span className="table-header">Price</span>
      <span className="table-header">Slash price</span>
      <span className="table-header">Seller</span>
      <span className="table-header">Phone Number</span>
      <span className="table-header">Action</span>
      </div>
    <div className="table-con">
     <div className="table-scroll-con">
     {products?.length < 1 ? <div className="mother centered down-3 px10"><span className="upper-case">No Products Under review</span></div> : 
     <>
      {products?.map((i, index) => (
      <div className={`mother t-body ${i.availability === '0' && 'not-avail'}`} key={index}>
       {/* {deleteItem === `delete-item-${i.id}` && <Deleteitem under_main_cat={under_main_cat} main_cat={main_cat}  getitems={getitems} item={i} setDeleteItem={setDeleteItem} />} */}
       {editItem === `view-item-${i.id}` &&  <ViewPending item={i} setEditItem={setEditItem} getitems={getPending}/>}
        <span className="sn sd centered">{index + 1}</span>
        <span className="table-body" title={i.item_name}>{i.item_name}</span>
        <span className="table-body" title={i.price}>{formatNumber(i.price)}</span>
        <span className="table-body" title={i.slash_price}>{formatNumber(i.slash_price)}</span>
        <span className="table-body" title={i.owner}>{i.owner}</span>
        <span className="table-body" title={i.phone}>{i.phone}</span>
        <span className="table-body unset-indent">
        <span className="my-btn-sm faded-2" onClick={()=> {setEditItem(`view-item-${i.id}`)}}><i className="fas fa-eye"></i></span>
        {/* <span className="my-btn-sm faded-2 mgl-5" onClick={()=> {setDeleteItem(`delete-item-${i.id}`)}}><i className="fas fa-trash-alt"></i></span> */}
        </span>
      </div>
      ))}
     </>
     }
     </div>
    </div>
   </div>
  </div>
 </div>
 </> );
}
 
export default Pending;