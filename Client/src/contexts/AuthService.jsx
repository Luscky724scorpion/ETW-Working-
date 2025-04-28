import axiosInstance from "./AxiosInstance";


const AUTH_API_LOGIN_PATH='/api/auth/login';
const AUTH_API_REGISTER_PATH='api/auth/register'




const login=async(credentials)=>{
    
    try{
        console.log(`Auth service request tring to login to $(AUTH_API_PATH)`)
        const response= await axiosInstance.post(AUTH_API_LOGIN_PATH,credentials)
    console.log("API CALL SUCCESSFUL")
    if(!response.data){
        console.warn("AUthe service login response not working missing token, or user")
        
    }
    return response.data
    }catch(error){
        console.error("Authservice login probelm")
        throw error
    }
}

  //sognups
  const singup=async(userData)=>{
    try {
        console.log(`Sign up to ${AUTH_API_REGISTER_PATH}`);
        const response= await axiosInstance.post(AUTH_API_REGISTER_PATH,userData)

        console.log("AUTH SERVICE:SIGNUP SUCCESSFUL")
        response.data
    } catch (error) {
        console.error("Authservice sign up failed ")

        throw error
        
    }
  }
  const AuthService = {
    login,
    singup
    
  };
export default AuthService