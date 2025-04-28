import axios from "axios";

const API_BASE_URL="http://localhost:3000/"

const axiosInstance=axios.create({
    baseURL:API_BASE_URL,
    headers:{
        "Content-Type":'application/json'
    }
})
//request interceptor 
axiosInstance.interceptors.request.use(
    (config)=>{/*
        console.log(`>>> Request Interceptor: Intercepting ${config.method.toUpperCase()} request to ${config.url}`)
        const token=localStorage.getItem('authToken')
        console.log("interceptor:Req int checking for token")
    
    if(token){
        config.headers['Authorization']=`Bearer ${token}`;
        console.log('req int: chceking for token')
    }else{
        console.log("req int: no token found ")
    } return config}, 
    (error)=>{
        console.error('req int error:',error)
        //check rejection error 
        reject.Promise.reject(error)
    */ console.log(`>>> Request Interceptor: Intercepting ${config.method.toUpperCase()} request to ${config.url}`); // Log URL
    const token = localStorage.getItem('authToken');
    console.log(">>> Request Interceptor: Token from localStorage:", token ? "Found" : "Not Found"); // Log token status

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log(">>> Request Interceptor: Authorization header ADDED."); // Log header addition
    } else {
       delete config.headers['Authorization'];
       console.log(">>> Request Interceptor: Authorization header NOT added (no token).");
    }
    return config;
  },
  (error) => {
    console.error("Request Interceptor Error:", error);
    return Promise.reject(error);}
 
)
//res interceptor
axiosInstance.interceptors.response.use(
    (response)=>{
        return response
    },
    (error)=>{
        console.error("response interceptor error:",error.response?.data||error.message)

        if(error.response?.status===401){
            console.warn("response int:unautroizaed 401.possibel token issue?Expired")
          
             localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
          //navigate-component 
             window.location.href = '/login';

             reject.Promise.reject(error)
        }
       
    }
) 
export default axiosInstance