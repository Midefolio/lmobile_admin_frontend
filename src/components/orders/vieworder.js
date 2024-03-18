import useUtils from "../../utils/useUtils";
import moment from "moment";

const ViewOrder = ({setViewOrder, i}) => {
 const {formatNumber, calculateDelieveryPrice, addThreeHoursToTime, formatTransactionTime} = useUtils()
 const now = moment();
 const formattedTime = now.format('YYYY-MM-DD HH:mm:ss');
 return ( <>
  <div className="add-item-modal">
    <div className="add-container w-50 in-ov-scroll">
    <div className="my-col-10 off-1 down-5">
     <div className="bd-bottom mother">OrderID: #{i.order_id} <span className="fl-right pd-5 c-pointer top-2" onClick={()=> {setViewOrder(null)}}><i className="fas fa-times"></i></span></div>
     <div className="my-col-6 down-5">
       <div><span className="px10 bold">Owner's Name:</span></div>
       <div className="mother down-2"><span className="px13 faded-2">{i.name}</span></div>
     </div>
     <div className="my-col-6 down-5">
       <div><span className="px10 bold">Owner's Email:</span></div>
       <div className="mother down-2"><span className="px13 faded-2">{i.email}</span></div>
     </div>
     <div className="my-col-6 down-2">
       <div><span className="px10 bold">Owner's Phone Number:</span></div>
       <div className="mother down-2"><span className="px13 faded-2">{i.phone}</span></div>
     </div>
     <div className="my-col-6 down-2">
       <div><span className="px10 bold">Owner's Address:</span></div>
       <div className="mother down-2"><span className="px13 faded-2">{i.address}</span></div>
     </div>
     <div className="my-col-6 down-2">
       <div><span className="px10 bold">Order Date:</span></div>
       <div className="my-col-12"><span className="px13 faded-2">{formatTransactionTime(i.trn)}</span></div>
      </div>
     <div className="my-col-6 down-2">
       <div><span className="px10 bold">Transaction Ref:</span></div>
       <div className="mother down-2"><span className="px13 faded-2">{i.ref}</span></div>
     </div>
     <div className="mother down-3">
       <div className="bd-bottom"><span className="px10 bold upper-case color-code-1">Items Ordered For ({JSON.parse(i.items).length})</span></div>
       <div className="mother">
        {JSON.parse(i.items).map((x, index) => (
         <div className="mother down-2" key={'iyems' + index}>
          <span className="px10 bold black">{1 + index}.</span>
          <span className="px10 bold">{x.item_name}</span>
          <div className="mother down-1 px10 faded">Qty: <b className="black">{x.quantity}</b> </div>
          <div className="mother down-1 px10 faded">Kgs: <b className="black">{x.weight}Kg</b></div>
          <div className="mother down-1 px10 faded">Price: <b>₦{formatNumber(x.price)}</b></div>
       </div>
        ))}
       </div>
       <div className="mother bg-faded down-4 rad-unset my-bottom-10">
        <div className="my-container down-1">
        <span className="px10">Total Weight: <b>{JSON.parse(i.items).reduce((total, item) => total + parseInt(item.weight), 0)}Kgs</b></span>
         <div className="px10 mother down-1">Item Price Sum: <b>₦ {formatNumber(JSON.parse(i.items).reduce((total, item) => total + parseInt(item.price), 0))}</b></div>
         <div className="px10 mother down-1 bd-bottom">Delivery Fee: <b>₦ {formatNumber(calculateDelieveryPrice(JSON.parse(i.items).reduce((total, item) => total + parseInt(item.weight), 0)))}</b></div>
         <div className="px10 mother down-3">Sum Total Paid: <b>₦ {formatNumber(i.total_paid)}</b></div>
        </div>
       </div>
       <div className="mother down-5  my-bottom-0">
       <div><span className="px10 bold">Expected Delivery date:</span></div>
       <div className="mother down-1"><span className="px13 faded">{addThreeHoursToTime(i.trn)}</span></div>
     </div>
       <div className="mother down-3  my-bottom-50">
       <div><span className="px10 bold">Delivery Personnel In Charge:</span></div>
       <div className="mother down-1"><span className="px10 pd-5 bg-color-code-2 color-code-1">{i.dl_name ? i.dl_name : "Pending"}</span></div>
     </div>
     </div>
    </div>
    </div>
  </div>
 </> );
}
 
export default ViewOrder;