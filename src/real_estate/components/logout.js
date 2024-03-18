const Logout = ({cb, closeModal}) => {
  return ( <>
    <div className="my-modal">
      <div className="my-col-4 bg-white rad-10 my-bottom-50 off-4 down-10">
        <div className="my-col-10 off-1 down-4">
          <div><h1>Logout </h1></div>
          <div>Are you sure you want to logout ?</div>
          <div className="my-mother down-5">
            <span className="anchors bg-color-code-1 white" onClick={closeModal}>Cancel</span>
            <span className="anchors bg-color-code-1 white mg-10" onClick={cb}>Yes</span>
          </div>
        </div>
      </div>
    </div>
  </> );
}
 
export default Logout;