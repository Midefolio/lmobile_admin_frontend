import { useContext, useEffect } from "react";
import {AiFillMoneyCollect, AiOutlineAlipay, AiOutlineCar, AiOutlineDeliveredProcedure, AiOutlineLoading, AiOutlineLoading3Quarters, AiOutlineMail, AiOutlineMoneyCollect, AiOutlinePayCircle, AiOutlineReload, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineSwitcher, AiOutlineTransaction, AiOutlineUser, AiOutlineUsergroupAdd, AiTwotoneMoneyCollect } from "react-icons/ai";
import { DashboardContext } from "../../context/dashboardcontext";
import ProductSkeletal from "../skeletals/prodskeletal";
import { AuthContext } from "../../context/authcontext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Dashboard = () => {
 const { dashboardSummary, error, getDashboardSummary } = useContext(DashboardContext);
 const {current, token} = useContext(AuthContext);
 const history = useHistory();

 useEffect(()=> {
  if(current){
   const intervalID = setInterval(() => {
    getDashboardSummary(token)
   }, 10000);
   return () => {
     clearInterval(intervalID);
   }
  }
 }, [current])

 useEffect(()=> {
  if(current){
    getDashboardSummary(token)
  }
 }, [current])


 return ( <>
  {dashboardSummary === null ? <ProductSkeletal title = 'Dashboard'/> :<> <div className="my-col-10 off-2 fade-in">
    <div className="my-col-10 off-1 down-5 bd-bottom"><span className="bold px13 upper-case">Welcome</span></div>
   <div className="my-col-9 off-1 monR ">
    <div className="mother down-2">
     <div className="my-col-3 c-pointer"  onClick={()=> {history.push('/c-panel/orders')}}>
      <div className="info-card bg-faded monR cetered b-shadw">
       <div className="my-col-10 off- down-2">
        <div className="px20 color-code-1">
         <sup className="fl-right top-10 px10 p-fixed">{dashboardSummary === null ? <span></span>: ''}</sup>
         <i className="fas fa-bicycle fl-rigt"></i>
       </div>
        <div className="px12">
         <div className="mother down-2 bold"><span>{dashboardSummary?.orders}</span><br /></div>
         <div className="mother down-3 faded"><span>Pending Orders</span></div>
         </div>
       </div>
      </div>
     </div>
     <div className="my-col-3 c-pointer of-1" onClick={()=> {history.push('/c-panel/product/review')}}>
      <div className="info-card bg-faded cetered b-sadow">
       <div className="my-col-10  down-2">
        <div className="px20 color-code-1"><AiOutlineShopping className="fl-rght"/></div>
        <div className="px12">
         <div className="mother down-2 bold"><span>{dashboardSummary?.products}</span><br /></div>
         <div className="mother down-3 faded"><span>Products To Review</span></div>
         </div>
       </div>
      </div>
     </div>
     <div className="my-col-3 c-pointer of-1" onClick={()=> {history.push('/c-panel/payroll')}}>
      <div className="info-card bg-faded cetered b-sadow">
       <div className="my-col-10 down-2">
        <div className="px20 color-code-1"><AiOutlinePayCircle className="ft"/></div>
        <div className="px12">
         <div className="mother down-2 bold"><span>{dashboardSummary?.payment}</span><br /></div>
         <div className="mother down-3 faded"><span>Settlements</span></div>
         </div>
       </div>
      </div>
     </div>
     <div className="my-col-3 c-pointer" onClick={()=> {history.push('/c-panel/wit_requests')}}>
      <div className="info-card bg-faded cetered b-shdow">
       <div className="my-col-10 off-1 down-2">
        <div className="px20 color-code-1"><AiOutlineTransaction className="fl-righ"/></div>
        <div className="px12">
         <div className="mother down-2 bold"><span>{dashboardSummary?.withrequests}</span><br /></div>
         <div className="mother down-3 faded"><span>Withdrawal Requests</span></div>
         </div>
       </div>
      </div>
     </div>
    </div>
   </div>

   <div className="my-col-10 off-1 down-5">
    <div className="mother bd-bottom"><span className="bold px13 faded-2 upper-case">Products / Orders</span></div>
    <div className="mother down-2">
     <div className="my-col-2 b c-pointer"  onClick={()=> {history.push('/c-panel/products/Groceries')}}>
      <div className="info-card bg-color-code-2 b-shadow ">
       <div className="my-col-10 off-1 down-2">
        <div className="px20 color-code-"><i className="fas fa-shopping-cart"></i></div>
        <div className="px10 down-8">
         <span className="upper-case bold">All Products</span>
        </div>
       </div>
      </div>
     </div>
     <div className="my-col-2 off-1 b c-pointer"  onClick={()=> {history.push('/c-panel/settings/variants')}}>
      <div className="info-card bg-color-code-2 b-shadow ">
       <div className="my-col-10 off-1 down-2">
        <div className="px20 color-code-"><i className="fas fa-map-marker-alt"></i></div>
        <div className="px10 down-8">
         <span className="upper-case bold">Product Locations</span>
        </div>
       </div>
      </div>
     </div>
     <div className="my-col-2 off-1 b c-pointer"  onClick={()=> {history.push('/c-panel/orders')}}>
      <div className="info-card bg-color-code-2 b-shadow ">
       <div className="my-col-10 off-1 down-2">
        <div className="px20 color-code-"><i className="fas fa-boxes-alt"></i></div>
        <div className="px10 down-8">
         <span className="upper-case bold">Orders</span>
        </div>
       </div>
      </div>
     </div>
 
     {/* <div className="my-col-2 c-pointer off-1">
      <div className="info-card bg-color-code-2 b-shadow cetered ">
       <div className="my-col-10 off-1 down-2">
        <div className="px20 color-code-1">
        <sup className="fl-right top-10 px10">{dashboardSummary === null ? <span></span>: ''}</sup>
         <AiOutlineAlipay className="fl-right"/>
        </div>
        <div className="px12">
         <div className="mother top-3 bold"><span>{dashboardSummary?.sellers}</span><br /></div>
         <div className="mother down-3 faded"><span>Sellers</span></div>
         </div>
       </div>
      </div>
     </div> */}
    </div>
   </div>


   <div className="my-col-10 off-1 down-5">
    <div className="mother bd-bottom"><span className="bold px13 upper-case faded-2">USERS / Staffs</span></div>
    <div className="mother down-2">
     <div className="my-col-2 b c-pointer"  onClick={()=> {history.push('/c-panel/customers')}}>
      <div className="info-card bg-color-code-2 b-shadow ">
       <div className="my-col-10 off-1 down-2">
        <div className="px20 color-code-"><i className="fas fa-users"></i></div>
        <div className="px10 down-8">
         <span className="upper-case bold">Customers</span>
        </div>
       </div>
      </div>
     </div>
     <div className="my-col-2 off-1 b c-pointer"  onClick={()=> {history.push('/c-panel/sellers')}}>
      <div className="info-card bg-color-code-2 b-shadow ">
       <div className="my-col-10 off-1 down-2">
        <div className="px20 color-code"><i className="fas fa-user"></i></div>
        <div className="px10 down-8">
         <span className="upper-case bold">Sellers</span>
        </div>
       </div>
      </div>
     </div>
     <div className="my-col-2 off-1 b c-pointer"  onClick={()=> {history.push('/c-panel/referers')}}>
      <div className="info-card bg-color-code-2 b-shadow ">
       <div className="my-col-10 off-1 down-2">
        <div className="px20 color-code"><i className="fas fa-paper-plane"/></div>
        <div className="px10 down-8">
         <span className="upper-case bold">Referers</span>
        </div>
       </div>
      </div>
     </div>
     <div className="my-col-2 off-1 b c-pointer"  onClick={()=> {history.push('/c-panel/drivers')}}>
      <div className="info-card bg-color-code-2 b-shadow ">
       <div className="my-col-10 off-1 down-2">
        <div className="px20 color-code"><i className="fas fa-bicycle"/></div>
        <div className="px10 down-8">
         <span className="upper-case bold">DISPATCH RIDERS</span>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
   {/* <div className="my-col-10 off-1 down-5">
    <div className="mother bd-bottom"><span className="bold px13 upper-case faded-2">PAyments</span></div>
    <div className="mother down-2">
     <div className="my-col-2 b c-pointer"  onClick={()=> {history.push('/c-panel/payroll')}}>
      <div className="info-card bg-color-code-2 b-shadow ">
       <div className="my-col-10 off-1 down-2">
        <div className="px20 color-code-"><i className="fas fa-money"></i></div>
        <div className="px10 down-8">
         <span className="upper-case bold">Payments</span>
        </div>
       </div>
      </div>
     </div>
  
    </div>
   </div> */}
  </div>
  </>
  }
  <div className="mother down-5 my-bottom-50"></div>
 </> );
}
 
export default Dashboard;