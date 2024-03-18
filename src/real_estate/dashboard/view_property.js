import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "./layout";
import { useContext, useEffect, useRef, useState } from "react";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";
import useUtils from "../../utils/useUtils";
import useApi from "../../hooks/useApi";
import CatSkeleton from "../../components/skeletals/catskeleton";
import { EstateContext } from "../../context/estate_context";
import MultiSelect from "../components/multiple_select";
import { AiOutlineFilter, AiOutlineSortAscending } from "react-icons/ai";
import FilterProperties from "../components/filter_prop";
import ReviewProperties from "./review_properties";

const UserProperties = () => {
 const { path, Category } = useContext(EstateContext)
 const { status } = useParams();
 const [properties, setProperties] = useState(null);
 const { makeRequest } = useApi();
 const { formatNumber, setToast, formatTransactionTime } = useUtils();
 const history = useHistory();
 const nodetoken = localStorage.getItem('lm_node_jwt');
 const [search, setSearch] = useState({keyword:"", table:'products', column:'item_name', action:"search"});
 const [searching, setSearching] = useState(false);
 const searchRef = useRef();
 const [filter, setFilter] = useState(false)
 const [isfetching, setIsfetching] = useState(false)
 const [review, setReview] = useState(null);
 const abortController = useRef(new AbortController)

 const [sortParams, setSortParams] = useState({
    category:Array,
    features:Array,
    price_range:String,
    location:String,
    user_id:String,
 })

 

 const searchHandler = async (e)=> {
  e.preventDefault();
 if(search?.keyword === "") {
  setToast('Please enter a keyword');
  searchRef.current.focus()
  return;
 }
 setSearching(true);
 const res = await makeRequest(`frontend/category`, search);
 if(res?.status === 'successful' ){
  history.push('/search/item')
  // setSearchResults(res?.data);
  setSearching(false);
  }else {
    setSearching(false);
  }
 }


 const getProperties = async () => {
   let url;
   if(status === 'active'){
     url = `admin/active_prop`;
    }else if(status === 'pending'){
      url = `admin/pending_prop`
    }else if(status === 'declined'){
      url = `admin/declined_prop`
    }
    
  setProperties(null);
  const res = await makeRequest('get', url, null, null, nodetoken, abortController);
  if(res?.message === 'done') {
    setProperties(res?.properties)
  }
 }

 useEffect(() => {
   if(nodetoken){
    getProperties();
   }
 }, [status])


 const filterHandler = async() => {
  setIsfetching(true)
  const cb =()=>{setIsfetching(false)}
  const result = await makeRequest('post', `admin/filter_prop`, sortParams, cb, nodetoken);
  if(result?.message === 'done') {
   setProperties(result?.properties)
   setIsfetching(false);
  }
 } 



  

  return ( <>
   <Layout active={'properties'}/>

   {properties?.map((i, index) => (
     review === i?._id && <ReviewProperties i={i} getProperties={ getProperties } setReview={ setReview } />
   ))}

  {filter && <FilterProperties isfetching={isfetching}  filterHandler={ filterHandler } stateToUpdate={ setSortParams } setFilter={ setFilter } />}
    <div className="my-col-10 off-2">
      <div className="my-col-10 down-5">
        <div className="my-mother bd-bottom-bold">
          <div className="my-col-6">
            {status === 'active' && <h1>  <span className="pd-10 c-pointer" onClick={()=> {history.push('/d-pannel')}}><i className="fas fa-arrow-left"></i></span>   Active Properties</h1> }
            {status === 'pending' && <h1> <span className="pd-10 c-pointer" onClick={()=> {history.push('/d-pannel')}}><i className="fas fa-arrow-left"></i></span> Properties Under Review</h1> }
            {status === 'declined' && <h1> <span className="pd-10 c-pointer" onClick={()=> {history.push('/d-pannel')}}><i className="fas fa-arrow-left"></i></span> Rejected Properties</h1> }
          </div>
          <div className="my-col-6 right down-2">
            <span onClick={()=>{history.push('/dashboard/properties/active')}} className={`anchors px13 black mg-5 ${status === 'active'?'bg-color-code-1 white':'bg-faded black'} `}>Active</span>
            <span onClick={()=>{history.push('/dashboard/properties/pending')}} className={`anchors px13 black mg-5 ${status === 'pending'?'bg-color-code-1 white':'bg-faded black'} `}>Reviewing</span>
            <span onClick={()=>{history.push('/dashboard/properties/declined')}} className={`anchors px13 black mg-5 ${status === 'declined'?'bg-color-code-1 white':'bg-faded black'} `}>Declined</span>
          </div>
        </div>

       {status === 'active' && <div className="my-mother down-2">
          <div className="my-col-2 centered"><span onClick={()=>{setFilter(true)}} className="search-con anchors down-2 bg-faded rad-20 px13 faded"> <i className="fas fa-filter monR down-2"></i>  Filter </span></div>
          <div className="my-col-4 off-1">
            <div className="my-col-12 off- xs-12  hidden-xs">
              <form onSubmit={(e)=> {searchHandler(e)}} className="-xs" >
                <div className="search-con">
                <input type="text" ref={searchRef}  className='monR px13 faded' onChange={(e) => {setSearch(prev => ({...prev, keyword:e.target.value}) )}} placeholder='Search Properties'/>
                {!searching? <span onClick={(e)=> {searchHandler(e)}} ><i className="fas fa-search" ></i></span> :  <span ><i className="fas fa-refresh fa-spin"></i></span>}
              </div>
              </form>
              </div>
            </div>
         </div>}

       {!properties && <div className="my-mother down-3 xs-down-3"><CatSkeleton slideToShow={3} /></div>}
        <div className="my-mother down-1">
          {properties && <>
           {properties?.map((i, index) =>(
              <div className="my-col-3 down-4"  key={index + 'ooo'} onClick={() => {setReview(i._id)}}>
                <div className="my-container my-bottom-10 my-b-shadow bg-white">
                  <div className="my-col-10 off-1 down-5"><div className="ppt-img-container"><img  src={path + i.images[0]} alt="" loading="lazy"  /></div></div>
                  <div className="my-col-10 off-1 down-5">
                    <div><span className="black bold px13"> ₦ {formatNumber(i.price.first_year)}</span></div>
                    <div><span className="faded px13">{i.title.slice(0, 20) + '...'}</span></div>
                      {i.status === 'pending' && <div className="my-mother down-3"><span className="pd-5 rad-10 bg-color-code-2 color-code-1 px10">Reviewing</span></div>}
                      {i.status === 'active'  && <div className="my-mother down-3"><span className="pd-5 rad-10 bg-color-code-3 color-code-3 px10"> <i className="fas fa-eye"></i> Live</span></div>}
                      {i.status === 'declined' && <div className="my-mother down-3"><span className="pd-5 rad-10 bg-color-code-2 color-code-1 px10"> <i className="fas fa-triangle-exclamation" ></i> Rejected </span></div>}
                    <div className="my-mother down-5 faded px10">{formatTransactionTime(i.createdAt, new Date)}</div>
                  </div>
                </div>
              </div>
           ))}
          </>}

          {properties?.length === 0 && <>
            <div className="my-mother down-15 centered">
              <div className="page-icon"><GiEmptyMetalBucketHandle className="px100 faded" /></div>
              <div className="my-mother down-1"><span className="faded">No properties in this category</span></div>
            </div>
          </>}

        </div>
      </div>
    </div>
   
  </> );
}
 
export default UserProperties;