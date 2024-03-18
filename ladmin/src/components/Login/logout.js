import useUtils from "../../utils/useUtils";

const Logout = ({LogoutHandler, setLogout}) => {
 const {isPending} = useUtils();

 const LogoutHander = async () => {
  LogoutHandler();
  isPending('delete_item_btn', true);
 }


 return ( <>
  <div className="add-item-modal">
   <div className="pop-up-modal">
    <div className="my-col-10 off-1 down-5">
     <div className="mother bd-bottom px13 bold"><span>Logout</span></div>
     <div className="mother down-5"><span className="px13 faded">Are you sure you want to Logout ?</span></div>
     <div className="mother down-5">
      <span className="my-btn-sm bg-color-code-1 white" id="delete_item_btn" onClick={LogoutHander}>Yes</span>
      <span className="my-btn-sm bg-faded mgl-10 black"  onClick={()=> {setLogout(false)}}>No</span>
     </div>
    </div>
   </div>
  </div>
 </> );
}
 
export default Logout;