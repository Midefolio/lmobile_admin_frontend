import { useEffect, useMemo, useRef, useState } from "react";
import Layout from "./layout";
import ViewUserDetails from "./view_user_details";
import useApi from "../../hooks/useApi";
import { GiEmptyMetalBucketHandle } from "react-icons/gi";
import CatSkeleton from "../../components/skeletals/catskeleton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import useUtils from "../../utils/useUtils";

const ActiveEstateUsers = () => {
    const [openUser, setOpenUser] = useState(null);
    const { makeRequest } = useApi();
    const abortController = useRef(new AbortController);
    const [users, setUsers] = useState(null);
    const [isloading, setIsloading] = useState(false)
    const nodetoken = localStorage.getItem('lm_node_jwt');
    const history = useHistory();
    const [searching, setSearching] = useState(false);
    const searchRef = useRef();
    const { setToast } = useUtils()
    const [search, setSearch] = useState({keyword:''})
    const [searchDone, setSearchDone] = useState(false);
    const [userIds, setUserIds] = useState(Array)
    const [isDeleting, setIsdeleteting] = useState(false)
    const [Delete, setdelete] = useState(false)

    const getUsers = async () => {
      const cb =()=> {setIsloading(false)}
      setUsers(null)
      setSearchDone(false)
      setSearch({keyword:""})
      const result = await makeRequest('get', 'admin/get_all_users', null, cb, nodetoken, abortController )
      if(result?.message === 'done'){
          setUsers(result?.users);
          setIsloading(false)
      }
    }

    const searchHandler = async (e)=> {
        e.preventDefault();
       if(search?.keyword === "") {
        setToast('Please enter a keyword');
        searchRef.current.focus()
        return;
       }
       setSearching(true);
       const cb =() => {setSearching(false)}
       const result = await makeRequest('post', 'admin/search_users', search, cb, nodetoken, abortController );
       if(result?.message === 'done' ){
           setUsers(result?.users);
           setSearchDone(true)
           setSearching(false);
        }
       }

    const getCheckedIds =(id, checked)=> {
     if(checked){
       setUserIds(prev => ([...prev, id]))
     }else{
      const newArr = userIds?.filter((i) => i !== id);
      setUserIds(newArr)
      console.log(id)
     }  
      
    }

   const deleteUser = async () => {
    const cb =()=> {setIsdeleteting(false)}
    setIsdeleteting(true)
    const result = await makeRequest('post', 'admin/delete_users', userIds, cb, nodetoken, abortController)
    if(result?.message === 'done'){
        await getUsers()  
        setIsdeleteting(false)
        setdelete(false)
        setUserIds([])
    }   
   }   


    useEffect(()=> {
     if(nodetoken){
        getUsers()
     }else{
        history.push('/')
     }
    //  return () => abortController.current.abort()
    }, [])

    const memorisedData = useMemo(() => users, [users])

   




    return ( <>
     <Layout active={'home'} />
     {users?.map((i, index) => (
       openUser === i?._id && <ViewUserDetails key={index + 'urerhj'} i={i} setOpenUser={setOpenUser}/>
     ))}
      
      {Delete && <div className="my-modal">
        <div className="my-col-4 off-4 down-10 my-bottom-50 rad-10 bg-white">
            <div className="my-col-10 off-1 down-5">
                <div className="my-mother bd-bottom-bold"><span className="bold" >Are You sure you want to delete Users</span></div>
                <div className="my-mother down-3"><span className="px13 bold color-code-1">users will be deleted Permanenly from database</span></div>
                {isDeleting? <div className="my-mother down-10"><i className="fas fa-spinner fa-spin"></i> Deleting</div> : <>
                    <div className="my-mother down-10">
                    <span className="bg-color-code-2 color-code-1 px13 pd-10 c-pointer" onClick={deleteUser}>Delete</span>
                    <span className="bg-color-code-1 white mg-10 px13 pd-10 c-pointer" onClick={()=> {setdelete(false)}}>Cancel</span>
                </div></>}
            </div>
        </div>
      </div>
}



    <div className="my-col-10 off-2">
     <div className="my-col-10">
      <div className="my-mother down-5 bd-bottom-bold"><h1><i className="fas fa-arrow-left pd-10" onClick={()=> {history.push('/d-pannel')}}></i> <span>Users</span></h1></div>
        <div className="my-col-3 down-2">
        <div className="my-col-12 off- xs-12  hidden-xs">
        <form onSubmit={(e)=> {searchHandler(e)}} className="-xs" >
        <div className="search-con">
        <input type="text" ref={searchRef} value={search?.keyword}  className='monR px13 faded' onChange={(e) => {setSearch(prev => ({...prev, keyword:e.target.value}) )}} placeholder='Search Properties'/>
        {!searching? <span onClick={(e)=> {searchHandler(e)}} ><i className="fas fa-search black" ></i></span> :  <span ><i className="fas fa-refresh fa-spin"></i></span>}
        </div>
        </form>
        </div>
        </div>
        {searchDone && <div className="my-col-5 down-3 mg-10">
        <span>Showing results for:</span>
        <span className="pd-10 bg-color-code-1 mg-10 white px13 c-pointer" onClick={getUsers} title="close search">{search?.keyword} <i className="fas fa-times mg-10 pd-5"></i> </span>
        </div> }
        {userIds?.length > 0 &&  <div className="my-col-3 fade-in down-3 right">
            <span>Action:</span>
          <span className="mg-10 pd-10 bg-color-code-1 c-pointer white px13" onClick={()=> {setdelete(true)}}> <i className="fas fa-trash-alt"></i>  Delete Permanenly </span>
        </div>} 
       
        
       {!users && <div className="my-mother down-3 xs-down-3"><CatSkeleton slideToShow={3} /></div>}
        <div className="my-mother down-1">
        {memorisedData?.map((i, index) => (
         <div className="my-col-3 down-2" key={index + 'iriowe'} >
           <div className="my-col-11 b-shadow rad-10 my-bottom-10">
            <div className="my-col-10 off-1 down-5">
                <div className="my-mother" >
                    <span className="profile-pics-1 px13 color-code-1"><i className="fas fa-user"></i></span>
                    <input type="checkbox" className="fl-right" value={i._id} onChange={(e) => {getCheckedIds(e.target.value, e.target.checked)}} />
                </div>
                <div className="my-mother down-5">
                    <span className="px13 faded bold" >{i?.firstname} {i?.lastname}</span>
                    {i.isBlocked === 0 && <span className="px10 bg-color-code-1 pd-5 rad-unset white mg-10">Active</span>}
                </div>
                <div className="my-mother down-2">
                    <span className="px10 pd-5 bg-faded faded" >{i?.email}</span>
                </div>
            </div>
         </div>
       </div>
      ))}
     {users?.length < 1 &&
      <div className="my-mother down-15 centered">
      <div className="page-icon"><GiEmptyMetalBucketHandle className="px100 faded" /></div>
      <div className="my-mother down-1"><span className="faded">No properties in this category</span></div>
    </div>
   }
  </div>
  </div>
  </div>
    </> );
}
 
export default ActiveEstateUsers;