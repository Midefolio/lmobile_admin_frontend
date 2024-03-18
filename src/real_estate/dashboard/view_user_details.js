const ViewUserDetails = ({i, setOpenUser}) => {
    return (<>
      <div className="my-modal" onClick={()=> {setOpenUser(null)}}>
        <div className="my-col-8 off-2 down-5 bg-white in-ov-scroll" onClick={(e) => {e.stopPropagation()}}>
            <div className="my-col-10 bd-bottom-bold off-1 down-5"><span className="px20 bold">User - {i?._id}</span></div>
        </div>
      </div>
    </>  );
}
 
export default ViewUserDetails;