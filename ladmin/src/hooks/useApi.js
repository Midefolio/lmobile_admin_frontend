import axios from 'axios';
// import Flutterwave from 'flutterwave-node-v3';
import useUtils from '../utils/useUtils';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const useApi = () => {
 const {setToast, errorHandler, isPending} = useUtils();
 const history = useHistory()

 const requestMaker = async (api, params) => {
 	const form = new FormData();
  const key = Object.keys(params);
  const value = Object.values(params);
  for(var i = 0; i < key.length; i++){
   form.append(key[i], value[i]);
  }
  const request = {
    method: 'post',  
    url: api, 
    headers: { 'Content-Type': 'multipart/form-data'}, 
    data: form,
  }  
  try {
   const status = await axios(request);
   const res = status?.data;
   if(res?.status == 'successful'){      // invalid login credenils
    return res; 
   }
   if(res?.status === 'SESSION EXPIRED'){
    localStorage.removeItem('lmobileToken');
    history.push('/');
    return;
   }else {
    setToast(`<div class='black upper-case'>${res?.status}</div>
    <div class='down-3 mother'>${res?.data}</div>
    <div class='mother down-3'><a href="">Learn More</a></div>`)
   }
  }catch (error) {
    if(error.response?.status === 500 ){
     setToast(`<div class='black'>Error 500 - Internal Server Error</div>
     <div class='down-5 mother'>Unable to connect to the server. Please try again later.</div>
     <div class='mother down-2'><a href="">Learn More</a></div>`)
     isPending('login_btn', 'Login')
     return;
    }
    if(error.response?.status === 400 ){
     setToast(`<div class='black'>Error 400 - Internet Error</div>
     <div class='down-3 mother'>Unable to connect to the server. Please check your internet and try again.</div>
     <div class='mother down-3'><a href="">Learn More</a></div>`)
     isPending('login_btn', 'Login')
     return;
    }
   if(error.message === 'Network Error' ){
    setToast(`<div class='black'>Error 400 - Internal Server Error</div>
     <div class='down-3 mother'>Unable to connect to the server. Please try again later.</div>
     <div class='mother down-3'><a href="">Learn More</a></div>`)
     isPending('login_btn', 'Login')
     return;
   }
  }
}


  // Function to create a recipient
  const createRecipient = async (params) => {
    try {
      const response = await axios.post(
        'https://api.paystack.co/transferrecipient',
        {
          type: 'nuban', // Bank account type
          name: `${params?.name}`,
          account_number: `${params?.account_number}`,
          bank_code: `${params?.bank_code}`,
          currency: 'NGN', // Currency code (e.g., NGN for Nigerian Naira)
        },
        {
          headers: {
            Authorization: `Bearer sk_test_ca92c5e859f8bbc674aebe8667368fc9727ade79`,
          },
        }
      );
      console.log(response?.data?.data?.recipient_code)
      if (response.data.status === true) {
        setToast('Recipient created successfully');
        console.log(response?.data?.data?.recipient_code);
        return response?.data?.data?.recipient_code
        // return
      } else {
        setToast('Recipient creation failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setToast('Recipient creation failed');
    }
  };




  // Function to transfer funds
  const transferFunds = async (repCode, amounts) => {
    try {
      const response = await axios.post(
        'https://api.paystack.co/transfer',
        {
          source: 'balance',
          recipient: repCode,
          amount: parseInt(amounts) * 100, // Amount in kobo (multiply by 100)
          currency: 'NGN', // Currency code (e.g., NGN for Nigerian Naira)
        },
        {
          headers: {
            Authorization: `Bearer sk_test_ca92c5e859f8bbc674aebe8667368fc9727ade79`,
          },
        }
      );

      if (response.data.status === 'success') {
        setToast('Transfer successful');
      } else {
        setToast('Transfer failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setToast('Transfer failed');
    }
  };


  const clearTransfer = async (params) => {
   const repCode = await createRecipient(params);
   if(repCode){
    try {
      const res =  await transferFunds(repCode, params?.amount)
      return res;
    } catch (error) {
      console.log(error);
    }
    // return res;
    
   }
  }
























// fix handle errors well....
return {
  requestMaker,
  clearTransfer
 };
}
 
export default useApi;