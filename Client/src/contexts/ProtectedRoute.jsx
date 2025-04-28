import React from 'react'
import{Navigate} from 'react-router-dom'
import { useAuth } from './Authprovider'

const ProtectedRoute=({children})=>{
    const{token,isLoading}=useAuth()
   

if(isLoading){
    return<div>Loading Auth status</div>
}
if(!token){
    console.log(`Protected Route:No token found redirect to /login`)
    return<Navigate to='/login' />
}return children
}
export default ProtectedRoute