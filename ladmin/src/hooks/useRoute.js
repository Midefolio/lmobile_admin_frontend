import { useEffect } from "react"
import { useHistory } from "react-router-dom";
import axios from 'axios';
import useUtils from "../utils/useutils";

const useRoute = () => {
 const token = localStorage.getItem('coinvestsTtoken');
 const history = useHistory();
 const {errorHandler,isNetworkError,  isLoading} = useUtils();
 const abCont = new AbortController();
 
 const isTokenValid = async ()=> {
  const form = new FormData()
		form.append("token", token)
		const userFetch = {method: 'post',  url:'gettokenvalidity', headers:{'Content-Type': 'multipart/form-data'}, data:form, signal:abCont.signal}
  try {
   
    const result = await axios(userFetch);
    if(result?.data?.status === 'invalid'){
     localStorage.removeItem('coinvestsTtoken');
     history.push('/login'); 
     isLoading(false)
     return;
    }

    if(result?.data?.status === 'unauthorised') {
     localStorage.removeItem('coinvestsTtoken');
     history.push('/login');
     isLoading(false);
     errorHandler(result?.data?.status, result?.data?.data)
     return;
    }

    if(result?.data?.status === 'loggedOut'){
     localStorage.removeItem('coinvestsTtoken');
     history.push('/login');
     isLoading(false);
     errorHandler(result?.data?.status, result?.data?.data)
     return;
    }

   } catch (err) {
    // console.log(err.response?.status);
   if(err.name === 'AboutError'){
    // abort
    }
    if(err.response?.status === 500 ){
     isNetworkError(true, "Internal Server Error", `<span>Unable to connect to the server. Please try again later. <a href="">Learn More</a></span>`)
     return;
    } 
    if(err.response?.status === 400 ){
     isNetworkError(true, "Internet Error", `<span>Unable to connect to the server. Please check your internet and try again later. <a href="">Learn More</a></span>`)
     return;
    } 
    if(err.message === 'Network Error' ){
     isNetworkError(true, "Internet Error", `<span>Unable to connect to the server. Please check your internet and try again later. <a href="">Learn More</a></span>`)
     return;
    }
  }
 }

 

 useEffect(() => {
	 if(token){
   isTokenValid();
  }else {
   history.push(`/login`);
  }
		return (() => {abCont.abort()})
	}, [])

	return {isTokenValid};

}

export default useRoute;