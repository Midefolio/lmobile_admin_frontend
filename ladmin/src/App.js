import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminLogin from './pages/login';
import Cpannel from './pages/c-pannel';
import AuthContextProvider from './context/authcontext';
import DashboardContextProvider from './context/dashboardcontext';
import Products from './pages/products';
import CategoryContextProvider from './context/categorycontext';
import Items from './pages/items';
import ItemsContextProvider from './context/itemcontext';
import Variations from './components/products/item/itemvariation';
import VariantContextProvider, { VariantContext } from './context/varientcontext';
import ProductCategories from './components/products/category/procategory';
import Users from './components/Users/user';
import AdminContextProvider from './context/admincontext';
import OrderList from './components/orders/orderlist';
import Pending from './components/products/item/pending';
import Sellers from './components/sellers/sellers';
import Applications from './pages/applications';
import Referers from './components/referals/refererTable';
import Drivers from './components/drivers/drivertable.';
import Payroll from './components/payroll/payments';
import WithRequests from './components/witrequests/witrequests';
import Settings from './components/settings/settings';

const App = () => {
 return ( 
  <>
  <div className="my-toast" id="my-toast">
    <div className="xs-container my-col-10">
      <div className="xs-12 pdl-10 down-1"><span id="msg" className="xs-px13"></span></div>
    </div>
   </div>
    <Router>
      <Switch>
       <Route path='/' exact component={AdminLogin}/>
       <Route path="/applications" component={Applications} />
       <AuthContextProvider>
        <DashboardContextProvider>
         <VariantContextProvider>
         <CategoryContextProvider>
          <ItemsContextProvider>
           <AdminContextProvider>
            <Route path='/c-panel' exact component={Cpannel}/>
            <Route path='/c-panel/products' exact component={Products} />
            <Route path='/c-panel/product/review' exact component={Pending} />
            <Route path='/c-panel/products/:main_category' exact component={ProductCategories} />
            <Route path='/c-panel/settings/variants' component={Variations} />
            <Route path='/c-panel/products/:main_cat/:under_main_cat' component={Items} />
            <Route path='/c-panel/settings/item_variation' component={Variations} />  
            <Route path='/c-panel/customers' component={Users}/>  
            <Route path='/c-panel/orders' component={OrderList}/>  
            <Route path='/c-panel/sellers' component={Sellers}/>  
            <Route path='/c-panel/referers' component={Referers}/>  
            <Route path='/c-panel/drivers' component={Drivers}/>  
            <Route path='/c-panel/payroll' component={Payroll}/>  
            <Route path='/c-panel/wit_requests' component={WithRequests}/>  
            <Route path='/settings' component={Settings} />
           </AdminContextProvider>
          </ItemsContextProvider>
         </CategoryContextProvider>
         </VariantContextProvider>
        </DashboardContextProvider>
       </AuthContextProvider>
      </Switch>
    </Router> 
  </>
 );
}
 
export default App;
