const EditSubCat = ({category, deleteSubCat, setSaveChanges, subcat, subcatRef, AddSubCat, setSubcatName,  subcatname,setEditSub, setCategory}) => {
 return ( <>
 <div className="add-item-modal fade-in">
  <div className="bg-white my-col-4 off-4 my-bottom-50 down-10">
   <div className="my-col-10 off-1 down-4">
    <div className="mother bd-bottom"> <span className="px13 bold">Edit Category</span> <span className="fl-right pd-5 px13" onClick={()=> {setEditSub(false)}}><i className="fas fa-times"></i></span></div>
    <input type="text" value={category?.cat_name} maxLength={50} onChange={(e)=> (setSaveChanges(true), setCategory(prev => ({...prev, cat_name:e.target.value})))} placeholder="Enter Name" className="upper-case input px10 down-3" />
   
    <div className="mother">
     <div className="my-col-10"> <input maxLength={50} ref={subcatRef} value={subcatname} onChange={(e)=> (setSubcatName(e.target.value))}  type="text" placeholder="Enter subcategory" className="input px10 down-3" /></div>
     <div className="my-col-2 down-4"><span className="my-btn-sm px13 " onClick={(e)=> {AddSubCat(e)}}> <i className="fas fa-send color-code-1"></i></span></div>
    </div>
    <div className="mother">
     <div className="mother hs-200">
     <div className="mother down-3"><span className="px10 bold">Sub - Category (Click subcat to remove)</span></div>
     {subcat?.length < 1 ? <span className="px10 faded-2">None</span>: <>  <br />
    {subcat?.map((i, index) => (
       <span className="pd-5 rad-unset px9 c-pointer mother bg-color-code-2 color-code-1 down-1" key={'sdsd' + index} onClick={()=> {deleteSubCat(i.name)}} >{i.name}</span>
         ))}</>}
     </div>
    </div>
   </div>
  </div>
 </div>
 </> );
}
 
export default EditSubCat;