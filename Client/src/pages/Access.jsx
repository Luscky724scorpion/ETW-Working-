import {useContext} from 'react'


export default function access(){
   const {user}=useContext(UserContext)
 {
  return (
    <div>
      <h1>Access</h1>
      {!!user &&(<h2>Hi{user.username}!</h2>)}
    </div>
  )
 }}
